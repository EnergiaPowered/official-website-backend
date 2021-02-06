const express = require("express");
const cors = require("cors");
const app = express();
const config = require('./config/custom-environment-variables.json');

require("dotenv").config();

// connect to DB
const db = require("./mongo");
db();

if (!config['jwtPrivateKey']) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined.');
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

// listen to specific port
const port = process.env.PORT || 4000;
app.listen(port, err => {
  if (err) return console.log(err);
  console.log(`Listening to port ${port}`)
});
