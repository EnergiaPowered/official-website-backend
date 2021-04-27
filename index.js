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

// listen to specific port
const port = process.env.PORT || 4000;
const server = app.listen(port, err => {
  if (err) return console.log(err);
  console.log(`Listening to port ${port}`)
});

//	Socket setup
const io = socket(server);

let ioInstance = function(){
  return io;
}

// Router MiddleWares
app.use(require("./routes/contactInfo"));
app.use(require("./routes/message"));
app.use(require("./routes/blogs"));
app.use(require("./routes/events")(ioInstance));
app.use(require("./routes/crew"));
app.use(require("./routes/committees"));
app.use(require("./routes/users"));
app.use(require("./routes/login"));
app.use(require("./routes/verify"));
app.use(require("./routes/reset_password"));

io.on('connection', (socket) => {
	console.log('made socket connection', socket.id);

	socket.on('send', (data) => {
		io.sockets.emit('send', data);
	});
});