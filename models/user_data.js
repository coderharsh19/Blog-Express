const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose")

////// User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});




const User = mongoose.model("UserData", UserSchema);

module.exports = User;
