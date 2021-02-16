const { User, validate }  = require('../models/User');

module.exports = function () {
	//	Get The Date Before 24 Hours
	let yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	yesterday.toISOString();

	// Get & Delete all users whose verified = false && Created Before 24 Hours
	User.deleteMany({ verified: false, createdAt: { $lt: yesterday } }, err => {
		if (err) return console.error(err);
	});
}

