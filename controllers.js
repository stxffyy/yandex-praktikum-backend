const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {User, Feedback} = require("./models.js");

async function signup(req, res) {
    const [user, created] = await User.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            name: req.body.name, password: bcrypt.hashSync(req.body.password, 8)
        }
    });
    if (!created) {
        return res.status(400).send();
    }
    req.user = user;
    return res.status(201).send()
}

async function signin(req, res) {
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
        return res.status(404).send({
            message: "User not found."
        });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
        return res.status(401)
            .send({
                accessToken: null, message: "Invalid Password!"
            });
    }
    const token = jwt.sign({id: user.id}, process.env.API_SECRET, {
        expiresIn: "2h"
    });
    console.log(user.id)
    return res.status(200).send({
        user: {
            id: user.id, email: user.email, name: user.name,
        }, message: "Login successfully", accessToken: token,
    });
}

async function create_feedback(text) {
    return await Feedback.create({text});
}

async function list_feedback() {
    return await Feedback.findAll();
}

module.exports = {signup, signin, create_feedback, list_feedback}
