const express = require('express');
const path = require('path');
const dbUtils = require('./db/dbUtils');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
    // Get all notes
    dbUtils.getAllNotes((data) => {
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    // Add a new note
    dbUtils.addNote(req.body, (newNote) => {
        res.json(newNote);
    });
});


app.delete('/api/notes/:id', (req, res) => {
    // Delete a note
    dbUtils.deleteNote(req.params.id, (notes) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else {
        res.json(notes);
      }
    });
  });

app.listen(PORT, () =>
    console.log(`Server listening at Port ${PORT}.`)
);