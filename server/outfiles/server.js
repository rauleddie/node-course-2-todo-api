"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Server dependencies
var express = require("express");
var bodyParser = require("body-parser");
var todo_1 = require("./models/todo");
// import {User} from './models/user';
var app = express();
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
app.listen(3000, function () {
    console.log('Started on port 3000');
});
