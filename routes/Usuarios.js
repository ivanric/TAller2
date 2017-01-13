var express = require('express');
var router = express.Router();//declarando un objeto router para ser mandado a la app
var pg=require('pg');
var bd=require('../bd_pool.js');
var session= require('express-session');
var pool=bd.basedatos;
var multer=require("multer");
// var FormatFechas=require('../puclic/javascripts/Fechas/fechas.js')

var UsuariosModelos=require('../models/usuarios_models.js')

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/images');
  },
  filename: function (req, file, callback) {
    // callback(null, file.fieldname + '-' + Date.now());
    // if(file.originalname===undefined){
    console.log("ess: ",file);
    if(file===undefined){
      callback(null,"usuario.gif");
    }else {
      callback(null,file.originalname);

    }
    // callback(null, file.originalname + '-' + Date.now());
  }
});
// var storage=multer.diskStorage({
//   destination:function(req,file,cb){
//     cb(null,'./public/images/')
//   },
//   filemane:function(req,file,cb){
//     cb(null,Date.now()-file.originalname);
//   }
// })
// var fotos=multer({dest:'./public/images'})
var fotos=multer({ storage: storage })

router.all('/Gestion', function(req, res, next) {//aui se le asigna las rutas
  // console.log('Bienvenido Gestion Usuarios');
  UsuariosModelos.GestionUsuarios(function(resp){
    UsuariosModelos.Personales(function(resp2){
      UsuariosModelos.ListarDatos(function(resp3){
        console.log("La resp1",resp);
        console.log("La resp1",resp2);
        console.log("La resp1",resp3);
        res.render('GestionUsuarios',{
          LUsuarios:resp,
          LPersonales:resp2,
          LDatos:resp3
        });
      })
    })
  })
});
router.post('/ModalAAUsuario', function(req, res, next) {
  console.log('Llego .... modal adicionar Usuario Administrativo');
  res.render('MAAUsuario')
});
router.post('/ModalAPUsuario', function(req, res, next) {
  console.log('Llego ....modal adicionar Usuario Personal');
  var fa=new Date();
  var fecha=formatDate(fa);
  res.render('MAPUsuario',{
    FActual:fecha
  })
});

router.all('/MandarPersonal', function(req, res, next) {// ajax no usado
  console.log('Llego ....enviar personal');
  res.render('APersonal')
});
router.all('/SelUser', function(req, res, next) {//selecionar Administrativo o personal al adicionar
  console.log('Llego ...seleccionar user');
  res.render('SeleccionarUser');
});

// router.post('/adicionarUsuario',fotos.any(),function(req, res, next) {
router.post('/adicionarUsuario',fotos.single('foto'),function(req, res, next) {
  UsuariosModelos.AdicionarUsuarioAdministrativoPersonal(req,function(resultado){
    console.log("resultado add",resultado);
    var salida={
        result:true
    }
    res.json(salida)
  })
  // console.log("fotos",req.file);
  // console.log("Original Nombre",req.files[0].originalname);
  // console.log("Original Nombre",req.file.originalname);
  // console.log('El valor Maximo',codusuario());
  // if (req.body.tipo=='a') {
  //   console.log("------------tipo------------",req.body.tipo);
  //   // console.log("fotos",req.file==undefined);
  //   // console.log("adUser:",req.body.ci,req.body.nombre,req.body.ap,req.body.am,req.body.genero,req.body.fecha,req.body.direccion,req.body.telefono,req.body.correo,req.body.descripcion);
  //
  //   UsuariosModelos.AdicionarUsuarioAdministrativo(req,function(resultado){
  //     console.log("resultado add",resultado);
  //     var salida={
  //         result:true
  //     }
  //     res.json(salida)
  //   })
  // } else {
  //
  //   // console.log("adUser:",req.body.ci,req.body.nombre,req.body.ap,req.body.am,req.body.genero,req.body.fecha,req.body.direccion,req.body.telefono,req.body.correo,req.body.descripcion);
  //   console.log("------------tipo------------",req.body.tipo);
  //   console.log("ap ",req.body.ap=='');
  //   console.log("fecha ",req.body.fecha=='');
  //   console.log("direccion ",req.body.direccion=='');
  //   console.log("codpos ",req.body.codigo=='');
  //   console.log("fechafin ",req.body.ffin=='');
  //   console.log("telefono ",req.body.telefono=='');
  //   console.log("correo ",req.body.correo=='');
  //   console.log("foto ",req.body.foto=='');
  //   console.log("descripcion ",req.body.descripcion=='');
  //   UsuariosModelos.AdicionarUsuarioAdministrativo(req,function(resultado,codusu){
  //     var codu=codusu;
  //     UsuariosModelos.AdicionarUsuarioPersonal(req,codu,function(resp){
  //       console.log("resultado add_usu_per",resp);
  //       var salida={
  //           result:true
  //       }
  //       res.json(salida)
  //     })
  //   })
  // }
  // res.send('Respuesta')
});
router.post('/MUsuarioFecha',function(req,res,next){
  res.render('MMAUsuarioFecha')
})
router.post('/MMAUsuario',function(req,res,next){//modal Modificar  Usuario
  UsuariosModelos.MMADMINModal(req,function(respuesta){
    console.log('Administrativo a Modificar: ',respuesta);
    var fecha=respuesta[0].fechnac;
    var date=new Date(fecha);
    var fechaA=formatDate(fecha);
    console.log('fecha actual: ',fechaA+'');
    res.render('MMAUsuario',{
      DUADMIN:respuesta,
      fechaNac:fechaA
    });
  })
})

