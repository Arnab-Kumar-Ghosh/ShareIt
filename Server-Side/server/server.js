const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const ConnectDB = require('../configs/connect');
const UploadRouter = require('../routes/upload');
const FileRouter = require('../routes/file');
const DownloadRouter = require('../routes/download');

dotenv.config();

const app = express();
const Port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../static')));

app.set('views', path.join(__dirname, '../static/views'));
app.set('view engine', 'ejs');

ConnectDB();

app.use('/upload', UploadRouter);
app.use('/file', FileRouter);
app.use('/download', DownloadRouter);

app.listen(Port, () => {
    console.log(`Listening on port ${Port}`);
});