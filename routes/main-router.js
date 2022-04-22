const routerPersona=require ('./persona-router.js');
const routerPrenotazione=require ('./prenotazione-router.js');
// const routerOperatore=require ('./operatore-router.js');
const routerSede=require ('./sede-router.js')

function ConnectRouter (app) {
    app.use('/persona', routerPersona);
    app.use('/prenotazione', routerPrenotazione);
    // app.use('/operatore', routerOperatore);
    app.use('./sede',routerSede);
}

module.exports = ConnectRouter;