// The MongoClient constructor lets us connect to a Mongo server and 
// issue commands to manipulate the database.
const {MongoClient, ObjectID} = require('mongodb');

// const obj = new ObjectID();
// console.log(obj);

// * err represents the error argument if there is an error while trying to 
// connect to the database.
// * client represents the object we can use to issue commands to read and 
// write data.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err: any, client: any) => {
    if(err) {
        console.log(err);
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // Get database object named TodoApp.
    const db = client.db('TodoApp');

    // Create a collection in the database named Todos and add data.
    // * insertOne takes as parameter an object to add to the DB and a 
    // callback function (err, result).
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err: any, result: any) => {
        if(err) {
            return console.log('Unable to add todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // Insert new doc into the Users(name, age, location).
    db.collection('Users').insertOne({
        name: 'Raul', 
        age: 25,
        location: 'Tijuana'
    }, (err: any, result: any) => {
        if(err) {
            return console.log('Unabe to add todo', err);
        }
        console.log(result.ops[0]._id.getTimestamp());
    });

    client.close();
});