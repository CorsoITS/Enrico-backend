const { listSede,getSedeById,  insertSede, updateSede, sedeExistById, sedeDeleteById } = require('./sede.dao');
const config= require('config');
const { logger } = require('../common/logging');

class Sede {
    constructor(p) {
        if (p) {
            if (p.id)                  this.id =p.id;
            if (p.nome)             this.nome=p.nome
            if (p.citta)            this.citta =p.citta;
            if (p.indirizzo)               this.indirizzo =p.indirizzo;
        } 
    }    
    
    static async lista (pagenum,citta,disponibili) {
        let listaSedeDAO=await listSede(pagenum,citta,disponibili);
        let res=[];
        logger.debug("Richiesta pagina num=" , pagenum);
      

        listaSedeDAO.forEach( e => {
            res.push(new Sede(e));
        });
        logger.silly("Postazione Model: list=" , res);
        return res;
    }

    static async get(id) {
        let pf=await getSedeById(id);
        if (pf) { return new Sede(pf);}
        return null;
    }

    static async exists(id) {
        return await sedeExistById(id);
    }

    static async find(id) {
        return await sedeExistById(id);
    }

    static async delete(id) {
        return await sedeDeleteById(id);
    }

    // id
    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    //data_ora
    setnome(x) {
        this.nome=x;
    }
    getNome() {
        return this.nome;
    }

    //luogo
    setCitta(x) {
        this.citta=x;
    }
    getLuogo() {
        return this.citta;
    }

    setIndirizzo(x) {
        this.indirizzo=x
    }
    getIndirizzo(){
        return this.indirizzo
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            // id e' definito quindi dobbiamo aggiornare il recordo della Postazione
            let res= await updateSede (this.id, this.città, this.indirizzo);
            if (! res) throw 'save sede failed (update case).'; 
        } else {
            // id non e' definito quindi dobbiamo creare un nuovo record
            let res= await insertSede ( this.città, this.indirizzo);
            this.setId(res);
            if (! res) throw 'save sede failed (insert case).'; 
        }
    }

}

module.exports = Sede;
