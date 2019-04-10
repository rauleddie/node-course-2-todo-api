import {mongoose} from '../db/mongoose';
import { Schema } from 'mongoose';

const User = mongoose.model('User', new Schema( {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
}));

export {User};