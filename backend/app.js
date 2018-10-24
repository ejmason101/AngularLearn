// holds the express app
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Todo = require('./models/todo');


const app = express();

mongoose.connect("mongodb://localhost:27017/ngLearn", { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');

    })
    .catch(() => {
        console.log('Mongodb Connection Failed!');
    });

// parsing requests
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
     "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});


app.post("/api/todos", (req, res, next) => {
    console.log('POST: /api/todos');

    const newTodo = new Todo({
        title: req.body.title,
        content: req.body.content
    });

    newTodo.save().then(createdTodo => {
        console.log(createdTodo);
        res.status(201).json({
            message: 'Todo Added Successfully',
            postId: createdTodo._id
        });
    });

});
// app.post();
// app.get();
// app.put();

app.get('/api/todos', (req, res, next) => {
    console.log('/api/todos');
    
    Todo.find()
        .then(documents => {
            console.log(documents);
            res.status(200).json({
                message: 'Todos fetched successfully',
                todos: documents
            });
        });
    
});

app.delete("/api/todos/:id", (req, res, next) => {
    // console.log(req.params.id);
    console.log("trying to delete id: " + req.params.id);
    Todo.findByIdAndDelete(req.params.id).then(result => {
        console.log("modified: " );
        console.log(result);
        console.log('/api/todos/:id delete successful!');
        res.status(200).json({message: 'post deleted!'});
    });

    
});



module.exports = app;