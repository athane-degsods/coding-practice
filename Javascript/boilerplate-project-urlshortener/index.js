require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const mongoose = require('mongoose');
const { promisify } = require('util');
const dnsLookupPromise = promisify(dns.lookup);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

// URL Schema
const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true, unique: true },
  short_url: { type: Number, required: true, unique: true }
});

const Url = mongoose.model('Url', urlSchema);

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Add URL validation function before your routes
async function urlValidity(url) {
  try {
    const urlObject = new URL(url);
    const hostname = urlObject.hostname;
    await dnsLookupPromise(hostname);
    return true;
  } catch (error) {
    console.log('URL Validation Error:', error.message);
    return false;
  }
}

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// POST request to /api/shorturl
app.post('/api/shorturl', async (req, res) => {
  const url = req.body.url;
  try {
    // 1. Validate url
    const isValid = await urlValidity(url);
    if (!isValid) {
      return res.json({ error: 'invalid url' });
    }

    // 2. Check if URL exists in DB
    let urlDoc = await Url.findOne({ original_url: url });
    
    // 3. If URL doesn't exist, create new entry
    if (!urlDoc) {
      const count = await Url.countDocuments();
      urlDoc = await Url.create({
        original_url: url,
        short_url: count + 1
      });
    }

    // 4. Return response
    res.json({
      original_url: urlDoc.original_url,
      short_url: urlDoc.short_url
    });

  } catch (error) {
    console.error(error);
    return res.json({ error: 'invalid url' });
  }
});

app.get('/api/shorturl/:shorturl', async (req, res) => {
  const shortUrl = req.params.shorturl;
  try {
    // 1. Find URL by short_url
    const urlDoc = await Url.findOne({ short_url: shortUrl });
    if (!urlDoc) {
      return res.status(404).json({ error: 'No short URL found for the given input' });
    }
    // 2. Redirect to original URL
    res.redirect(urlDoc.original_url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// FUNCTIONS:
// post url request -> check for url validity -> check for url in db -> if not in db, add to db -> return short url and original url
// CODE:
// 1. handle POST request to /api/shorturl
// 2. check for url validity using dns.lookup if no -> error, 1. | if yes -> 3.
// 3. check for url in db using findOne -> if yes -> 5. | if no -> 4.
// 4. add url to db using create -> 5.
// 5. return json with original url and short url