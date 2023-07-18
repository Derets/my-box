const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  number: { type: String },
  city: { type: String },
  post: { type: String },
  image: { type: String, required: true },
  orders: [{ type: mongoose.Types.ObjectId, required: true, ref: "Order" }],
  role: { type: String, required: true },
  time: { type: Number, required: true },
  confirmedEmail: { type: Boolean, required: true },
  byGoogle: { type: Boolean, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
