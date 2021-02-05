const express = require('express');
const bodyParser = require("body-parser");
const { reset } = require('nodemon');
var request=require("request");
const app = express();
const port = 5000;

let note=[];

let jsonParser = bodyParser.json();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/newEndpoint', (req, res) => {
    request(
        "http://api.openweathermap.org/data/2.5/weather?q=Adelaide&appid=a61f34570224bac4cfed46ceb2cc9613&units=metric",
    function(error,response,body){
        if(!error && response.statusCode==200){
            let parsedBody= JSON.parse(body);
            var temp_c=parsedBody["main"]["temp"];
       res.send({temp_c});
        }
          }
          );
        });

    app.post('/addNote',jsonParser, (req, res) => {
        // let parsedBody= JSON.parse(req.body);
        console.log(req.body);
            let newNote = new Object();
            newNote.title = req.body.title;
            newNote.content = req.body.content;
            note.push(newNote);
            res.send(note);
             });
                app.get('/getNote', (req, res) => {
                   res.send(note);
                            });
            
                            app.delete('/deleteNote',jsonParser,(req,res)=>{
                                console.log(req.body);
                                let deleteNote = new Object();
                                deleteNote.title=req.body.title;
                                deleteNote.content=req.body.content;
                                note.pop(deleteNote);
                                res.send(note);
                            })


      


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})