const express = require("express");
const mongoose = require("mongoose");
const app = express();
const notesRouter = require("./routes/notes");
const usersRouter = require("./routes/users");
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');

dotenv.config();

// Setup default db connection
mongoose.connect(process.env.ATLAS_CONNNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
// Get default connection
const db = mongoose.connection;
// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}.....`);
});
