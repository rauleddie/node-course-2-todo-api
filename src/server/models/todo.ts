import mongoose from '../db/mongoose';
import { Schema } from 'mongoose';

export const Todo = mongoose.model('Todo',new Schema( {
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

export type Todotype = {
    text: string,
    completed: boolean,
    completedAt?: number | null
}