const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: String, required: true },
    uuid: { type: String, required: true },
}, { timestamps: true });

const File = mongoose.model('File', FileSchema);

module.exports = File;