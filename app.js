const express = require("express");
// const res = require("express/lib/response");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose'); // importing mongoose package
mongoose.connect('mongodb://localhost/irfanEcom',{useNewUrlParser : true});//connectiong nodejs with the database

var db = mongoose.connection; 
db.on('error',console.error.bind(console,'connection error:'));
const path = require("path");
const port = 80;
//EXPRESS RELATED CONFIGURATION

const ecomSchema = new mongoose.Schema({
  name : String,
  email : String,
  number : String,
  address : String,
  message : String
})

const Contact = mongoose.model('ecomCOntact', ecomSchema);


app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG RELATED CONFIGURATION
app.set('view engine','pug'); //setting the template engine as pug
app.set('views', path.join(__dirname,'views'));//set the views directory



//ENDPOINTS
app.get('/', (req, res) => {
    res.render('index', { title: 'Grocery Store', message: 'Hello there!' })
  })

// directing post request to a txt file

// app.post('/',(req,res)=>{
//   sname = req.body.name;
//   address = req.body.address;
//   email = req.body.email;
//   message = req.body.message;
//   let outputTOfile = `The name of the client is ${sname}, with email as ${email}, residing in ${address} with a message ${message}`;
//   fs.writeFileSync('output.txt',outputTOfile);
//   console.log(req.body);
//   const params = {'message' : 'Your form has been submitted successfully'};
//   res.status(200).render('index.pug',params);
// })

// directing post request to mongo database using mongoose

app.post('/',(req,res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("This item has been saved to the database")
  }).catch(()=>{
    res.status(400).send("Item was not saved to the database")
  });
})

//Shop page
console.log("Hello World");
//START THE SERVER
app.listen(port,()=>{
  
    console.log(`The application started successful on port ${port}`);
});