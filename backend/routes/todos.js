const express = require("express");

const Todo = require('../models/todo');

const router = express.Router();

router.post("", (req, res, next) => {
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

//.patch --> updates
//.put --> whole new

router.put("/:id", (req, res, next) => {
    const todo = new Todo({
        title: req.body.title,
        content: req.body.content
    })
    Todo.updateOne({ _id: req.params.id }, todo).then(result => {
        console.log("updated successfully id: " + req.params.id);
        console.log(result);

        res.status(200).json({ message: "Update Successful!"});
    })
})

router.get("", (req, res, next) => {
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

router.get("/:id", (req, res, next) => {
    Todo.findById(req.params.id).then(todo => {
        if(todo) {
            // todo with id exists in datagbase
            res.status(200).json(todo);
        } else {
            res.status(404).json({message: 'Todo Not Found'});
        }
    })
})

router.delete("/:id", (req, res, next) => {
    // console.log(req.params.id);
    console.log("trying to delete id: " + req.params.id);
    Todo.findByIdAndDelete(req.params.id).then(result => {
        console.log("modified: " );
        console.log(result);
        console.log('/api/todos/:id delete successful!');
        res.status(200).json({message: 'post deleted!'});
    });    
});

module.exports = router;