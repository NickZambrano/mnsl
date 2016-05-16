var dip={
  create : function(req,res){
    var nomDiplome = req.body.nomDiplome || '';
    var dureeDiplome = req.body.dureeDiplome || '';

     var data = {text: req.body.text, complete: false};

    if (nomDiplome == '' || dureeDiplome == '') {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid credentials"
        });
        return;
    }
      var stringQuery = "INSERT INTO diplome(nomdiplome, dureediplome) values('"+nomDiplome+"','"+dureeDiplome+"')";
      client.query(stringQuery,function(err,result){

        if(err==undefined){
          res.status(200);
          res.json({
            "status" : 200,
            "message" : "succes to insert diplome"
          })
        }else{
          res.status(500);
          res.json({
            "status" : 500,
            "message" : "failed to insert diplome"
          })
        }
      });
      return;
  },
  getAll: function(req, res) {
    var stringQuery = "SELECT * FROM diplome";
    var query=client.query(stringQuery,function(err,result){
              if(err==undefined){
       res.send(result);
     }else{
       res.status(500);
       res.json({
         "status" : 500,
         "message" : "failed to insert diplome"
       })
     }
    });

    return;
  },
}
module.exports = dip;
