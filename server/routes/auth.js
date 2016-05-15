var jwt = require('jwt-simple');
var crypto = require('crypto');
var auth = {
        signin : function(req,res){
          var mailad = req.body.mailad || '';
          var password = req.body.password || '';
          var confpassword = req.body.confpassword || '';
          var nomad = req.body.nomad || '';
          var prenomad = req.body.prenomad || '';
          var date_naissad = req.body.date_naissad || '';
          var telad = req.body.telad || '';

           var data = {text: req.body.text, complete: false};

          if (mailad == '' || password == '' || confpassword == '') {
              res.status(401);
              res.json({
                  "status": 401,
                  "message": "Invalid credentials"
              });
              return;
          }
          if(password == confpassword){
            var hash = crypto.createHash('sha256').update(password).digest('base64');
            var stringQuery = "INSERT INTO adherents(nomad, prenomad,date_naissad, mailad,telad, mdpad,formateur) values('"+nomad+"','"+prenomad+"','"+date_naissad+"','"+mailad+"','"+telad+"','"+ hash+"','false')";
            console.log(stringQuery);
            client.query(stringQuery);
            res.status(200);
            res.json({
              "status" : 200,
              "message" : "succes to signin"
            })
            return;

          }else{
              res.status(401);
              res.json({
                  "status": 401,
                  "message": "password and confpassword not corresponding"
              });
              return;
          }
        },
/*        login: function(req, res) {

            var mailad = req.body.mailad || '';
            var password = req.body.password || '';
            console.log(mailad);
            console.log(password);
            if (mailad == '' || password == '') {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid credentials"
                });
                return;
            }

            // Fire a query to your DB and check if the credentials are valid
            var dbUser;
            var stringQuery = "SELECT * FROM adherents WHERE mailad='"+req.body.mailad+"'";
            var query=client.query(stringQuery);
            query.on('row', function(row) {
              var hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
              if(row.mdpad == hash){
                dbUser=row;
                if(row.formateur){
                  dbUser.role='admin';
                }else{
                  dbUser.role='member';
                }
              }
            });
            query.on('end', function() {

                return res.json(genToken(dbUser));
              });

        },*/
  login: function(req, res) {
    var username = req.body.mailad || '';
    var password = req.body.password || '';
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
    var dbUserObj={};
    var hash = crypto.createHash('sha256').update(password).digest('base64');
    auth.validate(username,hash,function(result){
      if (!result) { // If authentication fails, we send a 401 back
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }

      if (result) {
        if(result.formateur==true){
          form='admin';
        }else{
          form='user';
        }
        dbUserObj = {
          name: result.nomad,
          role: form,
          username: result.mailad
        };
        res.json(genToken(dbUserObj));
      }
    });


  },
  isAdmin:function(req,res){
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, require('../config/secret.js')());
    role=decoded.role;
    user={
      role:role,
    }
    res.json(user);
  },

  validate: function(username, password, callback) {
    var stringQuery = "SELECT * FROM adherents WHERE mailad='"+username+"' AND mdpad='"+password+"'";
      client.query(stringQuery, function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        callback(result.rows[0]);
        return;
      });

  },/*
        validate: function(req, res) {
            // spoofing the DB response for simplicity
          /*  var dbUserObj = { // spoofing a userobject from the DB.
                name: 'arvind',
                role: 'admin',
                username: 'arvind@myapp.com'
            };},*/

        validateUser: function(username) {
            // spoofing the DB response for simplicity
            var dbUserObj = { // spoofing a userobject from the DB.
                name: 'arvind',
                role: 'user',
                username: 'arvind@myapp.com'
            };

            return dbUserObj;
        },
    }

// private method
function genToken(user) {
    var expires = expiresIn(7); // 7 days
    console.log(user);
    var token = jwt.encode({
        role:user.role,
        mailad:user.username,
        exp: expires
    }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
