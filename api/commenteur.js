const path = require("path");
const fs = require("fs").promises;

const commenteurDbPath = path.join(__dirname, "../db");

/**
* Read survey comment from the database.
* @param {string} surveyId
*/
const loadComment = async function(surveyId) {
	try {
		const filePath = createPath(surveyId);
		const buffer = await fs.readFile(filePath);
		const data = JSON.parse(buffer);
		return {
			error: null,
			body: { ...data }
		}
	} catch (err) {
		return {
			error: {
				message: "An error occured while trying to load the comment from the database.",
				errObj: err
			},
			body: {}
		}
	}
}

/**
* Save survey comment to the database.
* @param {string} surveyId
* @param {string} comment
*/
const saveComment = async function(surveyId, comment) {
	try {
		const filePath = createPath(surveyId);
		const data = { surveyId, comment }
		const stringifiedData = JSON.stringify(data);
		fs.writeFile(filePath, stringifiedData);
		return {
			error: null,
			body: { surveyId, comment }
		}
	} catch (err) {
		return {
			error: {
				message: "An error occured while trying to save the comment to the database.",
				errObj: err
			},
			body: { surveyId, comment }
		}
	}
}

const createPath = function(surveyId) {
	return path.join(commenteurDbPath, `${surveyId}.json`);
}

module.exports = {
	loadComment: loadComment,
	saveComment: saveComment
}