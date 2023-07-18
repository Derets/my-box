const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  typeOfBox: { type: String, required: true },
  size: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  colors: {
    colorOne: { type: String, required: true },
    colorTwo: { type: String, required: true },
    colorThree: { type: String, required: true },
  },
  address: {
    email: { type: String, required: true },
    telNumber: { type: String, required: true },
    city: { type: String, required: true },
    postDepartment: { type: String, required: true },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  time: { type: Number, required: true },
  updates: { type: Number, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
