const mongoose = require("mongoose");
const { Schema } = mongoose;

const querySchema = new Schema({
  term: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Query", querySchema);
