var express = require('express');
var router = express.Router();//declarando un objeto router para ser mandado a la app
var pg=require('pg');
var bd=require('../bd_pool.js');
var session= require('express-session');
var pool=bd.basedatos;

var ConsultasModelos=require('../models/consultas_models.js')

router.all('/Gestion', function(req, res, next) {//aui se le asigna las rutas
  ConsultasModelos.GestionConsultas(function(resp){
    console.log("La resp",resp);
    res.render('GestionConsultas',{
      LConsultas:resp,
    })
  })
});
router.post('/MAConsulta', function(req, res, next) {
  ConsultasModelos.ListarPacientes(req,function(resp){
    console.log('Llego .... modal adicionar Consuta');
    res.render('MAConsulta',{
      LPacientes:resp
    })
  })
});
router.post('/adicionarConsulta', function(req, res, next) {
  console.log('Llego  adicionar consulta',req.body);
  console.log('sesion',req.session.usuario);
  var usuario=req.session.usuario;
  ConsultasModelos.adicionarConsulta(req,usuario,function(resp){
    var salida={
        result:true
    }
    res.json(salida)
  })
});
router.post('/ListDiag/:id', function(req, res, next) {
  console.log('Llego  listar diag',req.params);
  console.log('sesion',req.session.usuario);
  var usuario=req.session.usuario;
  var codc=req.params.id;
  console.log('listaddaaaaaaa',codc);
  ConsultasModelos.ListDiag(codc,function(resp){
    res.render('ListDiag',{
      LDiag:resp,
      CodC:codc
    })
  })
});
router.post('/MADiag', function(req, res, next) {
  // ConsultasModelos.ListarPacientes(req,function(resp){
    console.log('Llego .... modal adicionar diagnostico',req.body.id);
    var codc=req.body.id;
    res.render('MADiag',{
      id:codc
    })
  // })
});
router.post('/adicionarDiagnostico', function(req, res, next) {
  console.log('Llego  adicionar diagnostico',req.body);
  console.log('sesion',req.session.usuario);
  var usuario=req.session.usuario;
  ConsultasModelos.adicionarDiagnostico(req,function(resp){
    var salida={
        result:true
    }
    res.json(salida)
  })
});
router.post('/ControlCF',function(req,res,next){
  console.log('controlConsF',req.body.codcons);
  ConsultasModelos.ControlCF(req,function(resp){
    console.log('callback: ',resp);
    res.json(resp)
  })
})
router.post('/ExisteDiag',function(req,res,next){
  console.log('idconsfact',req.body.codcons);
  ConsultasModelos.ExisteDiag(req,function(resp){
    console.log('resp1',resp[0].codc);
    var existe_diag=resp[0].codc;
    if (existe_diag!=null) {
      res.json(true);
    }else{
      res.json(false)
    }
  })
})
router.post('/ExisteTrat',function(req,res,next){
  console.log('idconsfact',req.body.codcons);
  ConsultasModelos.ListaConsDiag(req,function(resp2){
    console.log("resp2: "+resp2.length,resp2[0]);
    if (resp2[0]!=undefined) {
      res.json(true)
    } else {
      res.json(false)
    }
  })
})
router.post('/MACFactura',function(req,res,next){
  console.log('MACFactura_condcons',req.body.codcons);
  ConsultasModelos.ListaConsDiag(req,function(resp){
    ConsultasModelos.LFactConsultas(req,function(resp1){
      console.log('resp: ',resp);
      console.log('resp1: ',resp1);
      console.log("resp: "+resp.length,resp[0]);
      var total=parseInt(resp[0].p_cons,10)+parseInt(resp[0].p_diag,10);
      res.render('MACFactura',{
        LCFacturas:resp,
        Total:total,
        LFactConsultas:resp1
      })

    })
  })
})
router.post('/ListaConsDiag',function(req,res,next){
  console.log('ListaConsDiag',req.body.codcons);
  ConsultasModelos.ListaConsDiag(req,function(resp){
    console.log('resp: ',resp);
    console.log("resp: "+resp.length,resp[0]);
    var total=parseInt(resp[0].p_cons,10)+parseInt(resp[0].p_diag,10);
    var salida={
        codcons:parseInt(resp[0].codcons,10),
        p_cons:parseInt(resp[0].p_cons,10),
        p_diag:parseInt(resp[0].p_diag,10),
        total:total
    }
    res.json(salida)
  })
})
router.post('/adicionarFactura',function(req,res,next){
  console.log('rq:',req.body);
  ConsultasModelos.adicionarFactura(req,function(resp){
    console.log("resp: "+resp.length,' ',resp[0]);
    ConsultasModelos.LFactConsultas(req,function(resp1){
      res.render('ListaCFacturas',{
        LFactConsultas:resp1
      })
    })
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
