/* app.js
Author: Nicholas Rowlandson
Description: Vignere Cipher - Assignment #3 COMP3026
Date: May 30th 2017
*/

var express = require('express'),
  bodyParser = require('body-parser');

var app = express();

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h",
  "i", "j", "k", "l", "m", "n", "o", "p", "q",
  "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

var decryptedMessage = "";
var encryptedMessage = "";

app.use(bodyParser());
// set the view engine to ejs
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  // render `home.ejs` with the list of posts
  res.locals.decryptedMessage = '';
  res.locals.encryptedMessage = '';
  res.render('home');
})

// Read input from user and encrypt message using provided key and rot type
app.post('/encrypt', function(req, res, next) {

  var paired = new Array();
  var keyLength = req.body.encryptKey.length;
  var count = 0;
  for (var i = 0; i < req.body.encryptValue.replace(/\s/g, '').length; i++) {
    if (count >= keyLength) {
      count = 0;
    }
    paired.push({
      value: req.body.encryptValue.replace(/\s/g, '').charAt(i),
      key: req.body.encryptKey.charAt(count)
    });
    count++;
  }

  for (var i = 0; i < paired.length; i++) {
    var pair = paired[i];
    if(pair.value != ' ') {
      var rot;
      var value;
      for (var j = 0; j < alphabet.length; j++) {
          if (alphabet[j] == pair.key) {
            rot = j;
          }
          if (alphabet[j] == pair.value) {
            value = j;
          }
      }
    }
    var result = value + rot;
    if(req.body.encryptType == "rot1") {
      result = result + 1;
    }

    if (result >= alphabet.length) {
      result = result - alphabet.length;
    }
    if(result >= 0) {
      encryptedMessage += alphabet[result];
    }
  }
  res.locals.encryptedMessage = encryptedMessage;
  res.locals.decryptedMessage = decryptedMessage;
  res.render('home');
});

// Read input from user and decrypt message using provided key and rot type
app.post('/decrypt', function(req, res, next) {

  var paired = new Array();
  var keyLength = req.body.decryptKey.length;
  var count = 0;
  for (var i = 0; i < req.body.decryptValue.replace(/\s/g, '').length; i++) {
    if (count >= keyLength) {
      count = 0;
    }
    paired.push({
      value: req.body.decryptValue.replace(/\s/g, '').charAt(i),
      key: req.body.decryptKey.charAt(count)
    });
    count++;
  }

  for (var i = 0; i < paired.length; i++) {
    var pair = paired[i];
    if(pair.value != ' ') {
      var rot;
      var value;
      for (var j = 0; j < alphabet.length; j++) {
          if (alphabet[j] == pair.key) {
            rot = j;
          }
          if (alphabet[j] == pair.value) {
            value = j;
          }
      }
    }
    var result = value - rot;
    if(req.body.decryptType == "rot1") {
      result = result - 1;
    }

    if (result < 0) {
      result = result + alphabet.length;
    }
    if(result >= 0) {
      decryptedMessage += alphabet[result];
    }
  }
  res.locals.decryptedMessage = decryptedMessage;
  res.locals.encryptedMessage = encryptedMessage;
  res.render('home');
});

var port = process.env.PORT || 3000; //can run both on Azure or local
var server = app.listen(process.env.PORT || 3000);

console.log('listening on port 3000')
