const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');
const router = express.Router();

const FileModel = require('../models/model')

const MaxAllowedFileSize = 25 * 1024 * 1024;

Storage = multer.diskStorage({
    destination: (request, file, CallBack) => CallBack(null, 'files'),
    filename: (request, file, CallBack) => {
        const FileName = `${Date.now()}-${Math.round(Math.random() * 1E13)}${path.extname(file.originalname)}`;
        CallBack(null, FileName);
    }
})

let Upload = multer({
    storage: Storage,
    limit: { filesize: MaxAllowedFileSize }
}).single('myfile');

router.post('/', (request, response) => {
    Upload(request, response, async (error) => {

        if (error) {
            return response.send({ Error: error.message });
        }

        File = new FileModel({
            filename: request.file.filename,
            path: request.file.path,
            size: request.file.size,
            uuid: uuid.v4()
        });

        const Response = await File.save();
        response.json({ file: `${process.env.BaseURL}/file/${Response.uuid}` });
    });
})


module.exports = router;