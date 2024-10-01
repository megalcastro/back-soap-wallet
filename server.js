require('dotenv').config();
const http = require('http');
const express = require('express');
const AppDataSource = require('./src/config/data-source');
const startSoapServer = require('./src/controllers/SOAPController');
/* Rutas REST */
const restApiRoutes = require('./src/routes/restApiRoutes');



const app = express();
app.use(express.json());
app.use('/api', restApiRoutes);

const PORT = process.env.PORT;

const server = http.createServer(app);
server.listen(PORT, () => {
    AppDataSource.initialize()
        .then(() => {
            console.log('Database initialized');
            console.log(`initialized REST-API on http://localhost:${PORT}/api`);
            startSoapServer(server);
        })
        .catch((error) => {
            console.error('Error during Data Source initialization:', error);
        });
});






