const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

const app = express();
const port = process.env.PORT || 5000;

// UPLOAD REQUEST
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

app.post("/api/upload", upload, async (req, res) => {
  const [result] = await client.labelDetection(`./public/uploads/${req.file.filename}`);
  const labels = result.labelAnnotations;
  res.json(labels)
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
