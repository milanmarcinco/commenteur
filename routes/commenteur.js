const express = require("express");
const router = express.Router();

const commenteur = require("../api/commenteur");

router.get("/", async (req, res) => {
	const surveyId = req.query.surveyId;
	const data = await commenteur.loadComment(surveyId);
	res.status(200).send(data);
});

router.post("/", async (req, res) => {
	const surveyId = req.query.surveyId;
	const comment = req.body.comment;
	const data = await commenteur.saveComment(surveyId, comment);
	res.status(201).send(data);
});

module.exports = router;