var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');//un complemeto para sesiones
var bodyParser = require('body-parser');
var session= require('express-session');


var routes = require('./routes/index');
var users = require('./routes/users');
var usuarios = require('./routes/Usuarios');
var pacientes = require('./routes/Pacientes');
var servicios = require('./routes/Servicios');
var consultas = require('./routes/Consultas');
var tratamientos = require('./routes/Tratamientos');
var facturas = require('./routes/Facturas');
var historiales = require('./routes/Historiales');
// var citas = require('./routes/Citas');
// var archivos = require('./routes/Archivos');
// var roles = require('./routes/Roles');

var app = express();//se requiere el express

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//habilita el parser para recibir de formularios objetos JSON

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));


//**********************************SESIONES
app.use(cookieParser());//se usa cookieParser
app.use(session({
    secret: 'user123',
    resave: false,
    saveUninitialized: true
}))

// app.use(multer({
//     dest: './uploads/',
//     rename: function (fieldname, filename) {
//         return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
//     },
//     onFileUploadStart: function (file) {
//         console.log(file.fieldname + ' is starting ...')
//     },
//     onFileUploadData: function (file, data) {
//         console.log(data.length + ' of ' + file.fieldname + ' arrived')
//     },
//     onFileUploadComplete: function (file) {
//         console.log(file.fieldname + ' uploaded to  ' + file.path)
//     }
// }));


app.use('/', routes);
app.use('/users', users);
app.use('/Usuarios', usuarios);
app.use('/Pacientes', pacientes);
app.use('/Servicios', servicios);
app.use('/consultas', consultas);
app.use('/Tratamientos', tratamientos);
app.use('/Facturas', facturas);
app.use('/Historiales', historiales);
// app.use('/Citas', citas);
// app.use('/Archivos', archivos);
// app.use('/Roles', roles);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
