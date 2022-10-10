require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path")
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb+srv://installtion:vinuka123@cluster0.bwdqpfi.mongodb.net/?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true});

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
      user: 'installationraciit.2022@gmail.com',
      pass: 'wikqxgnyeauksrpd'
    }
  });

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

    var mailOptions={
        to: email,
        subject: 'Invitation - Installation Ceremony of the Rotaract Club of Informatics Institute of Technology',
        text: `Dear sir/madam,
        Greetings from the Rotaract Club of Informatics Institute of Technology!

        It is with great pleasure that I, on behalf of the Rotaract Club of Informatics Institute of Technology, invite you to grace the Installation Ceremony of President Rtr. Yasiru Jayasthissa and his Board of Directors for the year 2022 – 23.
        
        The details of the event are as follows:
        
        Date : 23rd September 2022
        Time : 6.30 pm onwards (registrations opening at 6.00 pm)
        Venue : Disaster Management Center Auditorium
        Venue Link: https://goo.gl/maps/da66jGmXht2xzgKG8
        Dress Code: Lounge/ Formal`        
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
})


// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('frontend/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//       });
// }

app.listen(process.env.PORT || 5000, function(){
    console.log('backend server is running')
})