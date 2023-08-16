const express = require('express');
const verifyToken = require('./middlewares.js');
const {signin, signup, create_feedback} = require("./controllers.js");
const {list_feedback} = require("./controllers");
const {Feedback} = require("./models");

const authRouter = express.Router();
authRouter.post("/register", signup, async (..._) => {
});
authRouter.post("/login", signin, async (..._) => {
});

const mainRouter = express.Router();
mainRouter.get("/source", verifyToken, async (req, res) => {
    return res.status(200).send({url: "https://github.com/stxffyy/yandex-praktikum-backend"});
});
mainRouter.get("/video", async (req, res) => {
    const file = `${__dirname}/public/si.mp4`;
    await res.download(file); // Set disposition and send it.
})

const feedbackRouter = express.Router();
feedbackRouter.post("/", verifyToken, async (req, res) => {
    const feedback = await create_feedback(req.body.text);
    return res.status(201).send(feedback);
})
feedbackRouter.get("/", verifyToken, async (req, res) => {
    const feedbacks = await list_feedback();
    return res.status(200).send(feedbacks);
})

module.exports = {authRouter, mainRouter, feedbackRouter};
