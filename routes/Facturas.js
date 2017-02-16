var express = require('express');
var router = express.Router();//declarando un objeto router para ser mandado a la app
var pg=require('pg');
var bd=require('../bd_pool.js');
var session= require('express-session');
var pool=bd.basedatos;

var FacturasModelos=require('../models/facturas_models.js')
var jsreport=require('jsreport')
var jade=require('jade');

var jsreport_jade=require('jsreport-jade');
// var page=require('webpage').create();
var fs=require('fs');
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
router.all('/imprimir',function(req,res,next){
  console.log('hello imprimir');
  // jsreport.render({
  //   template: {
  //       recipe: "phantom-pdf",
  //       content: "<h1>Hello world</h1>",
  //       phantom: {
  //           header: "<p>cabezera</p>",
  //           orientation: "landscape",
  //           width: "200px"
  //       },
  //       engine: "handlebars"
  //   },
  // }).then(function(out) {
  //   out.stream.pipe(res);
  // }).catch(function(e) {
  //   res.end(e.message);
  // });

  var dataV={'valor':2};
  fs.readFile('./views/impri.html',function(err,html){
    console.log('get_html:',html.toString());
    if (err) {
      console.log(err);
    }
    FacturasModelos.GestionFacturas(function(resp){
      console.log('GF',resp);
      var marc={respuesta:resp};
      console.log('GFM',marc);
      jsreport.render({
        template: {
          recipe: "phantom-pdf",
          content: html.toString(),
          phantom: {
              // header: "<p>cabezera</p>",
              // orientation: "landscape",
              orientation: "portrait",
              // width: "100px"
              // format:'A4',
              width:'10cm',
              height:'15cm'
          },
          engine: "handlebars"
        },
        "authentication":{
          "cookieSession": {
            "secret": "dasd321as56d1sd5s61vdv32"
          },
          "admin": {
            "username" : "admin",
            "password": "admin"
          }
        },
        data:marc,
      }).then(function(out){
        out.stream.pipe(res);
      }).catch(function(e){
        res.end(e.message);
      });
    })
  })
  // jade.renderFile('./views/impri.jade',data,function(error,html){
  //   console.log(data+' '+html);
  //   FacturasModelos.GestionFacturas(function(resp){
  //   })
  // });

  // var codigo='';
  // fs.readFile('../views/impri.html',function(err,html){
  //   console.log(html);
  //   codigo=html;
  // })
  // jsreport.render({
  //   template:{
  //     // shortid : "dsra23",
  //     recipe: "phantom-pdf",
  //     content:codigo,
  //     engine: "handlebars"
  //   }
  // }).then(function(out) {
  //   out.stream.pipe(res);
  // }).catch(function(e) {
  //   res.end(e.message);
  // });

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
