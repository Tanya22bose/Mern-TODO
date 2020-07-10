const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var cors = require('cors');
const app = express();

//usages
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    next();
    
});

app.use('/api/todo', require('./routes/index'));

mongoose.connect('mongodb://127.0.0.1:27017/tododb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => {
    console.log('server has started');
    app.listen(5000);

})

.catch(err => {
    console.log(err);
})


