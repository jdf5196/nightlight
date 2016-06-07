'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;

app.set('port', port);

app.use(express.static(process.cwd() + '/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(app.get('port'), function(){
	console.log('Server listening on port ' + port);
});