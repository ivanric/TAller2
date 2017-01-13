var express = require('express');
var router = express.Router();//declarando un objeto router para ser mandado a la app
var pg=require('pg');
var bd=require('../bd_pool.js');
var session= require('express-session');
var pool=bd.basedatos;

var FacturasModelos=require('../models/facturas_models.js')


router.all('/Gestion', function(req, res, next) {//aui se le asigna las rutas
  FacturasModelos.GestionFacturas(function(resp){
    console.log("La resp",resp);
    res.render('GestionFacturas',{
      LFacturas:resp,
    })
  })
});
router.post('/MAFactura', function(req, res, next) {
  console.log('Llego .... modal adicionar Factura');
  res.render('MAFactura')
});
router.post('/adicionarFactura', function(req, res, next) {
  console.log('Llego  adicionar factura',req.body);
  console.log('sesion',req.session.usuario);
  var usuario=req.session.usuario;
  FacturasModelos.adicionarFactura(req,function(resp){
    console.log('respFact: ',resp);
    var salida={
        result:true
    }
    res.json(salida)
  })
});
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
