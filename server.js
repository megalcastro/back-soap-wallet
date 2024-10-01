require('dotenv').config();
const http = require('http');
const express = require('express');
const AppDataSource = require('./src/config/data-source');
const startSoapServer = require('./src/controllers/SOAPController');
const restApiRoutes = require('./src/routes/restApiRoutes'); // Asumiendo que tienes rutas REST



const app = express();
app.use(express.json());
app.use('/api', restApiRoutes);

const server = http.createServer(app);
server.listen(3000, () => {
    AppDataSource.initialize()
        .then(() => {
            console.log('Database initialized');
            startSoapServer(server);
        })
        .catch((error) => {
            console.error('Error during Data Source initialization:', error);
        });
});

/* Rutas REST */




