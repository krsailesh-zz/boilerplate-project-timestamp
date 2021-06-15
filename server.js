// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

app.get('/api', (req,res) => {
  const date_obj = new Date();
  res.json({unix: date_obj.valueOf(), utc: date_obj.toUTCString()});
})

app.get("/api/:date_string", function (req, res) {
  const date_string = req.params.date_string;

  if(date_string.indexOf('-')==-1){
    return res.json({unix: new Date(parseInt(date_string)).valueOf(), utc: new Date(parseInt(date_string)).toUTCString()});
  }

  const date_obj = new Date(date_string);
  if(date_obj.toUTCString() == 'Invalid Date'){
    return res.json({ error : "Invalid Date" });
  }
  res.json({unix: date_obj.valueOf(), utc: date_obj.toUTCString()});
});


const PORT = process.env.PORT || 3000;
// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
