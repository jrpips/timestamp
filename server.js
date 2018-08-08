// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API core
app.get('/api/timestamp',function(req,res){
  let time=new Date();
  let json={"unix":time.getTime(),"utc":time.toUTCString()}
  res.json(json);
})

app.get('/api/timestamp/:date_string',function(req,res){
  let regex=/^[0-9]{1,}$/;
  let timeS=req.params.date_string;
  timeS=timeS.match(regex)?parseInt(timeS):timeS;
  timeS=new Date(timeS);
  
  (timeS!="Invalid Date")?res.json({"unix":timeS.getTime(),"utc":timeS.toUTCString()}):res.json({"unix":null,"error":"Invalid Date"});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});