var jwt = require('jwt-simple');
var form={
  create : function(req,res){
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, require('../config/secret.js')());
    id=decoded.mailad;
    var mailform = id;
    var numdiplome = req.body.numdiplome || '';
    var datedebformation = req.body.datedebformation || '';
    var datefinformation = req.body.datefinformation || '';
    var typeformation = req.body.typeformation || '';
    var nbplace = req.body.nbplace || '';
    console.log(req.body);
     var data = {text: req.body.text, complete: false};

    if (numdiplome == '' || datedebformation == '' || typeformation == '') {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid credentials"
        });
        return;
    }
      var stringQuery = "INSERT INTO formation(mailform, numdiplome, datedebformation,datefinformation,typeformation,nbparticipant,nbplace) values('"+mailform+"','"+numdiplome+"','"+datedebformation+"','"+datefinformation+"','"+typeformation+"','0','"+nbplace+"')";
      client.query(stringQuery);
      res.status(200);
      res.json({
        "status" : 200,
        "message" : "succes to insert formation"
      })
      return;
  },
  addPart : function(req,res){
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, require('../config/secret.js')());
    id=decoded.mailad;
    var mailform = id;
    var numformation = req.body.numFormation || '';
     var data = {text: req.body.text, complete: false};
    if (numformation == '') {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid credentials"
        });
        return;
    }


      var stringQuery = "INSERT INTO participer_form VALUES ('"+numformation+"','"+id+"')";
            client.query(stringQuery,function(err,result){
              if(err==undefined){
                res.status(200);
                res.json({
                  "status" : 200,
                  "message" : "succes to insert participer_form"
                })
              }else{
                console.log(err);
                res.status(500);
                res.json({
                  "status" : 500,
                  "message" : "failed to insert participer_form"
                })
              }
            });
      return;
  },
  deletePart : function(req,res){
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = jwt.decode(token, require('../config/secret.js')());
    id=decoded.mailad;
    var mailform = id;
    var numformation = req.body.numFormation || '';
     var data = {text: req.body.text, complete: false};
    if (numformation == '') {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid credentials"
        });
        return;
    }
      var stringQuery = "DELETE FROM participer_form WHERE mailad='"+mailform+"' AND numformation='"+numformation+"'";
            client.query(stringQuery,function(err,result){
              if(err==undefined){
                res.status(200);
                res.json({
                  "status" : 200,
                  "message" : "succes to delete participer_form"
                })
              }else{
                console.log(err);
                res.status(500);
                res.json({
                  "status" : 500,
                  "message" : "failed to delete participer_form"
                })
              }
            });
      return;
  },
  delete : function(req,res){
    var numformation = req.body.numFormation || '';
     var data = {text: req.body.text, complete: false};
    if (numformation == '') {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid credentials"
        });
        return;
    }
    var stringQuery = "DELETE FROM participer_form WHERE numformation='"+numformation+"'";
    client.query(stringQuery);
      var stringQuery = "DELETE FROM formation WHERE numformation='"+numformation+"'";
            client.query(stringQuery,function(err,result){
              if(err==undefined){
                res.status(200);
                res.json({
                  "status" : 200,
                  "message" : "succes to delete in formation"
                })
              }else{
                console.log(err);
                res.status(500);
                res.json({
                  "status" : 500,
                  "message" : "failed to delete in formation"
                })
              }
            });
      return;
  },
  getOne: function(req, res) {
      var id = req.params.id;
      var stringQuery = "SELECT f.mailform,a.nomad, a.numad, a.prenomad,a.mailad, f.typeformation, d.nomdiplome, f.nbplace, f.nbparticipant,f.numformation, f.datedebformation,f.datefinformation FROM Formation f, diplome d, adherents a, participer_Form p WHERE f.numformation='"+id+"' AND p.numformation=f.numformation AND a.mailad=p.mailad AND d.numdiplome=f.numdiplome";
      var query=client.query(stringQuery,function(err,result){

        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
        var decoded = jwt.decode(token, require('../config/secret.js')());
        mail=decoded.mailad;
        if(result.rows[0]!=undefined){

          result.nopart=false;
          result.participate=false;
          result.encours=false;
          result.fini=false;
          datedeb=result.rows[0].datedebformation;
          datefin=result.rows[0].datefinformation;
          if(dateNow> datedeb){
            result.encours=true;
            if(dateNow> datefin){
              result.encours=false;
              result.fini=true;
            }
          }
          for(i=0;i<result.rows.length;i++){
            if(result.rows[i].mailad==mail){
              result.participate=true;
            }
          }

        if(mail==result.rows[0].mailform){
          result.form=true;
        }
                 res.send(result);
      }else{
        var stringQuery = "SELECT f.mailform , f.typeformation, d.nomdiplome, f.nbplace, f.nbparticipant,f.numformation, f.datedebformation,f.datefinformation FROM Formation f, diplome d WHERE f.numformation='"+id+"' AND d.numdiplome=f.numdiplome";
        var query=client.query(stringQuery,function(err,result){
          result.participate=false;
            result.nopart=true;
            result.encours=false;
            result.fini=false;
            datedeb=result.rows[0].datedebformation;
            datefin=result.rows[0].datefinformation;
            if(dateNow> datedeb){
              result.encours=true;
              if(dateNow> datefin){
                result.encours=false;
                result.fini=true;
              }
            }
          if(mail==result.rows[0].mailform){
            result.form=true;
          }
          res.send(result);
        })
      }
      });

  },
  getAll: function(req, res) {
    var stringQuery = "SELECT * FROM formation f, diplome d WHERE d.numdiplome=f.numdiplome";
    var query=client.query(stringQuery,function(err,result){
      dateNow=new Date();
      for(i=0;i<result.rows.length;i++){
        result.rows[i].encours=false;
        result.rows[i].fini=false;
        datedeb=result.rows[i].datedebformation;
        datefin=result.rows[i].datefinformation;
        if(dateNow> datedeb){
          result.rows[i].encours=true;
          if(dateNow> datefin){
            result.rows[i].encours=false;
            result.rows[i].fini=true;
          }
        }
       }
       res.send(result);
    });

    return;
  },
  validateForm(req,res){
    var numformation = req.body.numFormation || '';
    var numad=req.body.numAd || ''
     var data = {text: req.body.text, complete: false};
    if (numformation == '' || numad =='') {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid credentials"
        });
        return;
    }

    var stringQuery = "INSERT INTO Resultat VALUES ('"+numformation+"','"+numad+"','OBTENU')";
          client.query(stringQuery,function(err,result){
            if(err==undefined){
              res.status(200);
              res.json({
                "status" : 200,
                "message" : "succes to insert participer_form"
              })
            }else{
              console.log(err);
              res.status(500);
              res.json({
                "status" : 500,
                "message" : "failed to insert participer_form"
              })
            }
          });
    return;
  }
}
module.exports = form;
