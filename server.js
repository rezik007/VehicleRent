// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var crypto = require('crypto');
var validator = require('validator');
var uid = require('rand-token').uid;

// configuration =================

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'rezik007.heliohost.org',
  user     : 'rezik007_vehicle',
  password : 'vehiclerent007',
  database : 'rezik007_vehiclerent'
});

connection.connect()

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({extended: true}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// routes ======================================================================

app.post('/api/user/register', function(req, res) {
    if(validator.isAlphanumeric(req.body.username) && validator.isEmail(req.body.email)) {
        connection.query('SELECT password FROM `users` WHERE email=? OR name=?', [req.body.email, req.body.username], function(err, rows, fields) {
            if (err) {throw err}
            if (rows[0] === undefined) {
                let password = crypto.createHash('md5').update(req.body.password).digest('hex')
                connection.query('INSERT INTO `users` (name, email, password) VALUES (?, ?, ?);',
                [req.body.username, req.body.email, password], function(err, rows, fields) {
                    if (err) {throw err}
                    res.status(201);
                    res.json({msg: 'Your Registration was successfull! :): Konto zostało utworzone.'})
                })
            } else {
                res.status(400);
                res.json({msg: 'Something went wrong! :( - Email lub nazwa użytkownika są już zajęte.'})
            }
        })
    } else {
        res.status(400);
        res.json({msg: 'Something went wrong! :( - Niepoprawna nazwa użytkownik lub hasło.'})
    }
});

app.post('/api/user/login', function(req, res) {
    let password = crypto.createHash('md5').update(req.body.password).digest('hex')
    connection.query('SELECT password FROM `users` WHERE email=?', [req.body.email],
     function(err, rows, fields) {
        if (err) {throw err}
         if (rows[0] !== undefined) {
            if(rows[0].password === password) {
                res.status(200);
                res.json({msg: 'Your Login was successfull! Zalogowano poprawnie.',
                        username: req.body.username,
                        token: uid(16)})
            } else {
                res.status(400);
                res.json({msg: 'Nieprawidłowe hasło.'})
            }
         }
        else {
                res.status(400);
                res.json({msg: 'Konto o podanym adresie email nie istnieje.'});
            }
     })
});
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log('App listening on port 8080');
