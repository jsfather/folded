require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI;
const mongo_db_name = process.env.MONGO_DB_NAME;

const costsRoutes = require('./routes/costs');

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})
app.use(express.json());
app.use('/costs', costsRoutes);

mongoose.connect(mongo_uri , {dbName: mongo_db_name})
    .then(() => {
        app.listen(port, () => {
            console.log('Connected to database')
            console.log(`Server started at http://localhost:${port}`);
        })
    })
    .catch(err => console.log(err));

