var jwt = require('jwt-simple');
var members = {
    getAll: function(req, res) {
      var stringQuery = "SELECT * FROM adherents";
      var query=client.query(stringQuery,function(err,result){
        if(err==undefined){
         res.send(result);
       }else{
         res.status(500);
         res.json({
           "status" : 500,
           "message" : "failed to select member"
         })
       }
      });

      return;
    },
    getOne: function(req, res) {
        var id = req.params.id;
        var stringQuery = "SELECT * FROM adherents WHERE mailad='"+id+"'";
        var query=client.query(stringQuery,function(err,result){
          if(err==undefined){
           res.send(result);
         }else{
           res.status(500);
           res.json({
             "status" : 500,
             "message" : "failed to select member"
           })
         }
        });

    },
    getMy: function(req, res) {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
        var decoded = jwt.decode(token, require('../config/secret.js')());
        id=decoded.mailad;
        var stringQuery = "SELECT * FROM adherents WHERE mailad='"+id+"'";
        var query=client.query(stringQuery,function(err,result){
          if(err==undefined){
           res.send(result.rows[0]);
         }else{
           res.status(500);
           res.json({
             "status" : 500,
             "message" : "failed to select member"
           })
         }
        });

    },
    formateur: function(req, res) {
        id=req.body.mailad;
        var stringQuery = "UPDATE adherents SET formateur='TRUE' WHERE mailad='"+id+"'";
        var query=client.query(stringQuery,function(err,result){
          if(err==undefined){
           res.send(result);
         }else{
           res.status(500);
           res.json({
             "status" : 500,
             "message" : "failed to update member"
           })
         }
        });

    }
};

module.exports = members;
