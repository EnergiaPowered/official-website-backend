const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
		required: true,
		enum: ['Closed', 'Soon', 'Opened'],
	},
	category: {
		type: String,
		required: true,
		enum: ['Session', 'OnDayEvent', 'Marathon', 'Competition'],
	},
	eventDescription: {
		type: String,
		required: true,
	},
	eventLocation: {
		type: String,
		required: true,
	},
	eventOrganizer: {
		type: String,
		required: true,
	},
	eventImageID: {
		type: String,
		default: ""
	},
});

module.exports = mongoose.model("Event", eventSchema);