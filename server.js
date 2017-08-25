// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express                    // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var crypto = require('crypto');

// configuration =================

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'rezik007.heliohost.org',
  user     : 'rezik007_vehicle',
  password : 'vehiclerent007',
  database : 'rezik007_vehiclerent'
});

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({extended: true}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


// routes ======================================================================

// api ---------------------------------------------------------------------
// // get all todos
// app.get('/api/todos', function(req, res) {
//     // use mongoose to get all todos in the database
//     Todo.find(function(err, todos) {
//         // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//         if (err) {res.send(err)}

//         res.json(todos); // return all todos in JSON format
//     });
// });

// create todo and send back all todos after creation
// app.post('/api/createAccount', function(req, res) {
//     // create a todo, information comes from AJAX request from Angular
//     User.create({
//         name: req.body.username,
//         email: req.body.email,
//         password: crypto.createHash('md5').update(req.body.password).digest('hex'),
//         done: false
//     },
//     function(err, users) {
//         if (err) {res.send(err);}

//         // get and return all the todos after you create another
//         User.find(function(err, users) {
//             if (err) {res.send(err)}
//             res.json(users);
//         });
//     });
// });
app.post('/api/createAccount', function(req, res) {
    // create a todo, information comes from AJAX request from Angular
    console.log(req.body);
    let password = crypto.createHash('md5').update(req.body.password).digest('hex');
    connection.connect();
    connection.query('INSERT INTO `users` (name, email, password) VALUES ("' + req.body.username + '","' + req.body.email + '","' + password + '");', function(err, rows, fields) {
        if (err) {throw err}

        console.log('Done');
    })

    connection.end()
});
// app.post('/api/login', function(req, res) {
//     // create a todo, information comes from AJAX request from Angular
//     var cryptedPswd =  crypto.createHash('md5').update(req.body.password).digest('hex')
//     User.find({
//         name: req.body.name,
//         password: cryptedPswd
//     }, function(err, users) {
//         if (err) {res.send(err)}
//         else if (users[0] != undefined  && cryptedPswd == users[0].password) {
//             res.send('ZALOGOWANO')
//         } else {
//             res.send('Bledne dane logowania!');
//         }
//     })
// });


// // delete a todo
// app.delete('/api/todos/:todo_id', function(req, res) {
//     Todo.remove({
//         _id: req.params.todo_id
//     }, function(err, todo) {
//         if (err) {res.send(err);}

//         // get and return all the todos after you create another
//         Todo.find(function(err, todos) {
//             if (err) {res.send(err)}
//             res.json(todos);
//         });
//     });
// });

// application -------------------------------------------------------------
// app.get('*', function(req, res) {
//     res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log('App listening on port 8080');
