const { getConnection } = require('../common/connessione')
const config= require('config');
const { logger } = require('../common/logging');

const listSede = async (pagenum,citta,disponibili) => {
  const connection = await getConnection();
  let numres=config.get('max-results-per-page');
  let query='SELECT * FROM sede';
  if (disponibili) {
    query="SELECT sede.* , prenotazione.id as pren_id FROM sede left join prenotazione on sede.id = prenotazione.sede_id WHERE prenotazione.id IS NULL";
  }

  if ( citta ) {
    if ( disponibili) {
      query += ' AND sede.citta ="'+citta + '"';  
    } else {
      query += ' WHERE sede.citta ="'+citta + '"';
    }
  } 

  if ( pagenum > 0 ) {
    let start=(pagenum-1)*numres;
    query += ' LIMIT '+numres + ' OFFSET '+start;
  } 
  logger.debug('Query:' + query);
  const [rows] = await connection.query(query);
  logger.debug('Query Result:', rows);
  return rows;
}

const sedeExistById = async (id_sede) => {
  const connection = await getConnection();
  const query = 'SELECT 1 FROM sede WHERE id = ?';
  const [rows] = await connection.query(query, [id_sede]);
  return rows.length > 0;
}

const getSedeById = async (id_sede) => {
  const connection = await getConnection();
  const query = 'SELECT * FROM sede WHERE id = ?';
  const [rows] = await connection.query(query, [id_sede]);
  return rows[0];
}
// ALT + 0 0 9 6 => `
const insertSede = async (citta, indirizzo) => {
  const connection = await getConnection();
  const query = `INSERT INTO sede (citta, indirizzo) VALUES (?,?)`;
  const [res] = await connection.query(query, [citta, indirizzo]);
  return res.insertId;
}

const updateSede = async (id, citta, indirzzo) => {
  const connection = await getConnection();
  const query = `UPDATE sede SET citta = ?, indirizzo = ? WHERE id = ?`;
  const [res] = await connection.query(query, [citta, indirizzo, id]);
  return res.affectedRows === 1;
}
const sedeDeleteById = async (id_sede) => {
  const connection = await getConnection();
  const query = 'DELETE FROM sede WHERE id = ?';
  const [res] = await connection.query(query, [id_sede]);
  return res.affectedRows === 1;
}

module.exports = {
  listSede,
  sedeExistById,
  getSedeById,
  insertSede,
  updateSede,
  sedeDeleteById
}