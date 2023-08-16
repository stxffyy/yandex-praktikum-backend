const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(process.env.DB_DSN, {dialect: "sqlite"});

const User = sequelize.define('User', {
    name: DataTypes.STRING, email: {
        type: DataTypes.STRING, unique: true, allowNull: false,
    }, password: DataTypes.STRING,
});

const Feedback = sequelize.define("Feedback", {
    text: DataTypes.TEXT,
});

sequelize.sync();

module.exports = {User, Feedback}
