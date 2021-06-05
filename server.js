const express = require('express');
const cors = require('cors');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const config = require('./config/db');
const rout = require('./routes/routes')
const Company = require('./models/company');
const City = require('./models/city');
const Region = require('./models/region');
const Service = require('./models/service');
const { ObjectID } = require('bson');
const city = require('./models/city');
var dbClient;

const app = express();

const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


const mongoClient = new MongoClient(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect((err, client)=>{
      
  if(err) return console.log(err);
  else (console.log("succesfully conection to db!"))
  app.locals.collectionCompany = client.db("Companies").collection("Companies");
  app.locals.collectionCities = client.db("Companies").collection("Cities");
  app.locals.collectionRegions = client.db("Companies").collection("Regions");
  app.locals.collectionServices = client.db("Companies").collection("Services");

  app.listen(port, ()=>{
    console.log("Listening " + port);
  })
});

//app.use('/routes', rout);




app.get('/Companies', (req, res)=>{
  {
    app.locals.collectionCompany.find().toArray((err, results)=>{

        res.send(results);
      });
    }
})
app.get("/Cities", (req, res)=>{
  app.locals.collectionCities.find().toArray((err, results)=>{
       res.send(results);
  });
})

app.get("/Services",(req, res)=>{
  app.locals.collectionServices.find().toArray((err, results)=>{
      res.send(results);
  });
})

app.get("/Regions",(req, res)=>{
  app.locals.collectionRegions.find().toArray((err, results)=>{
      res.send(results);
  });
})


app.post('/Companies/add', (req, res)=>{
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
  console.log(newCompany);
  app.locals.collectionCompany.save(newCompany,{},(err,res)=>{
    if(err){
      console.log("ERROR, cant add company");
    }
      else
      {
      console.log("Succesfully added Company");
      }
  })
})

app.post('/Companies/delete', (req, res)=>{
  let companyId = new ObjectID(req.body._id)
  console.log(companyId);
  app.locals.collectionCompany.deleteOne({_id:companyId},{},(err,res)=>{
    if(err){
      console.log("ERROR, cant delete company");
    }
      else
      {
      console.log("Succesfully delete Company");
      }
  })
})

app.post('/Cities/delete', (req, res)=>{
  let cityid = new ObjectID(req.body._id)
  console.log(cityid);
  app.locals.collectionCities.deleteOne({_id:cityid},{},(err,res)=>{
    if(err){
      console.log("ERROR, cant delete city");
    }
      else
      {
      console.log("Succesfully delete city");
      }
  })
})

app.post('/Regions/delete', (req, res)=>{
  let regionId = new ObjectID(req.body._id)
  console.log(regionId);
  app.locals.collectionRegions.deleteOne({_id:regionId},{},(err,res)=>{
    if(err){
      console.log("ERROR, cant delete region");
    }
      else
      {
      console.log("Succesfully delete region");
      }
  })
})
app.post('/Services/delete', (req, res)=>{
  let seriviceid = new ObjectID(req.body._id)
  console.log(seriviceid);
  app.locals.collectionServices.deleteOne({_id:seriviceid},{},(err,res)=>{
    if(err){
      console.log("ERROR, cant delete service");
    }
      else
      {
      console.log("Succesfully delete service");
      }
  })
})
app.post('/Cities/add', (req, res)=>{
  let newCity = new City({
      _id: req.body._id,
      name: req.body.name,
      regionID: req.body.regionID
  });
  console.log(newCity);

  app.locals.collectionCities.save(newCity,{},(err,res)=>{
    if(err){
      console.log("ERROR, cant add City");
    }
      else
      {
      console.log("Succesfully added City");
      }
  })
})

app.post('/Services/add', (req, res)=>{
  let newService = new Service({
      _id: req.body._id,
      name: req.body.name,
      description: req.body.description
  });
  console.log(newService);

  app.locals.collectionServices.save(newService,{},(err,res)=>{
    if(err){
      console.log("ERROR, cant add Service");
    }
      else
      {
      console.log("Succesfully added Service");
      }
  })
})

app.post('/Regions/add', (req, res)=>{
  let newRegion = new Region({
      _id: req.body._id,
      name: req.body.name,
  });
  console.log(newRegion);

  app.locals.collectionRegions.save(newRegion,{},(err,res)=>{
    if(err){
      console.log("ERROR, cant add Region");
    }
      else
      {
      console.log("Succesfully added Region");
      }
  })
})
