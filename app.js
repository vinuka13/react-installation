require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path")

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb+srv://installtion:vinuka123@cluster0.bwdqpfi.mongodb.net/?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true});

const regSchema = new mongoose.Schema({
    name: String,
    email: String,
    club: String,
    designation: String,
    number: Number
})

const Post = mongoose.model('Post', regSchema)

app.post('/home', function(req, res){
    var name = req.body.Name;
    var email = req.body.Email;
    var club = req.body.Club;
    var designation = req.body.Designation;
    var number = req.body.Number; 

    console.log(name, email, club)
    const newReg = new Post({
        name: name,
        email: email,
        club: club,
        designation: designation,
        number: number
    })

    newReg.save(function(err){
        if(err){
            console.log(err);
        } else {
            console.log('success');
        }
    })
})


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
      });
}

app.listen(process.env.PORT || 5000, function(){
    console.log('backend server is running')
})