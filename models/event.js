let mongoose = require('mongoose');

// Article Schema
let eventSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  date:{
    type:Date,
    required:true
  },
  body:{
    type: String,
    required: true
  }
});

let Event = module.exports = mongoose.model('Event', eventSchema);
