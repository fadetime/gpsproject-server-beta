const mongoose = require('mongoose');

const clerkSchema = mongoose.Schema({
  email: { type: String },
  name: { type: String },
  phone: { type: String },
  password: { type: String },
  entryDate: { type: Date, default: Date.now() },
  role: { type: String , default:'user'}
});

module.exports = mongoose.model('Clerk', clerkSchema);