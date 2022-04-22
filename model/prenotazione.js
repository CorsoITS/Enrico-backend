const { listPrenotazione, getPrenotazioneById, insertPrenotazione, updatePrenotazione, prenotazioneExistById, prenotazioneDeleteById, updateCampiPrenotazione, softDelete, updateFotoPrenotazione } = require('./prenotazione.dao');
const config= require('config');
const { logger } = require('../common/logging');

class Prenotazione {
    constructor(p) {
        if (p) {
            if (p.id)                     this.id =p.id;
            if (p.data)                this.data=p.data;
            if (p.sede_id)                   this.sede_id =p.sede_id;
            if (p.note)         this.note =p.note;
            if (p.persona_id)           this.persona_id=p.persona_id;
            if (p.somm_id)                this.somministrazione_id=p.somministrazione_id;

        } 
    }    
    
    static async lista (pagenum) {
        let listaPrenotazioneDAO=await listPrenotazione(pagenum);
        let res=[];
        logger.debug("Richiesta pagina num=" , pagenum);
        //  vecchio modo (sbagliato) di limitare il numero di risultati
        //      for ( let i = 0; (i <  config.get('max-results-per-page')) && (i<listaPrenotazioneDAO.length); i++ ) { 
        //          res.push(new Prenotazione(listaPrenotazioneDAO[i]));
        //    }

        listaPrenotazioneDAO.forEach( e => {
            res.push(new Prenotazione(e));
        });
        logger.silly("Prenotazione Model: list=" , res);
        return res;
    }

    static async get(id) {
        let pf=await getPrenotazioneById(id);
        if (pf) { return new Prenotazione(pf);}
        return null;
    }

    static async exists(id) {
        return await prenotazioneExistById(id);
    }

    static async find(id) {
        return await prenotazioneExistById(id);
    }

    static async delete(id) {
        return await prenotazioneDeleteById(id);
    }

    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    setData (x) {
        this.data=x;
    }
    getData () {
        return this.data;
    }

    setNote(string){
        return this.note=string
    }
    getNote(){
        return this.note
    }

    getSedeId(){
           return this.sede_id;
    }
    setSedeId(x){
        return this.sede_id=x
    }    

    setPersonaId (x) {
        this.persona_id=x;
    }
    getPersonaId () {
        return this.persona_id;
    }

    getSomministrazioneId(){
        return this.somm_id
    }
    setSomministrazioneId(x){
        return this.somm_id=x
    }



    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            // id e' definito quindi dobbiamo aggiornare il recordo della prenotazione
            let res= await updatePrenotazione (this.id, this.pers_id, this.post_id );
            if (! res) throw 'save Prenotazione failed (update case).'; 
        } else {
            // id non e' definito quindi dobbiamo creare un nuovo record
            let res= await insertPrenotazione ( this.pers_id, this.post_id);
            this.setId(res);
            if (! res) throw 'save Prenotazione failed (insert case).'; 
        }
    }

}

module.exports = Prenotazione;
