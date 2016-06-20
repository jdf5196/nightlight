'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('express-jwt')
const Secret = require('./secret.js');
const db = process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nightlite';
mongoose.connect(db);
require('../models/bar.js');
require('../models/user.js');
require('./twitter.js');
const Search = require('./search.js');
const Bar = mongoose.model('Bar');
const User = mongoose.model('User');
const jwtSecret = process.env.SECRET || Secret.jwtSecret;
const Auth = jwt({secret: jwtSecret, userProperty: 'payload'});

const setTokenCookie = (req, res)=> {
	let token = req.user.generateJWT();
	res.cookie('token', JSON.stringify(token))
	res.redirect('/');
}

const app = express();

const port = process.env.PORT || 5000;

app.set('port', port);

app.use(express.static(process.cwd() + '/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(require('express-session')({ secret: jwtSecret, resave: true, saveUninitialized: true }));


app.post('/getbars', (req, res)=>{
	let location = req.body.location;
	let user = req.body.user;
	if(user != ''){
		User.findOne({_id: user}, (err, user)=>{
			if(err){return err}
			else{
				user.location = location;
				user.save((err)=>{
					if(err){return err}
					else{
						let token = user.generateJWT();
						res.cookie('token', JSON.stringify(token));
						return user
					}
				})
			}
		})
	}
	Search.search({term: 'bars', location: location}, (error, data)=>{
		if(error){
			return error
		}
		let barData = [], queryName = [], queryPhone = []
		for(const i in data.businesses){
			let bar = {
				name: data.businesses[i].name,
				phone: data.businesses[i].phone,
				rating: data.businesses[i].rating,
				image: data.businesses[i].image_url,
				Attending: [],
				url: data.businesses[i].url,
				snippet: data.businesses[i].snippet_text
			};
			barData.push(bar)
			queryName.push(data.businesses[i].name);
			queryPhone.push(data.businesses[i].phone);
		}
		Bar.find({phone: {$in: queryPhone}, name: {$in: queryName}}, (err, aBars)=>{
			for(const i in aBars){
				for(const j in barData){
					if(aBars[i].name == barData[j].name && aBars[i].phone == barData[j].phone){
						barData[j].Attending = aBars[i].Attending
					}
				}
			}
			res.json(barData)
		});
	})
});

app.post('/initial', (req, res)=>{
	let location = req.body.location;
	let user = req.body.user;
	let barData = [];
	if(user == undefined){
		return
	}else{
		User.findOne({_id: user}, (err, user)=>{
			if(err){
				return err
			}else{
				user.location = location;
				user.save((err)=>{
					if(err){
						return err
					}else{
						let token = user.generateJWT();
						res.cookie('token', JSON.stringify(token));
						return user
					}
				})
			}
		});
	}
	Search.search({term: 'bars', location: location}, (error, data)=>{
		if(error){
			return error
		}
		let barData = [], queryName = [], queryPhone = []
		for(const i in data.businesses){
			let bar = {
				name: data.businesses[i].name,
				phone: data.businesses[i].phone,
				rating: data.businesses[i].rating,
				image: data.businesses[i].image_url,
				Attending: [],
				url: data.businesses[i].url,
				snippet: data.businesses[i].snippet_text
			};
			barData.push(bar)
			queryName.push(data.businesses[i].name);
			queryPhone.push(data.businesses[i].phone);
		}
		Bar.find({phone: {$in: queryPhone}, name: {$in: queryName}}, (err, aBars)=>{
			for(const i in aBars){
				for(const j in barData){
					if(aBars[i].name == barData[j].name && aBars[i].phone == barData[j].phone){
						barData[j].Attending = aBars[i].Attending
					}
				}
			}
			res.json(barData)
		});
	})
})

app.post('/going', (req, res)=>{
	let bar = req.body.bar;
	let user = req.body.user;
	if(!user){
		return res.status(400).json({message: 'you must log in to do that!'})
	}
	Bar.findOne({name: bar.name, phone: bar.phone}, (err, aBar)=>{
		if(aBar){
			if(aBar.Attending.indexOf(user) > -1){
				aBar.Attending.splice(aBar.Attending.indexOf(user), 1)
			}else{
				aBar.Attending.push(user);
			}
			aBar.save((err)=>{
				if(err){return err}
				res.json({bar: aBar})
			})
		}else{
			let newBar = new Bar();
			newBar.name = bar.name;
			newBar.phone = bar.phone;
			newBar.rating = bar.rating;
			newBar.image = bar.image;
			newBar.Attending = [user];
			newBar.url = bar.url;
			newBar.snippet = bar.snippet;
			newBar.save((err)=>{
				if(err)return err;
				res.json({bar: newBar})
			})
		}
	})
})

app.get('/login/twitter', passport.authenticate('twitter'));

app.get('/login/twitter/return', passport.authenticate('twitter', {
	failureRedirect: '/',
	session: false
}), setTokenCookie);

app.listen(app.get('port'), function(){
	console.log('Server listening on port ' + port);
});