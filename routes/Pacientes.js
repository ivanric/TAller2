var express = require('express');
var router = express.Router();//declarando un objeto router para ser mandado a la app
var pg=require('pg');
var bd=require('../bd_pool.js');
var session= require('express-session');
var pool=bd.basedatos;

var UsuariosModelos=require('../models/usuarios_models.js')
var PacientesModelos=require('../models/pacientes_models.js')

router.all('/Gestion', function(req, res, next) {//aui se le asigna las rutas
  // console.log('Bienvenido Gestion Usuarios');
  PacientesModelos.GestionPacientes(function(resp){
    UsuariosModelos.ListarDatos(function(resp2){
      console.log("La resp1",resp);
      console.log("La resp1",resp2);
      res.render('GestionPacientes',{
        LPacientes:resp,
        LDatos:resp2,
      })
    })
  })
});
router.post('/MAPaciente', function(req, res, next) {
  console.log('Llego .... modal adicionar paciente');
  res.render('MAPaciente')
});
router.post('/adicionarPaciente', function(req, res, next) {
  console.log('Llego  adicionar paciente',req.body);
  console.log('sesion',req.session.usuario);
  var usuario=req.session.usuario;
  PacientesModelos.adicionarPaciente(req,usuario,function(resp){
    var salida={
        result:true
    }
    res.json(salida)
  })
});
router.delete('/eliminar',function(req,res,next){
  PacientesModelos.Eliminar(req,function(resp){
    var salida={
      result:true,
    }
    res.json(salida)
  })

})
router.post('/habilitar',function(req,res,next){
  PacientesModelos.Habilitar(req,function(resp){
    var salida={
      result:true,
    }
    res.json(salida)
  })
})
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = router;// se exporta el router a la app y se captura en app.use(router)
