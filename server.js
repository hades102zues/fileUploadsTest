const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
/*
	typical storage configurations
*/
const fileStorage = multer.diskStorage({
	destination : (req, file, cb) => {
		cb(null,  path.join(__dirname, 'uploads' ) ); //notice how i had to create the directory MANUALLY
	},
	filename: (req, file, cb) =>{
		cb(null, 'somename' + '_' + file.originalname );
	}
});

const filterFunction = (req, file, cb)=>{
	(file.mimetype == '.png' || '.jpg') ? cb(null, true) : cb(null, false)
};

const upload = multer({storage : fileStorage, fileFilter : filterFunction});


app.use('/', upload.single('picture'), (req, res)=>res.json({message: 'Hiii'}));

app.listen(3000, ()=>console.log('Im running'));