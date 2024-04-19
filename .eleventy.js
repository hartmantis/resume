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

  eleventyConfig.addGlobalData("config", yaml.load(fs.readFileSync("config/config.yml", "utf-8")));

  eleventyConfig.addPassthroughCopy({ "config/favicons/*" : "/" });

  eleventyConfig.addWatchTarget("src/_includes/styles/");
  eleventyConfig.addNunjucksAsyncFilter("postCss", postCssFilter);

  return {
    dir: {
      input: "src"
    }
  };
};