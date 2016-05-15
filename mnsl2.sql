
CREATE DATABASE mnsl
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'French_France.1252'
       LC_CTYPE = 'French_France.1252'
       CONNECTION LIMIT = -1;


CREATE TABLE Adherents(
  numAd SERIAL PRIMARY KEY,
  nomAd VARCHAR(20),
  prenomAd VARCHAR(20),
  date_naissAd DATE,
  mailAd VARCHAR(50) UNIQUE,
  telAd INTEGER,
  mdpAd VARCHAR(64),
  formateur boolean
);

CREATE TABLE Diplome( numDiplome SERIAL PRIMARY KEY, nomDiplome VARCHAR(20) UNIQUE, dureeDiplome INTEGER);


CREATE TABLE Formation(
  numFormation SERIAL PRIMARY KEY,
  mailform VARCHAR(20) NOT NULL,
  numDiplome INTEGER NOT NULL,
  dateDebFormation DATE,
  dateFinFormation DATE,
  typeFormation VARCHAR(20) check (typeFormation in ('RECYCLAGE','OBTENTION')),
  nbParticipant INTEGER,
  nbPlace INTEGER,
  CONSTRAINT FK_Formation_mailform FOREIGN KEY (mailform) REFERENCES Adherents(mailAd),
  CONSTRAINT FK_Formation_numDiplome FOREIGN KEY (numDiplome) REFERENCES Diplome(numDiplome)
);

CREATE TABLE Participer_Form(
  numFormation INTEGER NOT NULL,
  mailAd VARCHAR(50),
  PRIMARY KEY (numFormation,mailAd),
  CONSTRAINT FK_Participer_mailAd FOREIGN KEY (mailAd) REFERENCES Adherents(mailAd),
  CONSTRAINT FK_Participer_numFormation FOREIGN KEY (numFormation) REFERENCES Formation(numFormation)
);

CREATE TABLE Resultat(
  numFormation INTEGER NOT NULL,
  numAd INTEGER NOT NULL,
  PRIMARY KEY(numFormation, numAd),
  resultatForm VARCHAR(20) check (resultatForm in ('RECALE','OBTENU','ABSENT')),
  CONSTRAINT FK_Resultat_numAd FOREIGN KEY (numAd) REFERENCES Adherents(numAd),
  CONSTRAINT FK_Resultat_numFormation FOREIGN KEY (numFormation) REFERENCES Formation(numFormation)
);

CREATE TABLE Diplome_Obtenu(
  numDiplome INTEGER NOT NULL,
  numAd INTEGER NOT NULL,
  dateObtention DATE,
  PRIMARY KEY(numDiplome, numAd),
  CONSTRAINT FK_Diplome_numDiplome FOREIGN KEY (numDiplome) REFERENCES Diplome(numDiplome),
  CONSTRAINT FK_Diplome_numAd FOREIGN KEY (numAd) REFERENCES Adherents(numAd)
);


CREATE OR REPLACE FUNCTION down_nbPlace () RETURNS TRIGGER AS
'
  DECLARE
    nbpartForm integer;
  BEGIN
    select into nbpartForm nbparticipant from formation where numformation=NEW.numformation;
    nbpartForm:=nbpartForm+1;
    UPDATE formation SET nbparticipant=nbpartForm WHERE numformation=NEW.numformation;
    RETURN new;
  END;
'
LANGUAGE 'plpgsql';


CREATE TRIGGER addPart AFTER INSERT ON participer_form
  FOR EACH ROW
   EXECUTE PROCEDURE down_nbPlace();

      CREATE OR REPLACE FUNCTION up_nbPlace () RETURNS TRIGGER AS
      '
        DECLARE
          nbpartForm integer;
        BEGIN
          select into nbpartForm nbparticipant from formation where numformation=OLD.numformation;
          nbpartForm:=nbpartForm-1;
          UPDATE formation SET nbparticipant=nbpartForm WHERE numformation=OLD.numformation;
          RETURN OLD;
        END;
      '
      LANGUAGE 'plpgsql';

   CREATE TRIGGER deletePart BEFORE DELETE ON participer_form
     FOR EACH ROW
      EXECUTE PROCEDURE up_nbPlace();

	  CREATE TRIGGER addPart AFTER INSERT ON participer_form
  FOR EACH ROW
   EXECUTE PROCEDURE down_nbPlace();



         CREATE OR REPLACE FUNCTION add_dip() RETURNS TRIGGER AS
         $BODY$
           DECLARE
             dateObt Date;
   		  numDip integer;
   		  typeForm VARCHAR(20);
   		  obt VARCHAR(20);
           BEGIN
   		select into dateObt,numDip,typeForm dateFinFormation,numDiplome,typeFormation from formation where numformation=NEW.numformation;
   		  if new.resultatForm='OBTENU' THEN
   			if typeForm='OBTENTION' THEN
   			INSERT INTO Diplome_Obtenu VALUES(numDip,NEW.numAd,dateObt);
   			END IF;
   			IF typeForm='RECYCLAGE' THEN
   			UPDATE diplome_obtenu SET dateobtention=dateObt WHERE numad=NEW.numad;
   			END IF;
   		  END IF;
             RETURN NEW;
           END;
         $BODY$
         LANGUAGE 'plpgsql';


   CREATE TRIGGER goodResult AFTER INSERT ON Resultat
     FOR EACH ROW
      EXECUTE PROCEDURE add_dip();
