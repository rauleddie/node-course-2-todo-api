"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Set up ENVIRONMENT variables
console.log('starting');
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    process.env.PORT = '3000';
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}
else if (env === 'test') {
    process.env.PORT = '3000';
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
