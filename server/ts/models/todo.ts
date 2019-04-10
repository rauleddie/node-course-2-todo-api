import {mongoose} from '../db/mongoose';
import { Schema } from 'mongoose';

const Todo = mongoose.model('Todo',new Schema( {
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

export {Todo};