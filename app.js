const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user.router');
const adminRoutes = require('./routes/admin_router');
const path = require('path');
var cookieParser = require('cookie-parser')

require("./controllers/DailyCronJobs");


app.use(express.json());
app.use(cookieParser())
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', adminRoutes);

app.get("/test", (req, res)=>{
  res.render('demo.ejs', {
    title: 'Slotgame | Landing Page',
    // message: message,
    url: ''
  });
});

app.listen(3300, () => {

  console.log('Server is running on port 3300');
});




app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
  }
}));
// app.use(fileUpload());