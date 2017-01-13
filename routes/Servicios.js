var express = require('express');
var router = express.Router();//declarando un objeto router para ser mandado a la app
var pg=require('pg');
var bd=require('../bd_pool.js');
var session= require('express-session');
var pool=bd.basedatos;

var ServiciosModelos=require('../models/servicios_models.js')


router.all('/Gestion', function(req, res, next) {//aui se le asigna las rutas
  ServiciosModelos.GestionServicios(function(resp){
    console.log("La resp",resp);
    res.render('GestionServicios',{
      LServicios:resp,
    })
  })
});
router.post('/MAServicio', function(req, res, next) {
  console.log('Llego .... modal adicionar Servicio');
  res.render('MAServicio')
});
router.post('/adicionarServicio', function(req, res, next) {
  console.log('Llego  adicionar servicio',req.body);
  console.log('sesion',req.session.usuario);
  var usuario=req.session.usuario;
  ServiciosModelos.adicionarServicio(req,function(resp){
    var salida={
        result:true
    }
    res.json(salida)
  })
});
router.post('/MMServicio',function(req,res,next){//modal Modificar  Usuario
  ServiciosModelos.MMServicio(req,function(respuesta){
    console.log('Servicio a Modificar: ',respuesta);
    res.render('MMServicio',{
      DMServicio:respuesta
    });
  })
})
router.post('/ModificarServicio',function(req,res,next){
  console.log('llego ModificarServicio');
  console.log(req.body);
  ServiciosModelos.ModificarServicio(req,function(resultado){
    var salida={
      result:true,
    }
    res.json(salida)
  })
})


router.delete('/eliminar',function(req,res,next){
  ServiciosModelos.Eliminar(req,function(resp){
    var salida={
      result:true,
    }
    res.json(salida)
  })

})
router.post('/habilitar',function(req,res,next){
  ServiciosModelos.Habilitar(req,function(resp){
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
