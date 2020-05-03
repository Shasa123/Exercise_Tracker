const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;
app.use(cors());
app.use(express.json());

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB has connected Successfully");
})

const ExcerciseRouter = require('./routes/exercises');
const UserRouter = require('./routes/users');

app.use('/exercises', ExcerciseRouter);
app.use('/users', UserRouter);

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
})