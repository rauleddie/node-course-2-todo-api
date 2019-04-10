"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("../db/mongoose");
var mongoose_2 = require("mongoose");
var User = mongoose_1.mongoose.model('User', new mongoose_2.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
}));
exports.User = User;
