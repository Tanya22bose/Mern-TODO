var express = require('express');
var cors = require('cors');

var app = express();
var username = '';

app.post('/authorize', (req, res) => {
    username = req.query.username;
})

app.get('/search', (req, res) => {
    var username = req.headers["User-Identifier"];
    res.set('Content-Type','text/html');
    res.status(200).send('<p>Data for client</p>');
})

function validateUser(username) {
//mongo
}


app.listen(8081);
