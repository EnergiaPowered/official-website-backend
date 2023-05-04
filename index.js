const express = require("express");
const path = require("path");
const cors = require("cors");
const socket = require("socket.io");
const morgan = require("morgan");
const app = express();

// hours that the check the unverified users
let hours = 6;
setInterval(require("./methods/unverified"), 1000 * 60 * 60 * hours);

require("dotenv").config();

// connect to DB
const db = require("./mongo");
db();

// parse the body of the request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", express.static(__dirname + "/doc"));
app.use(express.static(path.join(__dirname, "client/build")));

//enable cors
app.use(cors());

// disable the X-Powered-By header instead of using helmet
app.disable("x-powered-by");

// Morgen middleware for logging the requests
app.use(morgan(":method :url :status "));

// Router MiddleWares
app.use("/api", require("./routes/contactInfo"));
app.use("/api", require("./routes/message"));
app.use("/api", require("./routes/blogs"));
app.use("/api", require("./routes/blogsComments"));
app.use("/api", require("./routes/events"));
app.use("/api", require("./routes/chat").router);
app.use("/api", require("./routes/crew"));
app.use("/api", require("./routes/committees"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/login"));
app.use("/api", require("./routes/verify"));
app.use("/api", require("./routes/reset_password"));
app.use("/api", require("./routes/form"));
app.use("/api", require("./routes/form_res"));
app.use("/api", require("./routes/send_emails"));
app.use("/api", require("./routes/sponsors"));
app.use("/api", require("./routes/login_admin"));
app.use("/api", require("./routes/participantsCertificates"));


if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

// listen to specific port
const port = process.env.PORT || 4000;

let Server = app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`Listening to port ${port}`);
  console.log(`Frontend Host: ${process.env.FRONT_HOST}`);
});

let IO = socket(Server, {
  cors: {
    origins: [process.env.FRONT_HOST],
    methods: ["GET", "POST"],
    allowedHeaders: ["x-auth-token"],
  },
});

const { io } = require("./routes/chat");
io(IO);
