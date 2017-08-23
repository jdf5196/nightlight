const mongoose = require('mongoose');

const BarSchema = new mongoose.Schema({
	name: String,
	phone: String,
	rating: Number,
	image: String,
	Attending: [String],
	url: String,
	snippet: String
});

mongoose.model('Bar', BarSchema);
