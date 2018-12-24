const express = require('express')
const router = express.Router();
const Betrippin = require('../models/betrippin')


router.route('/')
  .get((req, res) =>{
    Betrippin.find({}, (err, betrippins) =>{
      res.status(err ? 400: 200).send(err || betrippins);
    });
  })

router.route('/:id')
  .delete((req, res) =>{
    Betrippin.findByIdAndRemove(req.params.id, err =>{
      if(err){
        return res.status(400).send(err);
      }
      Betrippin.find({}, (err, betrippins) => {
        res.status(err ? 400: 200).send(err || betrippins);
      })
    });
  })

module.exports = router;
