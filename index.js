const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const app = express();

// hours that the check the unverified users
let hours = 6;
setInterval(require('./methods/unverified'), 1000 * 60 * 60 * hours);

require("dotenv").config();

// connect to DB
const db = require("./mongo");
db();

// parse the body of the request
app.use(express.urlencoded({ extended: true }));
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
app.use(require("./routes/chat").router);
app.use(require("./routes/crew"));
app.use(require("./routes/committees"));
app.use(require("./routes/users"));
app.use(require("./routes/login"));
app.use(require("./routes/verify"));
app.use(require("./routes/reset_password"));

// listen to specific port
const port = process.env.PORT || 4000;
let Server = app.listen(port, err => {
  if (err) return console.log(err);
  console.log(`Listening to port ${port}`);
  console.log(process.env.FRONT_HOST);
});

let IO = socket(Server, {
  cors: {
    origin: 'https://www.energia-powered.com',
    methods: ["GET", "POST"],
    allowedHeaders: ["x-auth-token"]
  }
});

const { io } = require('./routes/chat');
io(IO);
