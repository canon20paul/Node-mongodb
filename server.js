const express = require('express')
const app = express()

const dbinfor = require('./dbinfor')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost:27017/sports', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
  if(err) {
      console.log(err);
  } 
  else {
     console.log('MongoDB Connected Successfully');
  }
   })

const GameModel = mongoose.model('games',{name:String, country:String, player:String})

app.post('/addgame',(req,res)=>{
     var name=req.body.name
    var country = req.body.country
    var player = req.body.player
    var newgame=new GameModel({name:name, country:country, player:player})
    newgame.save(function(error){
       if(error){
            res.send(error)
        } else {
                  res.send('Game Added Successfully to Database')
        }
    })
})
app.post('/deletegame', (req, res) => {
    res.send('This is the Home Page')
})
app.post('/getgame', (req, res) => {
    res.send('This is the Get Page')
})
app.post('/updategame', (req, res) => {
    res.send('This is the Home Page')
})

app.listen(dbinfor.port, () => console.log(`Server running on Port: ${dbinfor.port}`))

