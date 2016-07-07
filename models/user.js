'use strict';

const mongoose = require('mongoose');
const jwtSecret = process.env.SECRET || Secret.jwtSecret;
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	twitterId: String,
	twitterToken: String,
	twitterUsername: String,
	twitterDisplayName: String,
	location: String
})

UserSchema.methods.generateJWT = function(){
	let today = new Date();
	let exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		_id: this._id,
		username: this.twitterUsername,
		location: this.location,
		exp: parseInt(exp.getTime() / 1000)
	}, jwtSecret)
};

mongoose.model('User', UserSchema);