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
        console.log(id);
        var stringQuery = "SELECT * FROM adherents WHERE mailad='"+id+"'";
        var query=client.query(stringQuery,function(err,result){
           res.send(result);
        });

    },
    getMy: function(req, res) {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
        var decoded = jwt.decode(token, require('../config/secret.js')());
        id=decoded.mailad;
        console.log(decoded);
        var stringQuery = "SELECT * FROM adherents WHERE mailad='"+id+"'";
        var query=client.query(stringQuery,function(err,result){
           res.send(result.rows[0]);
        });

    },
    create: function(req, res) {
        var newProduct = req.body;
        data.push(newProduct); // Spoof a DB call
        res.json(newProduct);
    },
    update: function(req, res) {
        var updateProduct = req.body;
        var id = req.params.id;
        console.log(req.params);
        /*var stringQuery = "UPDATE adherents SET req. WHERE mailad='"+id+"'";
        var query=client.query(stringQuery,function(err,result){
           res.send(result);
        });*/
        res.json(updateProduct);
    },
    delete: function(req, res) {
        var id = req.params.id;
        data.splice(id, 1) // Spoof a DB call
        res.json(true);
    }
};
var data = [{
    name: 'members 1',
    id: '1'
}, {
    name: 'product 2',
    id: '2'
}, {
    name: 'product 3',
    id: '3'
}];
module.exports = members;
