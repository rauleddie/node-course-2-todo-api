// Server dependencies
import express = require('express');
import bodyParser = require('body-parser');
import _ = require('lodash');
import {ObjectID, MongoError} from 'mongodb';

// Database related dependencies
import mongoose from './db/mongoose';
import {Todo, Todotype} from './models/todo';
import { RSA_NO_PADDING } from 'constants';
// import {User} from './models/user';

const app: express.Application = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

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

// GET /todos/12345
app.get('/todos/:id', (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    if(!ObjectID.isValid(id)) {
        return res.status(404)
            .send();
    }
    Todo.findById(id).then( (todo: any) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch( (e: Error) => {
        res.status(400)
            .send(e);
    });
});

// We set up our DELETE routes
app.delete('/todos/:id', (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    if(!ObjectID.isValid(id)) {
        return res.status(404)
            .send();
    }
    Todo.findByIdAndRemove(id).then( (todo: any) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch( (e: Error) => {
        res.status(400)
    });
});

// We set up our PATCH routes
app.patch('/todos/:id', (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    const body: Todotype = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    // Check if the todo is completed.
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }
    // We make the query to the database
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then( (todo: any) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch( (e: MongoError) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log('Started on port 3000');
});

export {app};