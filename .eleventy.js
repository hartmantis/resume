const autoPrefixer = require("autoprefixer");
const cssNano = require("cssnano");
const faSvgCore = require("@fortawesome/fontawesome-svg-core");
const fas = require("@fortawesome/free-solid-svg-icons");
const far = require("@fortawesome/free-regular-svg-icons");
const fab = require("@fortawesome/free-brands-svg-icons");
const fs = require("fs");
const postCss = require("postcss");
const tailwind = require("tailwindcss");
const yaml = require("js-yaml");

faSvgCore.library.add(fas.fas, far.far, fab.fab);

const postCssFilter = (code, done) => {
	postCss([
		tailwind(require('./tailwind.config')),
		autoPrefixer(),
		cssNano({ preset: 'default' })
	]).process(code, { from: './src/_includes/styles/tailwind.css' })
		.then(
			(r) => done(null, r.css),
			(e) => done(e, null)
		);
}

module.exports = function(eleventyConfig) {
	eleventyConfig.addNunjucksFilter("isstring", function(obj) {
		return typeof obj === "string";
	});

	let resumeConfig = yaml.load(fs.readFileSync("config/config.yml", "utf-8"));
	let resumeData = yaml.load(fs.readFileSync("config/data.yml", "utf-8"));

	let iconmap = new Map();
	iconmap.set("location", faSvgCore.findIconDefinition({ prefix: "fas", iconName: "map" }));
	iconmap.set("github", faSvgCore.findIconDefinition({ prefix: "fab", iconName: "github" }));
	iconmap.set("linkedin", faSvgCore.findIconDefinition({ prefix: "fab", iconName: "linkedin" }));
	iconmap.set("mastodon", faSvgCore.findIconDefinition({ prefix: "fab", iconName: "mastodon" }));
	iconmap.set("bluesky", faSvgCore.findIconDefinition({ prefix: "fab", iconName: "bluesky" }));
	iconmap.set("email", faSvgCore.findIconDefinition({ prefix: "fas", iconName: "envelope" }));
	iconmap.set("phone", faSvgCore.findIconDefinition({ prefix: "fas", iconName: "phone" }));

	// Merge the email address in with the other contact links.
	resumeData.basics.profiles.unshift({
		network: "email",
		username: resumeData.basics.email,
		url: `mailto:${resumeData.basics.email}`
	});

	// Set an icon for the location.
	resumeData.basics.location.icon = faSvgCore.icon(
		iconmap.get("location"),
		{
			title: "My location",
			transform: { size: 22 }
		}
	).html;

	// Set an icon for all the contact links.
	for (profile of resumeData.basics.profiles) {
		let lwr = profile.network.toLowerCase();
		let icon = iconmap.get(lwr);
		profile.icon = faSvgCore.icon(
			icon,
			{
				title: `My ${profile.network} Contact Info`,
				transform: { size: 22 }
			}
		).html;
	}

	// Split apart location strings into their contingent city+state+country.
	for (job of resumeData.work) {
		let location = job.location;

		// "Remote" is a special case.
		if (location == "Remote") {
			continue;
		}

		const locs = location.split(",").map(i => i.trim());
		job.location = new Map();
		job.location.locality = locs[0];
		job.location.region = locs[1];
		job.location.countryCode = locs[2];
	}
	
	// Do the same for education entries.
	for (edu of resumeData.education) {
		let location = edu.location;

		if (location == "Remote") {
			continue;
		}

		const locs = location.split(",").map(i => i.trim());
		edu.location = new Map();
		edu.location.locality = locs[0];
		edu.location.region = locs[1];
		edu.location.countryCode = locs[2];
	}

	eleventyConfig.addGlobalData("resumeConfig", resumeConfig);
	eleventyConfig.addGlobalData("resumeData", resumeData);

	eleventyConfig.addPassthroughCopy({ "config/favicons/*" : "/" });

	eleventyConfig.addWatchTarget("src/_includes/styles/");
	eleventyConfig.addNunjucksAsyncFilter("postCss", postCssFilter);

	return {
		dir: {
			input: "src"
		}
	};
};
