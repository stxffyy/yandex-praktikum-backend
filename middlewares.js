const jwt = require("jsonwebtoken");
const {User} = require("./models.js");

const verifyToken = async (req, res, next) => {
    console.log(req.headers);
    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT") {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decode = jwt.verify(token, process.env.API_SECRET);
            if (decode) {
                req.user = User.findByPk(decode.id);
            }
        }
        catch (JsonWebTokenError) {}
    }
    if (!req.user) {
        return res.status(401).send({message: "Unauthorized"});
    }
    next();
};

module.exports = verifyToken;
