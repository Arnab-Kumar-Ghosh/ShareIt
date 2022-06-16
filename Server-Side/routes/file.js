const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();


const FileModel = require('../models/model');

router.get('/:uuid', async (request, response) => {
    try {
        const RequiredFile = await FileModel.findOne({ uuid: request.params.uuid });
        if (!RequiredFile) {
            return response.render('download', { Error: 'Link has been expired' });
        }
        return response.render('download', {
            UUID: RequiredFile.uuid,
            FileName: RequiredFile.filename,
            FileSize: RequiredFile.size,
            DownloadLink: `${process.env.BaseURL}/download/${RequiredFile.uuid}`
        });

    } catch (error) {
        return response.render('download', { Error: 'Something went wrong' });
    }
    
});


module.exports = router;