const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        minlength : 3
    },
},
{
    timestamps :true
});

const User = mongoose.model('User',UserSchema);

module.exports = User;