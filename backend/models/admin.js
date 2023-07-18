const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
});

module.exports = mongoose.model("Admin", adminSchema);
