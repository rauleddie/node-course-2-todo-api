export {};
// The MongoClient constructor lets us connect to a Mongo server and 
// issue commands to manipulate the database.
const {MongoClient, ObjectID} = require('mongodb');

// * err represents the error argument if there is an error while trying to 
// connect to the database.
// * client represents the object we can use to issue commands to read and 
// write data.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err: Error, client: any) => {
    if(err) {
        console.log(err);
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // Get database object named TodoApp.
    const db = client.db('TodoApp');
    
    // deleteMany records
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then( (result: any) => {
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then(({result}: any) => {
    //     console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({completed: false}).then( (result: object) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'Raul'});
    
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5cabd4916ffbe25a3443cde9')})
    .then( (results: any) => {
        console.log(JSON.stringify(results, undefined, 2));
    });
    client.close();
});