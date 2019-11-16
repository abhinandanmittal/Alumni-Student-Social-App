const mongoose = require('mongoose');

// User Schema
const AlumniSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  slct:{
    type:String,
    required:true
  },
   username:{
    type: String,
    required: true
  },
   degree:{
    type: String,
    required: false
  },
   passdata:{
    type: Date,
    required: false
  },
   skills:{
    type: String,
    required: false
  },
  collage:{
    type: String,
    required: false
  },
  number:{
    type: String,
    required: false
  }
});

const Alumni = module.exports = mongoose.model('Alumni', AlumniSchema);
