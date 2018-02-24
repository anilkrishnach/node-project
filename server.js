const express = require('express');
const hbs=require('hbs');
const fs=require('fs');
const port = process.env.PORT||3000;
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('upper',(test)=>{
  return test.toUpperCase();
});

app.use((req,res,next)=>{
  var log = req.url;
  fs.appendFile('server.log',log+'\n', (err)=>{
    if(err)
      console.log("Error");
  });
  next();
  // res.render('maintanence.hbs');
});

app.set('view engine','hbs');
app.use(express.static(__dirname+'/Server_Files'));
app.get('/',(req,res) => {
  res.render('homepage.hbs');
});
app.get('/resume',(req,res)=>{
  res.render('resume.hbs',{
    name: "Anil",
    class: "CSE-2",
    skills: [
      'C','C++','Java','HTML','CSS','Javascript','Node.js'
    ],
  });
});
app.listen(port, ()=>{
console.log("Server is up at "+port);});
