const autoPrefixer = require("autoprefixer");
const cssNano = require("cssnano");
const faSvgCore = require("@fortawesome/fontawesome-svg-core");
const fas =  require("@fortawesome/free-solid-svg-icons");
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

  let conf = yaml.load(fs.readFileSync("config/config.yml", "utf-8"));

  let iconmap = new Map();
  iconmap.set("github", faSvgCore.findIconDefinition({ prefix: "fab", iconName: "github" }));
  iconmap.set("linkedin", faSvgCore.findIconDefinition({ prefix: "fab", iconName: "linkedin" }));
  iconmap.set("mastodon", faSvgCore.findIconDefinition({ prefix: "fab", iconName: "mastodon" }));
  iconmap.set("bluesky", faSvgCore.findIconDefinition({ prefix: "fab", iconName: "bluesky" }));
  iconmap.set("email", faSvgCore.findIconDefinition({ prefix: "fas", iconName: "envelope" }));
  iconmap.set("phone", faSvgCore.findIconDefinition({ prefix: "fas", iconName: "phone" }));

  conf.basics.profiles.unshift({
    network: "email",
    username: conf.basics.email
  });

  for ( profile of conf.basics.profiles ) {
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

  eleventyConfig.addGlobalData("config", conf);

  eleventyConfig.addPassthroughCopy({ "config/favicons/*" : "/" });

  eleventyConfig.addWatchTarget("src/_includes/styles/");
  eleventyConfig.addNunjucksAsyncFilter("postCss", postCssFilter);

  return {
    dir: {
      input: "src"
    }
  };
};