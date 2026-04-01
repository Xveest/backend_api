const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
   
    ssl: {
        rejectUnauthorized: false
    }
});


pool.on('connect', () => console.log('Conexion a la BD exitosa'));

module.exports = pool;

