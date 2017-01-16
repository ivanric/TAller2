var express = require('express');
var router = express.Router();//declarando un objeto router para ser mandado a la app
var pg=require('pg');
var bd=require('../bd_pool.js');
var session= require('express-session');
var pool=bd.basedatos;

var HistorialesModelos=require('../models/historiales_models.js')
// var ModeloHist=require('../secualize_modelos/principal.js')
// var bd=SecualizeHistoriales.secuelize;

// router.all('/Gestion', function(req, res, next) {//aui se le asigna las rutas
//   ModeloHist.coneccion.sync().then(function(){
//       // ModeloHist.ARC.findById(2).then(function(archivo){//que me busque todo y luego se cargue el objeto en un callback
//     ModeloHist.ARC.findAll().then(function(archivo){//que me busque todo y luego se cargue el objeto en un callback
//       // console.log('bd: ',archivo.dataValues);
//       console.log('es_null??: ',archivo.dataValues===null);
//       // console.log('bd: ',archivo.dataValues);
//       console.log('tamaño de datos: ',archivo.length);
//       for (var i = 0; i < archivo.length; i++) {
//         console.log('bd: ',archivo[i].dataValues);
//       }
//     });
//   }).catch(function(err){
//     console.log('error: ',err);
//   })
//   // console.log(ModeloHist.Datos.findAll());
//   res.send(ModeloHist.pruebilla);
//   // console.log(ModeloHist.pruebilla);
//   // console.log(ModeloHist.sequelize);
// });
router.all('/Gestion', function(req, res, next) {//aui se le asigna las rutas
  res.render('GestionHistoriales')
});
//esto es cuando se utiliza el ajax de la dataTable
router.post('/lista', function(req, res, next) {//aui se le asigna las rutas
  // console.log(req);
  console.log(req.body);
  console.log('tamaño',req.body.length);
  console.log('start',req.body.start);
  console.log('estado',req.body.estado);
  console.log('busq',req.body.busq);
  // console.log('busq',req.body.busq==null,req.body.busq=='');
  console.log('dibujo',req.body.draw);

  HistorialesModelos.lista(req,function(resp){
    // resp.recordsFiltered=resp.length;
    HistorialesModelos.TotHist(function(total){
      console.log("La resp",resp);
      console.log("total",total);
      var pagRegistro=0;
      if (req.body.busq!='') {
        console.log('entroo: ');
        pagRegistro=resp.length;
      } else {
        pagRegistro=0;
      }
      res.json({
        data:resp,
        // recordsFiltered:resp.length,// el tamaño del paginador
        recordsFiltered:pagRegistro,// el tamaño del paginador
        recordsTotal:total[0].tot,//total de las filas de la tabla o MAX de registros
        draw:req.body.draw
      });
    })
  })
});
router.post('/listaHistoriales',function(req,res,next){
  console.log(req.body);
  HistorialesModelos.GestionHistoriales(req,function(resp){
    res.json(resp)
  })
  // res.json({d:'ss'})
})
module.exports = router;
