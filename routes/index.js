const express = require('express');
const router = express.Router();
const formatDate = require('../public/javascripts/formatDate.js');

const messages = [
  {
    text: "Hi there!",
    user: "Amanda",
    added: formatDate(new Date())
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: formatDate(new Date())
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Message Board', messages: messages });
});

// Get new message form
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Message Board', messages: messages });
});

router.post('/new', function(req, res) {
  messages.push({text: req.body.message, user: req.body.user, added: formatDate(new Date())});
  res.redirect('/');
});

module.exports = router;
