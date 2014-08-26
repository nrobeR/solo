var express = require('express');
var passport = require('passport');
var partials = require('express-partials');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var Promise = require('bluebird');
var app = express();


var LINKEDIN_API_KEY = '75b34w5k14znrk';
var LINKEDIN_SECRET_KEY = 'Yly2468vRePd8DNd';
var CALLBACK = "http://127.0.0.1:3000/auth/linkedin/callback";
var Linkedin = require('node-linkedin')(LINKEDIN_API_KEY,LINKEDIN_SECRET_KEY,CALLBACK);
var linkedin;
// app.use(express.logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('Secret'));
app.use(session());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/client'));

passport.serializeUser(function(user,done){
  done(null,user);
});
passport.deserializeUser(function(obj,done){
  done(null,obj);
});

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
    profileFields:['id','first-name','last-name','email-address','connections']
  },

  function(token,tokenSecret,profile,done){
  	var args = arguments;
  	process.nextTick(function(){
  	  console.log('--------',token);
      // linkedin = Linkedin.init(token);
      // linkedin.people.me(['id','first-name','last-name'],function(err,$in){
      // 	if(err) throw(err);
      // 	else console.log($in);
      // });
  	  // console.log("+++++++",JSON.stringify(args));
  	  return done(null,profile);
  	});
  }

));

app.get('/',function(req,res){
  res.sendfile('client/index.html');
});

// app.get('/auth/linkedin',passport.authenticate('linkedin',{scope:['r_basicprofile','r_emailaddress','r_network']}),
//   function(req,res){
// });

// // app.get('/')

// app.get('/auth/linkedin/callback',passport.authenticate('linkedin',{failureRedirect: '/'}),
//     function(req,res){
//       console.log('+++++++++++',req);
//       res.redirect('/')
//     });



app.get('/auth/linkedin', function(req, res) {
    // This will ask for permisssions etc and redirect to callback url.
    Linkedin.auth.authorize(res, ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages']);
});

app.get('/auth/linkedin/callback', function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, function(err, results) {
        if ( err )
            return console.error(err);

        var accessToken = JSON.parse(results)['access_token'];
        linkedin = Linkedin.init(accessToken);
        linkedin.connections.retrieve(function(err,connections){
          console.log("+++++++",connections);
        });
        console.log("-------",JSON.parse(results)['access_token']);
        return res.redirect('/');
    });
});





app.get('/logout',function(req,res){
  req.session.destroy(function(){
  	res.send('logged out');
  })
})

app.listen(3000);