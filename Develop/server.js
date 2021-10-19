const express = require('express');
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, () =>
    console.log(`Serving static asset routes on port ${PORT}!`)
);
// TODO: pull info from public folder
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

// TODO: take browser input, write onto db.json and store there

// TODO: 