const express = require('express');
const router = express.Router();
path = require('path');


const FileModel = require('../models/model');

router.get('/:uuid', async (request, response) => {
   const RequiredFile = await FileModel.findOne({ uuid: request.params.uuid });

   if (!RequiredFile) {
      return response.render('download', { Error: 'Link has been expired' });
   }

   const Response = await RequiredFile.save();
   const FilePath = path.join(__dirname, `../${RequiredFile.path}`);
   response.download(FilePath);

});

module.exports = router;