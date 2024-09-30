require('dotenv').config();
const http = require('http');
const AppDataSource = require('./src/config/data-source');
const startSoapServer = require('./src/controllers/SOAPController');

const server = http.createServer();

AppDataSource.initialize()
    .then(() => {
        console.log('Database initialized');
        startSoapServer(server);
        server.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error);
    });
