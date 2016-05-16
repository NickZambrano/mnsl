var mydip={
  create : function(req,res){
    var id = req.body.numAd || '';
    var numDiplome = req.body.numDiplome || '';
    var dateObtention = req.body.dateObtention || '';
    console.log(id);
     var data = {text: req.body.text, complete: false};

    if (numDiplome == '' || dateObtention == '' || id =='' ) {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid credentials"
        });
        return;
    }
      var stringQuery = "INSERT INTO Diplome_Obtenu(numDiplome, numAd, dateObtention) values('"+numDiplome+"','"+id+"','"+dateObtention+"')";
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
  getOne: function(req, res) {

    var id = req.body.numAd || '';
    var stringQuery = "SELECT * FROM Diplome_Obtenu o, Diplome d WHERE numAd='"+id+"' AND o.numdiplome=d.numdiplome";
    dateNow=new Date();
    var query=client.query(stringQuery,function(err,result){
      if(err==undefined){
      for(i=0;i<result.rows.length;i++){
        result.rows[i].expire=false;
        dateObtention=result.rows[i].dateobtention;
        duree=result.rows[i].dureediplome;
        dateObt=new Date(dateObtention);

        dateObt.setYear(dateObt.getFullYear()+duree)
          result.rows[i].datexpire=dateObt;
        if(dateNow> dateObt){
          result.rows[i].expire=true;
        }
       }

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
module.exports = mydip;
