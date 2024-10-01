require('dotenv').config();

const mysql = require('mysql2/promise');

async function createDatabaseIfNotExists() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        });

        console.log('Conexión establecida con el servidor de MySQL');

        
        const [rows] = await connection.query(`SHOW DATABASES LIKE '${process.env.DB_NAME}';`);

        if (rows.length > 0) {
            console.log(`La base de datos ${process.env.DB_NAME} ya existe, no se creará de nuevo.`);
        } else {
            
            await connection.query(`CREATE DATABASE ${process.env.DB_NAME};`);
            console.log(`Base de datos ${process.env.DB_NAME} creada exitosamente.`);
        }

        await connection.end();

    } catch (error) {
        console.error('Error al verificar o crear la base de datos:', error);
    }
}

createDatabaseIfNotExists();
