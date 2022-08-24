      const express = require('express');
      const app = express();
      const mongoose = require('mongoose');
      const bodyParser = require('body-parser');
      const Schema = mongoose.Schema;

      app.use(bodyParser.urlencoded({extended:true}));

      //connect to mongodb
      const dbURI = 'mongodb+srv://maramoja:maramoja@cluster0.rsn0bbk.mongodb.net/website?retryWrites=true&w=majority'
      mongoose.connect(dbURI)
        .then((result)=>{
          app.listen(2000)
          console.log('connected to db')
          console.log('listening at 2000')
        })
        .catch((err)=>{console.log(err)})

      //testing express
      app.get('/data', (req,res)=>{
        res.sendFile(__dirname + '/index.html')
      });

      //create a data Schema
      const noteSchema = new Schema ({
        title: String,
        content: String,
        genre: String,
        pages: Number
      });


      const Note = mongoose.model('note', noteSchema)

      app.post('/data', (req,res)=>{
        let newNote = new Note({
          title: req.body.title,
          content: req.body.content,
          genre: req.body.genre,
          page: req.body.page
        })
        newNote.save()
          .then((result)=>{
            console.log('data entered')
          })
          .catch((err)=>{
            console.log(err)
          })
        res.redirect('/data');

      });


      // app.listen(2000, ()=>{
      //   console.log('server up and running on port 2000!')
      // });
