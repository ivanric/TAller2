var express = require('express');
var router = express.Router();//declarando un objeto router para ser mandado a la app
var pg=require('pg');
var bd=require('../bd.js');
// var bd_pool=require('../bd_pool.js');lo
// var bd=require('../pool.js');
var session= require('express-session');
var pool=bd();
// var pool=bd_pool.basedatos;
// var pool=bd();

var UsuariosModelos=require('../models/usuarios_models.js')
var MenusModelos=require('../models/menus_models.js')


/* GET home page. */
router.get('/index', function(req, res, next) {//Empieza con la Ruta index
	// Para ejecutar una consulta podemos adquirir un cliente de la pool,
	 // Ejecutar una consulta en el cliente y, a continuación, devolver al cliente a la pool
	 res.render('index')
});//se pasa el nombre de la plantilla

router.post('/modalLogeo', function(req, res, next) {//aui se le asigna las rutas
  console.log(req.body.er);//1111
  // alert('servidor'+req.body.er)
  // res.render('ModalLogueo', { title: 'Express' }); //se renderiza la plantilla
  res.render('ModalLogueo'); //se renderiza la plantilla
});//se pasa el nombre de la plantilla

router.post('/identificasion', function(req, res, next) {//aui se le asigna las rutas
  console.log(req.body.xlogin,'tb',req.body.xpassword);
		var JsonR= new Object();
		JsonR.status="resp";
		JsonR.valor=false;
		UsuariosModelos.iniciar_sesion(req,function(resultado){
			console.log("El resultado modelo: ",resultado);
			var JsonR= new Object();
  		JsonR.status="resp";
  		JsonR.valor=false;
  		if (resultado.length!=0) {
  			console.log(true);
  			JsonR["valor"]=true;
  			req.session.usuario = resultado[0];
  			console.log(resultado[0].login);
			} else {
  			// console.log('El usuario no esta en la bd')
  			console.log(false)
  			JsonR["valor"]=false;
  		}
  		// res.json(result.rows)
  		console.log(JsonR);
  		res.json(JsonR)
		})
  // res.render('ModalLogueo');
});

router.all('/inicio', function(req, res, next) {//aui se le asigna las rutas
	if (req.session.usuario!=null) {
		console.log('La sesion tiene un id:',req.session.usuario);
		var obj=req.session.usuario;
		console.log(obj.login);
		console.log(obj.password);
		console.log(obj.estado);
		console.log(obj.codusu);
		console.log("Entre como inicio");
		MenusModelos.menus(function(result){
			res.render('inicio',{
				menus: result
			});
		})
	} else {
		res.redirect('/index')
	}
});

router.all('/salir',function(req,res,next){
	 req.session.usuario=null;
	 res.redirect('/index')
})

module.exports = router;// se exporta el router a la app y se captura en app.use(router)
