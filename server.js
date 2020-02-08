// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("*", function(req, res) {
    res.sendfile(path.join(__dirname, "index.html"))
});

app.get("/notes", function(req, res) {
    res.sendfile(path.join(__dirname, "notes.html"))
});

app.get("/api/notes", function(req, res) {
    res.sendfile(path.join("db/", "db.json"))
});

app.post("/api/notes", function(req, res) {
    res.sendfile(path.join(__dirname, ""))
});

app.get("/api/notes/:id", function(req, res) {
    res.sendfile(path.join(__dirname, "resi.html"))
});

let reservations = [];

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
