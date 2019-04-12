"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var todo_1 = require("../server/models/todo");
// Removes all todos from db
// Todo.remove({}).then( (result: any) => {
//     console.log(result);
// });
todo_1.Todo.findByIdAndRemove("5cb11b0b981261cbfc77ffab").then(function (todo) {
    console.log(todo);
});
