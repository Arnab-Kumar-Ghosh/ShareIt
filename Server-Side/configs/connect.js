const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

function ConnectDB() {
    mongoose.connect(process.env.MongoDatabaseConnectURL).catch(error => {
        console.log('Database did not connected.');
    });

    Connection = mongoose.connection;

    Connection.once('open', () => {
        console.log('Database Connected...');
    });
}


module.exports = ConnectDB;