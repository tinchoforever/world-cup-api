
var fs = require("fs");
var matches = JSON.parse(fs.readFileSync("./datasets/world-cup.json", "utf8"));

exports.matches = matches;

