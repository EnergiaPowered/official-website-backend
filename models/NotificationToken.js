const { Schema, model } = require("mongoose");

const notificationTokenSchema = Schema({
  token: {
    type: String,
    require: true,
  },
});

module.exports = model("NotificationToken", notificationTokenSchema);
