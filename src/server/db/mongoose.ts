// Load Mongoose Library
import mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(<string>process.env.MONGODB_URI);
export default mongoose;