const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => console.log("****connected to MongoDB****"))
    .catch(err => console.log("failed to connect to mongoDB", err));
}

module.exports = connectToDB;
