const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	EventId: {
		type: Schema.Types.ObjectId,
		ref: "Event"
	}
});
module.exports = mongoose.model("Chat", chatSchema);