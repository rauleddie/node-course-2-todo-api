"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("../db/mongoose");
var mongoose_2 = require("mongoose");
var Todo = mongoose_1.mongoose.model('Todo', new mongoose_2.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
}));
exports.Todo = Todo;
