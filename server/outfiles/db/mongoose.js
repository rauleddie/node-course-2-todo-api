"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load Mongoose Library
var mongoose = require("mongoose");
exports.mongoose = mongoose;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
