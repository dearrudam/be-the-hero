const app = require('./app');
const connection = require('./database/connection');
connection.migrate
    .latest()
    .then(() => {
        app.listen(3333);
    });
