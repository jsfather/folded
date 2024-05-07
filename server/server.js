require('dotenv').config();

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(req.path , req.method);
    next()
})

app.get('/', (req, res) => {
    res.json({msg: "Hello World!"});
})

app.listen(port , ()=>{
    console.log(`Server started at http://localhost:${port}`);
})