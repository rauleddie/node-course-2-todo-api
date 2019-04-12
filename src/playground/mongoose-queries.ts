import mongoose from '../server/db/mongoose';
import {Todo} from '../server/models/todo';
import {User} from '../server/models/user';
import {ObjectID} from 'mongodb';

// const id = "15caf8d31d8c7dc781c1ca6d0";

// // Resolves to .findOne due to unique id but inside an array
// Todo.find({
//     _id: id
// }).then( (todos: any[]) => {
//     console.log('Todos', todos);
// }).catch( (e: Error) => {
//     console.log('Unable to get todos', e);
// });

// // .findOne equivalent to previous find without the array wrap
// Todo.findOne({
//     _id: id
// }).then( (todo: any) => {
//     console.log('Todo', todo);
// }).catch( (e: Error) => {
//     console.log('Unable to get todo', e);
// });

// Equivalent to findOne with id specific query
// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }
// Todo.findById(id).then( (todo: any) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch( (e: Error) => {
//     console.log('Unable to get todo by id', e);
// });

// Find user by Id
const userId = "5cae485f62d39e2b24e2ccb8";

User.findById(userId).then((user: any) => {
    if(!user) {
        return console.log('User not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch( (e: Error) => {
    console.log('Unable to get user', e);
});