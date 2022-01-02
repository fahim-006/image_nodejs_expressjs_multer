const router = require('express').Router();
const upload = require('../middlewares/multer');
const multer = require('multer');
const db = require("../models");
const Photo = db.Photo;

//POST in carousel
router.route('/product_image')
    .post(async (req, res) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                    console.log(err)
            } else if (err) {
                console.log(err)
            }
            console.log(req.file);
            console.log((req.body)); //req body te ja ja asbe
            // image, caption
            //inserting in DB
      
                // Validate request
              
                // Create a CarouselPhoto
                const photo = {
                    product_id : req.body.product_id,
                    product_image: req.file.path,
                };
              
                // Save Tutorial in the database
                Photo.create(photo)
                  .then(data => {
                    res.send(data);
                  })
                  .catch(err => {
                    res.status(500).send({
                      message:
                         "Some error occurred while creating."
                    });
                  });
             
            //inserting in DB ends
        })
    })

//get All carousel
router.route('/product_image')
    .get(async (req, res) => {
        try{
            Photo.findAll().then (photos => {
                res.status(200).json(photos);
            })
        }catch(e) {
            res.status(400).send({ error: e.message });
        }
    })



module.exports = router;