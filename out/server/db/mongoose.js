"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load Mongoose Library
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
exports.default = mongoose;
