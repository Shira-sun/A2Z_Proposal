const fs = require("fs");
const ndjson = require("ndjson");
const express = require("express");
const app = express();
const port = 3000;

let drawings = [];

let RiTa = require("rita");

let counter = 0;

//divide to sentences
var data = fs.readFileSync("Anna.txt", "utf8");
let sentences = RiTa.sentences(data.toString());

let annaSentences = [];
// regular exp to find sen with Anna

sentences.forEach((sentence) => {
  const regex = /garden/g;
  const found = sentence.match(regex);

  if (found) {
    annaSentences.push(sentence);
    //console.log("Pushed");
  }
});

console.log(annaSentences.length);

fs.createReadStream("simplified_garden.ndjson")
  .pipe(ndjson.parse())
  .on("data", function (obj) {
    // obj is a javascript object
    drawings.push(obj);
  });

app.get("/garden", (req, res) => {
  const index = Math.floor(Math.random() * drawings.length);
  const sIndex = Math.floor(Math.random() * annaSentences.length);
  let data = {
    image: drawings[index],
    sentence: annaSentences[sIndex],
  };
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.static("public"));
