var express = require('express');
var cors = require('cors');
var mongo = require('mongodb');
var bodyParser = require('body-parser');

var app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
    );
app.use(bodyParser.json)

var url = "mongodb://127.0.0.1:27017/titans_db";
var connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongo.MongoClient.connect(url, connectionOptions, (err,client) => {
    if(err){
        console.log("cannot connect to mongodb");
        return;
    }

    console.log("connected successfully to mongodb");

    var titansDb = client.db("titans_db");

app.post('/todo/list', (req, res) => {
titansDb
    .collection("todoItems")
    .find()
    .toArray()
    .then(result => {
        res.status(200).send(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send();
    })
})

app.get('/todo/delete', (req, res) => {

    titansDb
    .collection("todoItems").deleteOne(req.body, (err) => {
        if (err) {
            res.status(500).send();
            return;
        }
        res.status(200).send();
    })
    
})

app.post('/todo/create', (req, res) => {
    titansDb.collection("todoItems").insertOne(req.body, (err, result) => {
        if (err) {
            res.status(500).send();
            return;
        }
        res.status(201).send(result);
    })
})

app.post('/todo/edit', (req,res) =>{

});

})

app.listen(port, function() {
    console.log('server started on port' + port);
})


 /*app.get('/todo/filter', (req, res) => {

    var filterObj = {}

    if(req.query.completed!=undefined){
        if (req.query.completed === "true"){
            filterObj.isCompleted = true
        }

        else{
            filterObj.isCompleted = false
        }
    }

    titansDb
    .collection("todoItems")
    .find(filterObj)
    .toArray()
    .then(result => {
        res.status(200).send(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send();
    })
    
})


HTTP Request or HTTP Response

URL ->
http://google.come/todo/list  (query as well can be included here)
HEADERS -> contains meta information, tells about the type of data to be sent, language type, user-agent:CHrome/any browsername,  
BODY -> 


Project Fiddler Web Debugger.
 
*/