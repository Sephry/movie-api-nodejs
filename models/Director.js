const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
  name: {
    type: String,
    maxlength: 30,
    min: 2,
  },
  surname: {
    type: String,
    maxlength: 30,
    min: 2,
  },
  bio: {
    type: String,
    maxlength: 300,
    min: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("director", DirectorSchema);
