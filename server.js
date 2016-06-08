'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Search = require('./search.js');

const app = express();

const port = process.env.PORT || 5000;

app.set('port', port);

app.use(express.static(process.cwd() + '/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/getbars', (req, res)=>{
	let location = req.body.location;
	Search.search({term: 'bars', location: location}, (error, data)=>{
		if(error){
			return error
		}
		res.json(data)
	})
})

app.listen(app.get('port'), function(){
	console.log('Server listening on port ' + port);
});