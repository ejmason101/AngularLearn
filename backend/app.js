const path = require("path");
// holds the express app
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();

// mongodb and openshift health check stuff and whatnot
app.get("/pagecount", function(req, res) {
    res.sendStatus(200);
});

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";


if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
        mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
        mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
        mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
        mongoPassword = process.env[mongoServiceName + '_PASSWORD']
        mongoUser = process.env[mongoServiceName + '_USER'];
  
    if (mongoHost && mongoPort && mongoDatabase) {
      mongoURLLabel = mongoURL = 'mongodb://';
      if (mongoUser && mongoPassword) {
        mongoURL += mongoUser + ':' + mongoPassword + '@';
      }
      // Provide UI label that excludes user id and pw
      mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
      mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
  
    }
  }

if(mongoURL){
    console.log('mongoURL from openshift is: ' + mongoURL);
} else {
    console.log('mongoURL was empty, setting to local development')
    mongoURL = 'mongodb://localhost:27017/fjrls'
}

mongoose.connect(mongoURL, {useNewUrlParser : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("connected to localhost MongoDB Instance");
});
  


// local testing, above statements for prod env
// mongoose.connect("mongodb://localhost:27017/ngLearn", { useNewUrlParser: true })
//     .then(() => {
//         console.log('Connected to database!');

//     })
//     .catch(() => {
//         console.log('Mongodb Connection Failed!');
//         return;
//     });

// parsing requests
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// Static folders
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
         "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS");

    next();
});

const todosRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");
const newsRoutes = require("./routes/news");



app.use("/api/todos", todosRoutes);
app.use("/api/user", userRoutes);
app.use("/api/news", newsRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;