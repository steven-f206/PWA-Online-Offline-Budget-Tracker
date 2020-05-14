const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");

// Database Connection Request
require('dotenv/config');
const connectDB = require("./config/connectDB.js");

//Bring in models
const db = require("./models");
const app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Host Static Files so css and js files can be retrieved

app.use(express.static(path.join(_dirname, '/public')));
// Set the port of our application, process.env.PORT lets the port be set by Heroku
let PORT = process.env.PORT || 9090;


/******************************* Routes  ****************************/

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/******************************* MiddleWare  ****************************/


//GET REQUESTS

app.get("/api/transaction", (req, res) => {
  db.Transaction.find({})
    .then(dbData => {
      res.json(dbData);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/transaction", (req, res) => {
  let data = req.body;
  console.log(data);

  db.Transaction.create({
    date: data.date,
    name: data.name,
    value: data.value
  }).then(dbUpdate => {
    res.json(dbUpdate);
  })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/transaction/bulk", (req, res) => {
  let data = req.body;
  console.log(data);

  db.Transaction.create({
    date: data.date,
    name: data.name,
    value: data.value
  }).then(dbUpdate => {
    res.json(dbUpdate);
  })
    .catch(err => {
      res.json(err);
    });
});


/******************************* Connect to db  ****************************/
connectDB()

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});