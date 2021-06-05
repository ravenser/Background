const express = require('express');
const router = express.Router();
const Company = require('./../models/company');
const app = require('./../server');
const db = require('./../server')


router.get('/Companies', (req, res)=>{
    {
        db.getDataCompany((err, results)=>{
            console.log(results);
          res.send(results.json());
        });
      }
})

router.post('/Companies/add', (req, res)=>{
    let newCompany = new Company({
        _id: req.body._id,
        name: req.body.name,
        rating: req.body.rating,
        image:req.body.image,
        description: req.body.description,
        factor:{
            city: req.body.factor.city,
            region: req.body.factor.region,
            country: req.body.factor.country,
                },
        cities: req.body.cities,
        services: req.body.services
    });
    Company.addCompany(newCompany,(err, company)=>{
        if(err)
            res.json({success: false, msg: 'Can`t add company!'});
        else
            res.json({succes: true, msg: 'Added company'});
            
    })
})

module.exports = router;