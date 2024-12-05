require('dotenv').config();
const express=require('express')
const mongoose = require('mongoose')
const dbUrl = process.env.DATABASE_URL;
const app=express()
const port =process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send('welcome to express')
})
app.listen(port, () => {
    console.log('Listening on port ' + port)
})
console.log(`Connecting to database: ${dbUrl}`);
mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log('Mongodb connected'))
    .catch((err)=>console.log('Error' , err))
