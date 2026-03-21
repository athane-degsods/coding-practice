const dns = require('dns');
const { promisify } = require('util');
const { find, findOne } = require('./database');
const dnsLookupPromise = promisify(dns.lookup);
const mongoose = require('mongoose');
const { url } = require('inspector');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 


const urlSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    shortUrl: { type: Number, required: true, unique: true }
});

let Url = mongoose.model('Url', urlSchema);

async function urlValidity(url) {
    try {
        const hostname = new URL(url).hostname;
        await dnsLookupPromise(hostname);
        return true;
    } catch (error) {
        console.log('Error: ', error);
        return false;
    }
}

async function checkUrlInDb(url) {
    console.log('checkUrlInDb')
    Url.findOne({ url: url }, (err, data) => {
        if (err) {
            console.log('Error: ', err);
            return false;
        }
        if (data) {
            console.log('Url already exists in DB: ', data);
            return true;
        } else {
            console.log('Url not found in DB');
            return false;
        }
    });
}

function addUrlToDb(url) {
    console.log('addUrlToDb')
    return
}

module.exports = {
    urlValidity,
    checkUrlInDb,
    addUrlToDb
};