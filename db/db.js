const { Client } = require('pg');

const connection = new Client ({
  host: 'localhost',
  user: 'test',
  password: '',
  database: 'techtreasure',
  port: 5432
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return
  }
});

module.exports = connection;