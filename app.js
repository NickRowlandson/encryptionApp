/* app.js */

// require and instantiate express
const app = require('express')()

// set the view engine to ejs
app.set('view engine', 'ejs')

// blog home page
app.get('/', (req, res) => {
  // render `home.ejs` with the list of posts
  res.render('home')
})

var port = process.env.PORT||3000; //can run both on Azure or local
var server = app.listen(process.env.PORT||3000);

console.log('listening on port 3000')