router.post('/MMPUsuario',function(req,res,next){//modal Modificar  Usuario
  UsuariosModelos.MMADMINModal(req,function(respuesta){
    UsuariosModelos.MMPersonalModal(req,function(resp2){
      var fecha1=respuesta[0].fechnac;
      var fecha2=resp2[0].ffini;
      var fecha3=resp2[0].ffin;
      var date1=new Date(fecha1);
      var date2=new Date(fecha2);
      var date3=new Date(fecha3);
      var f_actual=new Date();
      var fechaA=formatDate(date1);
      var fechaB=formatDate(date2);
      var fechaC=formatDate(date3);
      var fechaD=formatDate(f_actual);
      res.render('MMPUsuario',{
        DUADMIN:respuesta,
        DUPERSO:resp2,
        fechaNac:fechaA,
        fechaIni:fechaB,
        fechaFin:fechaC,
        fechaAct:fechaD,
      })
    })
  })
})
router.post('/ModificaraUsuarioAdministrativo',fotos.single('foto'),function(req,res,next){
  console.log('llego');
  console.log(req.body);
  console.log(req.file);
  UsuariosModelos.ModificaraUsuarioAdministrativo(req,function(resultado){
    console.log('esta retornandoooo',resultado);
    var salida={
      result:true,
    }
    if(resultado===null){
      console.log('entrando a null');
      salida['result']=false;
      res.json(salida)
    }else{
      res.json(salida)
    }
  })
})
router.post('/ModificaraUsuarioPersonal',fotos.single('foto'),function(req,res,next){
  console.log('llego personal');
  console.log(req.body);
  console.log(req.file);
  UsuariosModelos.ModificaraUsuarioPersonal(req,function(resultado){
    UsuariosModelos.ModificaraTablaPersonal(req,function(resultado2){
      // console.log('esta retornandooooUP',resultado);
      // console.log('esta retornandooooTP',resultado2);
      var salida={
        result:true,
      }
      if(resultado===null){
        console.log('entrando a null');
        salida['result']=false;
        res.json(salida)
      }else{
        res.json(salida)
      }
    })
  })
})
router.delete('/eliminar/:tipo',function(req,res,next){
  if (req.params.tipo==='a') {
    UsuariosModelos.EliminarUsuarioA(req,function(resp){
      var salida={
          result:true,
      }
      res.json(salida)
    })
  } else {
    UsuariosModelos.EliminarUsuarioA(req,function(resp){
      var salida={
          result:true,
      }
      res.json(salida)
    })
  }
})
router.post('/habilitar/:tipo',function(req,res,next){
  if (req.params.tipo==='a') {
    UsuariosModelos.HabilitarUsuarioA(req,function(resp){
      var salida={
          result:true,
      }
      res.json(salida)
    })
  } else {
    UsuariosModelos.HabilitarUsuarioA(req,function(resp){
      var salida={
          result:true,
      }
      res.json(salida)
    })
  }
})
router.post('/Ver',function(req,res,next){
  UsuariosModelos.VerDatosUsuarios(req,function(resp){
    UsuariosModelos.VerDatosUsuariosP(req,function(respPer){
      console.log(resp);
      console.log(respPer);
      res.render('MVUsuario',{
        LDATOSUSER:resp,
        LDATOSPER:respPer
      })
    })
  })
})
router.post('/habilitar/:tipo',function(req,res,next){
  UsuariosModelos.CrearCuenta(req,function(resp){
    var salida={
      result:true,
    }
    res.json(salida)
  })
})
router.post('/MACUsuario',function(req,res,next){//modal adicionar  cuenta
  UsuariosModelos.MostrarUsuarioParaAcesso(req,function(respuesta){
    res.render('MACUsuario',{
      USER:respuesta
    })
  })
})
router.post('/Accesso',function(req,res,next){//crear cuenta no esta llegando el
  console.log("11111111111111111111111",req.body.id);
  console.log("11111111111111111111111",req.body.xlogin);
  console.log("11111111111111111111111",req.body.xpassword);
  console.log("11111111111111111111111",req.body.xrepassword);
  UsuariosModelos.CrearCuenta(req,function(respuesta){
    var salida={
      result:true,
    }
    res.json(salida)
  })
})


router.post('/MMCUsuario',function(req,res,next){//modal Modificar  cuenta
  UsuariosModelos.MostrarUsuarioParaAcesso(req,function(respuesta){
    UsuariosModelos.ListarDatosMAcesso(req,function(resp2){
      res.render('MMCUsuario',{
        USER:respuesta,
        UDATOS:resp2
      })
    })
  })
})
router.post('/MAccesso',function(req,res,next){//crear cuenta no esta llegando el
  // console.log("11111111111111111111111",req.body.id);
  // console.log("11111111111111111111111",req.body.xpassword);
  // console.log("11111111111111111111111",req.body.xrepassword);
  var bandera=false;
  var salida={
    result:true,
  }
  if(req.body.xpassword===req.body.xrepassword){
    UsuariosModelos.CambiarCuenta(req,function(respuesta){
      res.json(salida)
    })
  }else {
    salida['result']=bandera;
    res.json(salida)
  }
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
