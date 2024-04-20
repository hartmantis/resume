const tailwind = require("tailwindcss");
const postCss = require("postcss");
const autoPrefixer = require("autoprefixer");
const cssNano = require("cssnano");
const yaml = require("js-yaml");
const fs = require("fs");

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
  iconmap.set("github", "brands/github.svg");
  iconmap.set("linkedin", "brands/linkedin.svg");
  iconmap.set("mastodon", "brands/mastodon.svg");
  iconmap.set("bluesky", "brands/bluesky.svg");
  iconmap.set("email", "solid/envelope.svg");
  iconmap.set("phone", "solid/phone.svg");

  for ( profile of conf.basics.profiles ) {
    let lwr = profile.network.toLowerCase();
    let srcPath = `node_modules/@fortawesome/fontawesome-free/svgs/${iconmap.get(lwr)}`;
    let destPath = `/assets/icons/${lwr}.svg`
    eleventyConfig.addPassthroughCopy({ [`${srcPath}`]: destPath })
    profile.icon = destPath;
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