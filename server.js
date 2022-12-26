const express = require('express')
const app = express()

const dbinfor = require('./dbinfor')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/sports', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
  if(err) {
      console.log(err);
  } 
  else {
     console.log('MongoDB Connected Successfully');
  }
   })

const GameModel = mongoose.model('games', {name:String, country:String, player:String})

app.post('/addgame', (req,res) => {
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
    
    GameModel.findOneAndDelete({
        _id:req.body._id
    }, function(err){  
        
        if(err){
            res.send(`Document ${req.body._id} Not Deleted ${err}`)
            
        }
        else{
            res.send(`Document- ${req.body._id} Deleted successfully`)
        }
    })
})
app.post('/getgame', (req, res) => {
    GameModel.find({}, function(err, documents){
        if(err){
            res.send(`Something went wrong:${err}`)
        }
        else {
            res.send(documents);
        }
    })
    
})
app.post('/updategame', (req, res) => {
    GameModel.findOneAndUpdate({_id:req.body._id}, {
        player:req.body.player
    },
    (err)=>{
        if(err){
            res.send(`Updating Document: ${req.body._id} Failed with Error:${err}`)
        }
        else{
            res.send(`Document: ${req.body._id} Updated Successfully`)
        }
    })
})

app.listen(dbinfor.port, () => console.log(`Server running on Port: ${dbinfor.port}`))

