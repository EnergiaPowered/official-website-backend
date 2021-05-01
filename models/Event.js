const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
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
	eventDetails: {
		type: String,
		default: "",
	},
	eventLocation: {
		type: String,
		required: true,
	},
	eventImageID: {
		type: String,
		default: ""
	},
	messages: [{
		type: Schema.Types.ObjectId,
		ref: "Chat"
	}]
});


module.exports = mongoose.model("Event", eventSchema);