const fs = require('fs');

const connectDB = require('../configs/connect');
const FileModel = require('../models/model');

connectDB();

async function Remove() {
    const files = await FileModel.find({ createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } })
    if (files.length) {
        for (const file of files) {

            try {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`Successfully deleted. ${file.filename}`);
            } catch (error) {
                console.log(`Error while deleting file. ${error} `);
            }
        }
    }
    console.log('Execution completed.');
}

Remove().then(process.exit);