const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const fetch = require('node-fetch');
const fs = require('fs');


const app = express();
const port = process.env.PORT || 5000;

const IMAGE_RECOGNITION_URL = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB5WVcfCzsxhCRfh34jTiubDyEOnP5pXYc"
const db = new sqlite3.Database(':memory:');

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("myImage");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/upload", upload, (req, res) => {
    fetch(IMAGE_RECOGNITION_URL, { 
      method: 'post', 
      body: JSON.stringify(new Buffer(fs.readFileSync(req.file.path))),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      console.log(res)
    }).catch(e => console.error(e));
});

if (process.env.NODE_ENV === "production") {
  console.log("running in production");
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
