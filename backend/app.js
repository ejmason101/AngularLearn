// holds the express app
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();

mongoose.connect("mongodb://localhost:27017/ngLearn", { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');

    })
    .catch(() => {
        console.log('Mongodb Connection Failed!');
        return;
    });

// parsing requests
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
         "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS");

    next();
});

const todosRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");

app.use("/api/todos", todosRoutes);
app.use("/api/user", userRoutes);

module.exports = app;