const Sede=require('../model/sede');
const { logger } = require('../common/logging');

class SedeController {
    static async lista (req , res){
        let citta=null;
        let disponibili=false;
        let pagnum=1;
        if (req.query.pag) {
            pagnum=req.query.pag;
        }
        if (req.query.citta) {
            citta=req.query.citta;
        }
        logger.debug("req.query.libero="+ req.query.libero);
        if (typeof (req.query.libero) != 'undefined') {
            disponibili=true;
        }

        logger.debug ("SedeController pag=" + pagnum + "luogo="+ citta + "disponibili=" + disponibili);

        let result=await sede.lista(pagnum,citta,disponibili);
        //return res.json(result);    
        //return PersonaView(res, result );
        if ( req.accepts("html") ) {
            return res.render("listsede",{lista:result});
        } else {
            return res.json(result);
        }
        
    } 
    static async crea (req,res) {
        try {
            let np=new Sede();
            logger.debug("req.body:", req.body);
            if (req.body.citta) np.setCitta(req.body.citta);
            if (req.body.indirizzo) np.setIndirizzo(req.body.indirizzo);            
            logger.debug("Creo nuova sede:", np);
            await  np.save();
            res.status(201).send("Created");
            //return PostazioneController.lista (req,res) ;
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                logger.debug("SedeController checkId req.params.id:", req.params.id);
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico");
                }
                let p;
                p=await Sede.get(req.params.id);
                if (p ) {
                    logger.debug("PostazioneController checkId found",p);
                    req.Sede=p;
                    next();
                }  else {
                    logger.error("PostazioneController checkId Errore - id non trovato");
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                logger.error("Errore Cancellazione Sede - id non fornito");
                return res.status(404).send("Id NON Fornito");
            }
        } catch (err) {
            logger.error ("ERRORE:", err);
            return res.status(500).send ("Internal Server Error");
        }            
    }

    static async elimina (req,res) {
        try {
                 if (await Sede.delete(req.params.id) ) {
                    logger.debug("PostazioneController eliminato ", req.params.id);
                    res.status(200).send('Ok');
                } else {
                    logger.error("Errore Cancellazione Postazione", req.params.id);
                    res.status(400).send ("Errore Cancellazione Postazione");
                }
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async get (req,res) {
        let result;
        if ( ! req.Sede ) {
            result=await Sede.get(req.params.id);
        } else {
            result = req.Sede;
        }
        
        if ( req.accepts("html") ) {
            return res.render("creasede",result);
        } else {
            return res.json(result);
        }
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Sede ) {
                np=await Sede.get(req.params.id);
            } else {
                np = req.Sede;
            }
            logger.debug("req.body:", req.body);
            if (req.body.citta) np.setCitta(req.body.citta);
            if (req.body.indirizzo) np.setIndirizzo(req.body.indirizzo);            
            logger.debug("Salvo la sede:", np);
            await  np.save();
            res.status(200).send("Ok");
            //return PostazioneController.lista (req,res) ;
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }

    }

}

module.exports=SedeController;