var jwt = require('jwt-simple');
var members = {
    getAll: function(req, res) {
      var stringQuery = "SELECT * FROM adherents";
      var query=client.query(stringQuery,function(err,result){
         res.send(result);
      });

      return;
    },
    getOne: function(req, res) {
        var id = req.params.id;
        var stringQuery = "SELECT * FROM adherents WHERE mailad='"+id+"'";
        var query=client.query(stringQuery,function(err,result){
           res.send(result);
        });

    },
    getMy: function(req, res) {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
        var decoded = jwt.decode(token, require('../config/secret.js')());
        id=decoded.mailad;
        var stringQuery = "SELECT * FROM adherents WHERE mailad='"+id+"'";
        var query=client.query(stringQuery,function(err,result){
           res.send(result.rows[0]);
        });

    },
    formateur: function(req, res) {
        id=req.body.mailad;
        var stringQuery = "UPDATE adherents SET formateur='TRUE' WHERE mailad='"+id+"'";
        console.log(stringQuery);
        var query=client.query(stringQuery,function(err,result){
           res.send(result);
        });

    }
};

module.exports = members;
