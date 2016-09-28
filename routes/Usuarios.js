var express = require('express');
var router = express.Router();//declarando un objeto router para ser mandado a la app
var pg=require('pg');
var bd=require('../bd.js');
var session= require('express-session');
var pool=bd.basedatos;

router.all('/Usuarios', function(req, res, next) {//aui se le asigna las rutas
  // console.log('Bienvenido Gestion Usuarios');
  pool.connect(function(err, client, done) {
    if(err) {// si existe un error
      return console.error('ir a buscar error de cliente de la pool', err);
    }
    client.query('SELECT u.* from usuario u where u.estado=1', function(err, result) {
      // res.json(result.rows);
      console.log(result.rows[0]);
      res.render('GestionUsuarios',{
        LUsuarios:result.rows
      });
      if(err) {
        return console.error('Error de ejecución de consulta', err);
      }
      done();
    });
  });

  pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack)
  })
});//se pasa el nombre de la plantilla

router.post('/LUsuarios', function(req, res, next) {
  console.log('LLegue lisra de Usuarios');
  pool.connect(function(err, client, done) {
    if(err) {// si existe un error
      return console.error('ir a buscar error de cliente de la pool', err);
    }
    client.query('SELECT u.* from usuario u where u.estado=1', function(err, result) {
      // res.json(result.rows);
      console.log('La Lista en Json de Usuarios',result.rows);
      res.json(result.rows);
      if(err) {
        return console.error('Error de ejecución de consulta', err);
      }
      done();
    });
  });

  pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack)
  })
});

router.post('/ModalAddUser', function(req, res, next) {
  console.log('Llego ....adicionar Usuarios');
  res.render('MAUsuario')
});


module.exports = router;// se exporta el router a la app y se captura en app.use(router)
