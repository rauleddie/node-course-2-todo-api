"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load Mongoose Library
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
exports.default = mongoose;
