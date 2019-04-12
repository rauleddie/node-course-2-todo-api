"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Server dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongodb_1 = require("mongodb");
var todo_1 = require("./models/todo");
// import {User} from './models/user';
var app = express();
exports.app = app;
app.use(bodyParser.json());
// We set up our POST routes
app.post('/todos', function (req, res) {
    var todo = new todo_1.Todo({
        text: req.body.text
    });
    todo.save().then(function (doc) {
        res.send(doc);
    }).catch(function (e) {
        res.status(400).send(e);
    });
});
// We set up our GET routes
app.get('/todos', function (req, res) {
    todo_1.Todo.find().then(function (todos) {
        res.send({ todos: todos });
    }).catch(function (e) {
        res.status(400).send(e);
    });
});
// GET /todos/12345
app.get('/todos/:id', function (req, res) {
    var id = req.params.id;
    if (!mongodb_1.ObjectID.isValid(id)) {
        return res.status(404)
            .send('Invalid Id');
    }
    todo_1.Todo.findById(id).then(function (todo) {
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        res.send(todo);
    }).catch(function (e) {
        res.status(400)
            .send(e);
    });
});
app.listen(3000, function () {
    console.log('Started on port 3000');
});