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
    // db.collection('Todos').findOneAndUpdate({_id: new ObjectID("5cacf0fb981261cbfc775a7c")},
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }).then( (result: any) => {
    //         console.log(result);
    //     });
    db.collection('Users').findOneAndUpdate({ name: 'Jen' }, {
        $set: {
            name: 'Raul'
        },
        $inc: {
            age: 10
        }
    }, {
        returnOriginal: false
    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log('Unable to update Todo', err);
    });
    client.close();
});
