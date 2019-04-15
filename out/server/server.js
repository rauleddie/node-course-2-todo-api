"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Server dependencies
var express = require("express");
var bodyParser = require("body-parser");
var _ = require("lodash");
var mongodb_1 = require("mongodb");
var todo_1 = require("./models/todo");
// import {User} from './models/user';
var app = express();
exports.app = app;
app.use(bodyParser.json());
var port = process.env.PORT || 3000;
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
            .send();
    }
    todo_1.Todo.findById(id).then(function (todo) {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo: todo });
    }).catch(function (e) {
        res.status(400)
            .send(e);
    });
});
// We set up our DELETE routes
app.delete('/todos/:id', function (req, res) {
    var id = req.params.id;
    if (!mongodb_1.ObjectID.isValid(id)) {
        return res.status(404)
            .send();
    }
    todo_1.Todo.findByIdAndRemove(id).then(function (todo) {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo: todo });
    }).catch(function (e) {
        res.status(400);
    });
});
// We set up our PATCH routes
app.patch('/todos/:id', function (req, res) {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!mongodb_1.ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    // Check if the todo is completed.
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }
    // We make the query to the database
    todo_1.Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then(function (todo) {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo: todo });
    }).catch(function (e) {
        res.status(400).send();
    });
});
app.listen(port, function () {
    console.log('Started on port 3000');
});
