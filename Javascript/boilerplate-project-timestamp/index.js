// index.js
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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint to get the current timestamp
app.get("/api", function (req, res) {
  const date = new Date(); // Get the current date and time
  res.json({ unix: date.getTime(), utc: date.toUTCString() }); // Return the timestamp in JSON format
});

// API endpoint to get the timestamp from a specific date string
app.get("/api/:date_string", function (req, res) {
  const dateString = req.params.date_string;
  let date;
  
  if (!isNaN(dateString)) {
    // If the date string is a number, treat it as a Unix timestamp
    date = new Date(parseInt(dateString, 10));
  }
  else {
    // Otherwise, treat it as a date string
    date = new Date(dateString);
  }
  let unix = date.getTime(); // Get the Unix timestamp
  if (isNaN(unix)) {
    // If the date is invalid, return an error message
    return res.json({ error: "Invalid Date" });
  }
  let utc = date.toUTCString(); // Get the UTC string
  res.json({ unix: unix, utc: utc }); // Return the timestamp in JSON format
});


// Listen on port set in environment variable or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}....`)
})
