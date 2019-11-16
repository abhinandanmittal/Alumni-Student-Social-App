const express = require('express');
const router = express.Router();

// Article Model
let Event = require('../models/event');
// User Model
let User = require('../models/user');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
  res.render('add_event', {
    title:'Add Event'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){
  req.checkBody('title','Title is required').notEmpty();
  //req.checkBody('author','Author is required').notEmpty();
  req.checkBody('body','Body is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add', {
      title:'Add Event',
      errors:errors
    });
  } else {
    let event = new Event();
    event.title = req.body.title;
    event.author = req.user.name;
    event.body = req.body.body;
    event.date=req.body.date;

    event.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Event Added');
        res.redirect('/users/Dashboard');
      }
    });
  }
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Event.findById(req.params.id, function(err, event){
    if(event.author != req.user.name){
      req.flash('danger', 'Not Authorized');
      return res.redirect('/users/Dashboard');
    }
    res.render('edit_event', {
      title:'Edit event',
      event:event
    });
  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
  let event = {};
 event.title = req.body.title;
  event.body = req.body.body;

  let query = {_id:req.params.id}

  Event.updateMany(query, event, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Event Updated');
      res.redirect('/users/Dashboard');
    }
  });
});

// Delete Article
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Event.findById(req.params.id, function(err, event){
    if(event.author != req.user.name){
      res.status(500).send();
    } else {
      Event.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

// Get Single Article
router.get('/:id', ensureAuthenticated,function(req, res){
  Event.findById(req.params.id, function(err, event){
   
      res.render('event', {
        event:event
        
      });
  
  });
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;