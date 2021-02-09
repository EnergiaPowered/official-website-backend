const { User } = require('../models/User');

module.exports = function() {
    User.find({ verified: false } , (err, users) => {
        if (err) throw err;

        let currentDate = new Date().getTime();

        users.map(user => {
			if(parseInt(currentDate - user.addTimeStamp) >= (24*60*60*1000)){
				User.deleteOne({ _id: user._id }, function(err, obj) {
					if (err) throw err;
				});
			} 
        })
    })
}