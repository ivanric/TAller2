var express = require('express');
var router = express.Router();//declarando un objeto router para ser mandado a la app
var pg=require('pg');
var bd=require('../bd_pool.js');
var session= require('express-session');
var pool=bd.basedatos;

var TratamientosModelos=require('../models/tratamientos_models.js')
var ConsultasModelos=require('../models/consultas_models.js')

router.all('/Gestion', function(req, res, next) {//aui se le asigna las rutas
  TratamientosModelos.GestionTratamientos1(function(resp){
    TratamientosModelos.GestionTratamientos2(function(resp1){
      // console.log("La respuesta111",resp);
      console.log("La resp servvv",resp1);
      res.render('GestionTratamientos',{
        LTratamientos:resp,
        LServicios:resp1,
      })
    })
  })
});
router.post('/MATratamiento', function(req, res, next) {
  console.log('Llego .... modal adicionar Tratamiento');
  TratamientosModelos.ListarPacientes(req,function(resp){
    TratamientosModelos.ListarServicios(req,function(resp1){
      console.log('LP:',resp);
      console.log('LS:',resp1);
      res.render('MATratamiento',{
        LPacientes:resp,
        LServicios:resp1
      })
    })
  })
});
router.post('/adicionarTratamiento', function(req, res, next) {
  console.log('Llego  adicionar tratamiento',req.body);
  console.log('sesion',req.session.usuario);
  var usuario=req.session.usuario;
  TratamientosModelos.adicionarTratamiento(req,usuario,function(resp){
    var salida={
        result:true
    }
    res.json(salida)
  })
});
router.post('/ListRev/:id', function(req, res, next) {
  console.log('Llego  listar Revisiones',req.params);
  console.log('sesion',req.session.usuario);
  var usuario=req.session.usuario;
  var codr=req.params.id;
  console.log('listaddaaaaaaa',codr);
  TratamientosModelos.ListRev(codr,function(resp){
    console.log("Revisiones ",resp);
    res.render('ListRev',{
      LRev:resp,
      CodR:codr
    })
  })
});
router.post('/MARev', function(req, res, next) {
  // ConsultasModelos.ListarPacientes(req,function(resp){
    console.log('Llego .... modal adicionar Revision',req.body.id);
    var codc=req.body.id;
    console.log('revisionnnnnnnnnnnnn',codc);
    res.render('MARev',{
      id:codc
    })
  // })
});
router.post('/adicionarRevision', function(req, res, next) {
  console.log('Llego  adicionar diagnostico',req.body);
  console.log('sesion',req.session.usuario);
  var usuario=req.session.usuario;
  TratamientosModelos.adicionarRevision(req,usuario,function(resp){
    var salida={
        result:true
    }
    res.json(salida)
  })
});
router.post('/MATFactura',function(req,res,next){
  console.log('MATFactura_condcons',req.body.codcons);
  TratamientosModelos.ListaConsPrecio(req,function(resp){
    console.log('resp: ',resp);
    TratamientosModelos.PrecioDiagnostico(req,function(resp1){
      console.log('resp1: ',resp1);
      ConsultasModelos.LFactConsultas(req,function(resp2){
        console.log('resp2: ',resp2);
        TratamientosModelos.ServicioTratamiento(req,function(resp3){
          console.log('resp3: ',resp3);
          var P_diag=0,total=0;
          var P_serv=parseInt(resp3[0].p_serv,10);
          if (resp1[0].p_diag!=null) {
            console.log('entro trueee');
            P_diag=resp1[0].p_diag;
            total=parseInt(resp[0].p_cons,10)+parseInt(resp1[0].p_diag,10);
          }else{
            console.log('entro elseee');
            P_diag=0;
            total=parseInt(resp[0].p_cons,10)
          }
          total=total+P_serv;
          console.log('P_diag: ',P_diag);
          console.log('TOTAL: ',total);
          res.render('MATFactura',{
            ListaConsPrecio:resp,
            Total:total,
            p_diag:P_diag,
            p_serv:P_serv,
            LFactConsultas:resp2
          })
        })
      })
    })
  })
})
router.post('/ListaJSon',function(req,res,next){
  TratamientosModelos.ListaConsPrecio(req,function(resp){
    console.log('resp: ',resp);
    TratamientosModelos.PrecioDiagnostico(req,function(resp1){
      console.log('resp1: ',resp1);
      TratamientosModelos.ServicioTratamiento(req,function(resp2){
        console.log('resp2: ',resp2);
        var P_diag=0,total=0;
        var P_serv=parseInt(resp2[0].p_serv,10);
        if (resp1[0].p_diag!=null) {
          console.log('entro trueee');
          P_diag=resp1[0].p_diag;
          total=parseInt(resp[0].p_cons,10)+parseInt(resp1[0].p_diag,10);
        }else{
          console.log('entro elseee');
          P_diag=0;
          total=parseInt(resp[0].p_cons,10)
        }
        total=total+P_serv;
        console.log('P_diag: ',P_diag);
        console.log('TOTAL: ',total);
        var salida={
          codcons:parseInt(resp[0].codcons,10),
          p_cons:parseInt(resp[0].p_cons,10),
          Total:total,
          p_diag:P_diag,
          p_serv:P_serv
        }
        res.json(salida)
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
