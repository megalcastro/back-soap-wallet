

const objectDB = {
    type: 'mysql',
    host: 'localhost',
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
}


const CONFIG_DB = Object.freeze(objectDB);


module.exports = CONFIG_DB;