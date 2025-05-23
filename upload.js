const multer = require('multer')
const DATE = new Date()
const {v4: uuidv4} = require('uuid')

const path = require('path')
const file_size = 1 * 1024 * 1024

const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, "./uploads");
    },
    filename:(req,file,cb)=>{
        const extension = path.extname(file.originalname)
        // const Newname = `${DATE.getSeconds()}-${Math.round(Math.random()*  1e9)}-${extension}`;
        const Newname = `${uuidv4()}-${extension}`;
        cb(null, Newname)
    }
});

const file_filter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/pdf', 'image/pdf'];
     if (allowedTypes.includes(file.mimetype)){
      cb(null, true);
    } else {
      cb(new Error('Only JPG, JPEG, or PNG files are allowed'));
    }
  };
  
//////
exports.upload = multer({
    storage: storage,
    limits :{
        fileSize : file_size
    },
        fileFilter: file_filter,
    
})