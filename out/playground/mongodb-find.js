"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The MongoClient constructor lets us connect to a Mongo server and 
// issue commands to manipulate the database.
var _a = require('mongodb'), MongoClient = _a.MongoClient, ObjectID = _a.ObjectID;
// * err represents the error argument if there is an error while trying to 
// connect to the database.
// * client represents the object we can use to issue commands to read and 
// write data.
MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, client) {
    if (err) {
        console.log(err);
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // Get database object named TodoApp.
    var db = client.db('TodoApp');
    // We fetch everything in the Todos Collection and turn it into an array.
    // db.collection('Todos').find().toArray().then( (docs : object[]) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch( (err: Error) => {
    //     console.log('Unable to fetch todos', err); 
    // });
    // We fetch just the Todos that have a completed state of false. This is what is known 
    // as a query. To do this we pass a setup of key-value pairs.
    // db.collection.find(<query>)
    // db.collection('Todos').find({completed: false}).toArray().then( (docs: object[]) => {
    //     console.log('Todos-Completed: false');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch((err: Error) => {
    //     console.log('Unable to query todos', err);
    // });
    // Query by ID
    // db.collection('Todos').find({_id: new ObjectId('5cabdc59981261cbfc7754eb')}).toArray().then( (docs: any[]) => {
    //     console.log(`Todos-ID: ${docs[0]._id}`);
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch( (err: Error) => {
    //     console.log('Unable to query Todos', err);
    // });
    // db.collection('Todos').find({}).count().then( (count: number) => {
    //     console.log(`Todos count: ${count}`)
    // }).catch((err: Error) => {
    //     console.log('Unable to query Todos', err);
    // });
    db.collection('Users').find({ name: 'Raul' }).toArray().then(function (docs) {
        console.log(JSON.stringify(docs, undefined, 2));
    });
    client.close();
});
