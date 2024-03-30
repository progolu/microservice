const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    trim: true,
    // required : [true, 'Please add a E-mail'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid E-mail'
    ]

  },
}, { timestamps: true });


module.exports = mongoose.model("Flight", flightSchema);