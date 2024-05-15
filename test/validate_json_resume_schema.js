const fs = require("fs");
const resumeSchema = require("@averagehelper/resume-schema");
const yaml = require("js-yaml");
const resume = yaml.load(fs.readFileSync("config/data.yml", "utf-8"));

const validate = async function() {
	try {
		await resumeSchema.validate(resume);
	console.log("Resume data validated successfully");
	} catch (error) {
		console.error("Resume data was invalid", error);
	}
};

validate();