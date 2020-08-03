const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require('path');


dotenv.config({path: './credentials.env'});



const app = express();  //starts the server


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port:'8889'

});

const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));

//parse URL enocoded bodies(as sent by html forms)
app.use(express.urlencoded({extended: false}));

//parse JSON bodies(as sent by api clients)
app.use(express.json());



app.set('view engine', 'hbs');


db.connect( (error) => {
    if(error){
        console.log(error);
    }

    else{
        console.log("MYSQL IS CONNECTED");
    }
});

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000,()=>{
    console.log("server has been started on port 5000");
});
