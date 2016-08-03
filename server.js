var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var ejs = require('ejs');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static('public'));


app.get('/courses', function(req, res) {
  fs.readFile('courses.json', 'utf8', function(err, data) {
    var courses = JSON.parse(data);
    res.locals = { courses: courses }
    res.render('courses.ejs');
  });
});

app.get('/courses/:id', function(req, res) {
  fs.readFile('courses.json', 'utf8', function(err, data) {
    var courses = JSON.parse(data);

    courses.forEach(function(course) {
      if(course.id === req.params.id) {
        res.locals = { course: course }
      }
    });
    res.render('course.ejs');
  });
});

app.get('/about', function(req, res) {
  res.render('about.ejs');
});

app.get('/contact', function(req, res) {
  res.render('contact.ejs');
});

app.post('/contact', function(req, res) {
  var firstName = req.body.first_name;
  var lastName = req.body.last_name;
  var email = req.body.email;
  var messageBody = req.body.message;

  var message = {
    name: firstName + " " + lastName,
    email: email,
    body: messageBody
  }

  function appendMessages(obj) {
    var messagesFile = fs.readFileSync('messages.json');
    var messages = JSON.parse(messagesFile);
    messages.push(obj);
    var messagesJSON = JSON.stringify(messages);
    fs.writeFileSync('messages.json', messagesJSON);
  }

  appendMessages(message);

  res.render('contactresponse.ejs');
});


app.get('/messages', function(req, res) {
  res.sendFile(__dirname + "/messages.json");
});

app.listen('8000');
