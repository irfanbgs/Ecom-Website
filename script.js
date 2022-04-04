const express = require("express");
const app = express();
const path = require("path");
const port = 80;

app.use('/static',express.static('static'));

//setting the template engine as pug
app.set('view engine','pug');

//set the views directory
app.set('views', path.join(__dirname,'views'));

//our pug demo dendpoint
app.get('/demo', (req, res) => {
    res.status(200).render('demo', { title: 'Hey Irfan', message: 'Hello there! Thanks for being with me' })
  })

app.get("/",(req,res)=>{
    res.send("This is the homepage");
});

app.listen(port,()=>{
    console.log(`The application started successful on port ${port}`);
});