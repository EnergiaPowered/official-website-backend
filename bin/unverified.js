const { User } = require('../models/User');

module.exports =  function(){ 
	User.find({ verified: false }).toArray(function(err, user) {
		if (err) throw err;

		let currentDate = new Date().getTime();
		if(parseInt(currentDate - user.createdAt) >= (24*60*60*1000)){
			User.deleteOne({ _id: user._id }, function(err, obj) {
				if (err) throw err;
			});
		}
	});
}