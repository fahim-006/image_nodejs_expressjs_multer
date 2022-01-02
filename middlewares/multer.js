//import abc from '../../impacts_finance/src/Components/media/img'
const multer = require('multer');
const multerStorage = multer.diskStorage({ //where the file will be uploaded
    destination: function (req, file, cb) {
        cb(null, 'media/img'); //the file will be stored in media/img
        //we can also get the name of the file here, we can print the file here
    },
    filename: function (req, file, cb) { //2nd property is the filename setup, to setup a unique file name
        //file will be here named image/png, 
        const ext = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${file.filename}-${uniqueSuffix}.${ext}`;
        cb(null, filename);
    }
})

module.exports = multer({ 
    storage: multerStorage
}).single('photo');