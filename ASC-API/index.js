require('dotenv').config()
const app = require('./config/server')
const db = require('./config/database')

/******  Démarrage serveur + DB  ********/

db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection OK');
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`This server is running on port ${process.env.SERVER_PORT}`);
    });
  })
  .catch(err => {
    console.log('Database Error:', err);
  });