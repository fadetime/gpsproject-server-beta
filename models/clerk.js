const mongoose = require('mongoose');

const clerkSchema = mongoose.Schema({
  email: { type: String },
  password:{type:String},
  entryDate:{type:Date,default:Date.now()},
  role:{type:String}
});

module.exports = mongoose.model('Clerk', clerkSchema);