/* app.js */

// require and instantiate express
var express = require('express'),
  bodyParser = require('body-parser');

var app = express();

app.use(bodyParser());
// set the view engine to ejs
app.set('view engine', 'ejs')

// blog home page
app.get('/', (req, res) => {
  // render `home.ejs` with the list of posts
  res.render('home');
})

app.post('/encrypt', function(req, res, next) {
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h",
    "i", "j", "k", "l", "m", "n", "o", "p", "q",
    "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ];

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
console.log(paired);

  var encryptedMessage = "";
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

  res.send({
    encryptedValue: encryptedMessage
  });
});

var port = process.env.PORT || 3000; //can run both on Azure or local
var server = app.listen(process.env.PORT || 3000);

console.log('listening on port 3000')
