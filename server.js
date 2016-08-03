var express = require('express');
var app = express();
var fs = require('fs');
var ejs = require('ejs');

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

app.listen('8000');
