'use strict';

const Secret = require('./secret');
const Yelp = require('yelp');

let Search = new Yelp({
		"consumer_key": process.env.consumer_key || Secret.consumer_key,
    	"consumer_secret": process.env.consumer_secret || Secret.consumer_secret,
    	"token": process.env.token || Secret.token,
    	"token_secret": process.env.token_secret || Secret.token_secret
});


module.exports = Search;