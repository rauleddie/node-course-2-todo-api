// Server dependencies
import express = require('express');
import bodyParser = require('body-parser');

// Database related dependencies
import mongoose from './db/mongoose';
import {Todo} from './models/todo';
// import {User} from './models/user';

const app: express.Application = express();
app.use(bodyParser.json());

// We set up our POST routes

app.post('/todos', (req: express.Request, res: express.Response) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then( (doc: mongoose.Document) => {
        res.send(doc);
    }).catch((e: mongoose.Error) => {
        res.status(400).send(e);
    })
});

// We set up our GET routes
app.get('/todos', (req: express.Request, res: express.Response) => {
    Todo.find().then((todos: any) => {
        res.send({todos});
    }).catch((e: mongoose.Error) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

export {app};