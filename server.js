// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const nodemon = require("nodemon");
const fs = require("fs");
const db = require("./db/db.json");
let idNumber;

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.resolve("./db/db.json"))
});

app.post("/api/notes", function(req, res) {
    res.sendFile(path.resolve("./db/db.json"));
    writeNote(req.body);
});

app.delete("/api/notes/:id", function(req, res) {
    idNumber = parseInt(req.params.id);
    deleteNote(idNumber);
    res.sendFile(path.resolve("./db/db.json"));
});

app.get("*", function(req, res) {
    console.log(db);
    res.json(db);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

function writeNote(note){
    let newNote = note;
    let noteId = 1;
    if (note.length > 0) {
        noteId = note.pop().id;
    }
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let dbArray = JSON.parse(data);
        newNote.id = dbArray.length + 1;
        dbArray.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(dbArray), (err, data) => {
            if (err) throw err;
            return JSON.stringify(dbArray);
        })
    });
}

function deleteNote(id){
    fs.readFile('./db/db.json', 'utf-8', (err, json) => {
        const newNote = JSON.parse(json);
        console.log(newNote)
        for (let i = 0; i < newNote.length; i++) {
            if (newNote[i].id === idNumber) {
                newNote.splice(i, 1);
                console.log(newNote);
            }
        }
        fs.writeFile('./db/db.json', JSON.stringify(newNote), (err) => {
            if (err) {
                throw err;
            }
            return JSON.stringify(newNote);
        })
    })
}