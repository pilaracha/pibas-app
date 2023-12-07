const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    google_id: String,
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    }
});


mongoose.model('users', userSchema);

