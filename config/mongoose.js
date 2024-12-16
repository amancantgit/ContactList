//require the mongoose library
const mongoose= require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/contact');
const db=mongoose.connection;

//if error occured
db.on('error',console.error.bind(console,'error connecting to the database'));

//up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to the database');
});