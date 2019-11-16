const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User Model
let User = require('../models/user');
//Bring in Article model
let Article=require('../models/article');
//Bring in Event Model
let Event=require('../models/event');
//Bring Alumni in Alumni Model
let Alumni=require('../models/alumni');
// Register Form
router.get('/register', function(req, res){
  res.render('register',{
    toptitle:"Regsiter"
  });
});

// Register Proccess
router.post('/register', function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const slct=req.body.slct;

  req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('slct', 'You are is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password,
      slct:slct
    });
    let newAlumni = new Alumni({
      name:name,
      email:email,
      username:username,
      password:password,
      slct:slct
    });
    newAlumni.save();

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registered and can log in');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
});

// Login Form
router.get('/login', function(req, res){
  res.render('login',{
    toptitle:"Login"
  });
});
router.get('/Dashboard',ensureAuthenticated, function(req, res){
    Article.find({}, function(err, articles){
      if(err){
        console.log(err);
      }
      else
       {   for(i in articles.body)
        {
          let body=articles.body;
          body.length=110;
          let articlesbody=[];
          articlesbody.concat(body);
        }
          Event.find({}, function(err, events){
          if(err){
          console.log(err);
            } 
          else {
        res.render('dashboard', {
         events:events,
         articles:articles
        });
           }
        
      
    
       });
        }
       
        
  });
      
     
});
//Alumni List
router.get('/alumnuslist',ensureAuthenticated, function(req, res){
  Alumni.find({}, function(err, alumnus){
        if(err){
        console.log(err);
         } 
       else {
        res.render('Alumni_List', {
         alumnus:alumnus
        });
      }
       
    
  });
});
router.get('/seminarclips',ensureAuthenticated, function(req, res){
  Event.find({}, function(err, event){
        if(err){
        console.log(err);
         } 
       else {
        res.render('seminarclips', {
         clips:event
        });
      }
       
    
  });
});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/users/Dashboard',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});
router.get('/get_started', function(req, res){
  if(ensureauthenticated){
  res.redirect('Dashboard');
}
else{
   req.flash('danger', 'Please Register');
  res.redirect('register');

}

});
function ensureauthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
    else{
      return 0
    }
  }
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;
