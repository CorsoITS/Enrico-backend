const { Router } = require('express');
const routerSede = Router();
const SedeController = require ('../controllers/sedeController');


/**""
 * lista delle prenotazioni
 */
 routerSede.get('/', SedeController.lista);
 routerSede.get('/crea', (req, res) => {return res.render("creaSede",{id:"",nome:"",citta:"",indirizzo:""}) } );
 routerSede.post('/', SedeController.crea);
 routerSede.delete('/:id', SedeController.checkId, SedeController.elimina);
 routerSede.get('/:id', SedeController.checkId, SedeController.get);
 routerSede.put('/:id', SedeController.checkId, SedeController.edit);
 

module.exports = routerSede;