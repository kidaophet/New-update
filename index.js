const express = require('express')
const bodyParser = require('body-parser');
const app = express();




// public for client folder
// app.use('/',express.static(__dirname+ '/client'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// create Function new for express
app.use(require('./configs/config'));
// create router begin by /api
app.use('/api', require('./configs/route'));
// firstpage of web client/index.html
// app.get('/',(req, res)=>res.sendFile(__dirname+'/client/src/index.html'));


// open port 3000 for run server


app.listen(3000, () => console.log('Example app listening on port 3000!'));