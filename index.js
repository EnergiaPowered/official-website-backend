const express = require("express");
const cors = require("cors");
const app = express();
const config = require('./config/custom-environment-variables.json');

// hours that the check the unverified users
let hours = 6 ;
setInterval(require('./bin/unverified'), 1000 * 60 * 60 * hours);

require("dotenv").config();

// connect to DB
const db = require("./mongo");
db();

if (!config['jwtPrivateKey']) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}
if (!config['Email'] || !config['Password'] || !config['Cipher-Password'] ) {
  console.log('FATAL ERROR: Email or Password or Cipher-Password is not defined.');
  process.exit(1);
}



// parse the body of the request
app.use(express.json());

//enable cors
app.use(cors());

// disable the X-Powered-By header instead of using helmet
app.disable("x-powered-by");

// Router MiddleWares
app.use(require("./routes/contactInfo"));
app.use(require("./routes/message"));
app.use(require("./routes/blogs"));
app.use(require("./routes/events"));
app.use(require("./routes/crew"));
app.use(require("./routes/committees"));
app.use(require("./routes/users"));
app.use(require("./routes/login"));
app.use(require("./routes/Verify"));

// listen to specific port
const port = process.env.PORT || 4000;
app.listen(port, err => {
  if (err) return console.log(err);
  console.log(`Listening to port ${port}`)
});
