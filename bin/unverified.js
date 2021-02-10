const { User, validate } = require('../models/User');
module.exports = function() {
	// get all users who verified = false 
    User.find({ verified: false } , (err, users) => {
        if (err) throw err;

        let currentDate = new Date().getTime();

        users.map(user => {
			// check the user has not verified in 24 hours so delete it from the database
			if(parseInt(currentDate - user.createdAt) >= (24*60*60*1000)){
				User.deleteOne({ _id: user._id }, function(err, obj) {
					if (err) throw err;
				});
			} 
        })
    })
}