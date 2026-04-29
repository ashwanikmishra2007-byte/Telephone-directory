const mysql = require('mysql2/promise');

let db;

async function connectToDatabase() {
    db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ashwaniroot_2026',
        database: 'telephone_directory'
    });
    console.log('Connected to the database');
    return db;
}

connectToDatabase();

module.exports = connectToDatabase;