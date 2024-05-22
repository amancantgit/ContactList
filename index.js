const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));



app.get('/', function(req, res){

    Contact.find({})
    .then((contacts) => {
      return res.render('home',{
            title: "Contact Lists",
            contact_list: contacts
        });
    })
    .catch((err) => {
      console.log('error in fetching contact from db:', err);
      // Handle the error appropriately
    });
});



app.post('/create-contact', function(req, res){
    
    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email })
    .then((newContact) => {
        console.log('Contact created: ', newContact);
        return res.redirect('back');
    })
    .catch((err) => {
        console.log('error in creating a contact!', err);
    });
})



//to deleting a contact
app.get('/delete-contact', function(req, res){
    //get the id from query in the url
    let id = req.query.id;

    //find the contact in the database and delete
   Contact.findByIdAndDelete(id)
   .then((deleted) =>{
    console.error(`Contact Deleted:`, deleted);
    return res.redirect('back');
   })
   .catch((err) => {
    console.log('error in deleting a contact from database', err);
    
   });
});





app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('Yup! My Express server is running on port', port);
});