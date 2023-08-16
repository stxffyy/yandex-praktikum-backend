const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
require("dotenv").config();

const {authRouter, mainRouter, feedbackRouter} = require('./routes.js');


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/feedback', feedbackRouter);


app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is live on port ${process.env.PORT}`);
})

module.exports = app;
