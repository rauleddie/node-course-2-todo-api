"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("../db/mongoose"));
var mongoose_2 = require("mongoose");
exports.User = mongoose_1.default.model('User', new mongoose_2.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
}));
