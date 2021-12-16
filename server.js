const fs = require("fs");
const ndjson = require("ndjson");
const express = require("express");
const app = express();
const port = 3000;

let gardenDrawings = [];
let wineDrawings = [];
let clockDrawings = [];

let RiTa = require("rita");

let counter = 0;

//divide to sentences
var data = fs.readFileSync("Anna.txt", "utf8");
let sentences = RiTa.sentences(data.toString());

let gardenSentences = [];
let wineSentences = [];
let clockSentences = [];
//comment
// regular exp to find sen with Anna

sentences.forEach((sentence) => {
  const regex = /garden/g;
  const found = sentence.match(regex);

  if (found) {
    gardenSentences.push(sentence);
    //console.log("Pushed");
  }
});

sentences.forEach((sentence) => {
  const regex = /wine/g;
  const found = sentence.match(regex);

  if (found) {
    wineSentences.push(sentence);
    //console.log("Pushed");
  }
});

sentences.forEach((sentence) => {
  const regex = /time/g;
  const found = sentence.match(regex);

  if (found) {
    clockSentences.push(sentence);
    console.log("Pushed");
  }
});

console.log(clockSentences);

fs.createReadStream("simplified_wine glass.ndjson")
  .pipe(ndjson.parse())
  .on("data", function (obj) {
    // obj is a javascript object
    wineDrawings.push(obj);
  });

fs.createReadStream("simplified_garden.ndjson")
  .pipe(ndjson.parse())
  .on("data", function (obj) {
    // obj is a javascript object
    gardenDrawings.push(obj);
  });

fs.createReadStream("simplified_clock.ndjson")
  .pipe(ndjson.parse())
  .on("data", function (obj) {
    // obj is a javascript object
    clockDrawings.push(obj);
  });

app.get("/clock", (req, res) => {
  const index = Math.floor(Math.random() * clockDrawings.length);
  const sIndex = Math.floor(Math.random() * clockSentences.length);
  let data = {
    image: clockDrawings[index],
    sentence: clockSentences[sIndex],
  };
  res.send(data);
});

app.get("/wine", (req, res) => {
  const index = Math.floor(Math.random() * wineDrawings.length);
  const sIndex = Math.floor(Math.random() * wineSentences.length);
  let data = {
    image: wineDrawings[index],
    sentence: wineSentences[sIndex],
  };
  res.send(data);
});

app.get("/garden", (req, res) => {
  const index = Math.floor(Math.random() * gardenDrawings.length);
  const sIndex = Math.floor(Math.random() * gardenSentences.length);
  let data = {
    image: gardenDrawings[index],
    sentence: gardenSentences[sIndex],
  };
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.static("public"));
