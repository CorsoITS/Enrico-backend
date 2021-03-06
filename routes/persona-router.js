const { Router } = require('express');
const routerPersona = Router();
const PersonaController = require ('../controllers/PersonaController.js');

routerPersona.get('/', PersonaController.lista);
routerPersona.get('/crea', (req, res) => {return res.render("creapersona",{id:"",nome:"",cognome:"", CodFis:""}) } );
routerPersona.post('/', PersonaController.crea);
routerPersona.delete('/:id', PersonaController.checkId, PersonaController.elimina);
routerPersona.get('/:id', PersonaController.checkId, PersonaController.get);
routerPersona.put('/:id', PersonaController.checkId, PersonaController.edit);



module.exports = routerPersona;