const yaml = require("js-yaml");
const fs = require("fs");

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksFilter("isstring", function(obj) {
    return typeof obj === "string";
  });

  eleventyConfig.addGlobalData("config", yaml.load(fs.readFileSync("config.yml", "utf-8")));
};