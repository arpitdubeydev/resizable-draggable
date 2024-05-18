// Count.js
const mongoose = require("mongoose");

const countSchema = new mongoose.Schema({
  apiCalls: { type: Number }
});

module.exports = mongoose.model("Counts", countSchema);
