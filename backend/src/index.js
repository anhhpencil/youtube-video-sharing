const app = require('./app');

const PORT = 8080
let server;
server = app.listen(PORT, () => {
    console.log(`Backend listening to port ${PORT}`);
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    if (server) {
        server.close();
    }
});
