// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const nodemon = require("nodemon");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/"))

//Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"))
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.resolve("./db/db.json"))
});

app.post("/api/notes", function(req, res) {
    res.sendFile(path.resolve("./db/db.json"))
    // console.log(req.body)
    writeNote(req.body);
});

app.get("/api/notes/:id", function(req, res) {
    res.sendFile(path.join(__dirname, ""))
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
function writeNote(note){
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let dbArray = JSON.parse(data);
        // console.log(typeof data);
        dbArray.push(note);
        console.log(dbArray);
        fs.writeFile('./db/db.json', JSON.stringify(dbArray), (err, data) => {
            if (err) throw err;
        })
    });
}

// get all buttons working, for new note, save, delete, etc
// find a way to assign a unique id to each note in order to search for and delete
// get api/notes displays all notes
// post api/notes when new note is saved, it should be returned to the client somehow