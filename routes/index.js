var express = require('express');
var router = express.Router();//declarando un objeto router para ser mandado a la app
var pg=require('pg');
var bd=require('../bd.js');
var session= require('express-session');

var pool=bd.basedatos;
/* GET home page. */
router.get('/index', function(req, res, next) {//Empieza con la Ruta index
	// Para ejecutar una consulta podemos adquirir un cliente de la pool,
	 // Ejecutar una consulta en el cliente y, a continuación, devolver al cliente a la pool
	pool.connect(function(err, client, done) {
	  if(err) {// si existe un error
	    return console.error('ir a buscar error de cliente de la pool', err);
	  }
	  client.query('SELECT * FROM DATOS', function(err, result) {
	    // llama  (done()) `hecho ()` para liberar al cliente de vuelta a la pool
	    // res.render('index',{ date: 'Vineee del Servidor jajajajaja'});
	    res.render('index',{
	    	date: result.rows[0],
	    	title:"Express"
	    });

	    if(err) {
	      return console.error('Error de ejecución de consulta', err);
	    }
	    done();

	    console.log(result.rows[0]);//nostrando datos por consola
	    // var valor=result.rows;
	    //output: 1
	  });
	    // res.render('index',{ title:'titulo'});
	});

	pool.on('error', function (err, client) {
	// Si un error se encuentra por un cliente mientras se encuentra inactivo en la pool
	   // La pool en sí emitirá un evento de error tanto con el error y
	   // El cliente que emitió el error original
	   // Esto es un acontecimiento raro, pero puede suceder si hay una partición de red
	   // Entre la aplicación y la base de datos, se reinicia la base de datos, etc.
	   // Y así que sería bueno para manejar la situación y al menos ingrese a cabo
	  console.error('idle client error', err.message, err.stack)
	})
  // res.render('index', { title: 'Express' }); //se renderiza la plantilla
});//se pasa el nombre de la plantilla

router.post('/modalLogeo', function(req, res, next) {//aui se le asigna las rutas
  console.log(req.body.er);
  // alert('servidor'+req.body.er)
  // res.render('ModalLogueo', { title: 'Express' }); //se renderiza la plantilla
  res.render('ModalLogueo'); //se renderiza la plantilla
});//se pasa el nombre de la plantilla

router.post('/Usuario/identificasion', function(req, res, next) {//aui se le asigna las rutas
  console.log(req.body.xlogin,'tb',req.body.xpassword);
			pool.connect(function(err, client, done) {
		  if(err) {
		    return console.error('error fetching client from pool', err);
		  }
		  client.query('SELECT * FROM DATOS WHERE(login=$1 and password=$2 and estado=1) ', [req.body.xlogin,req.body.xpassword],function(err,result){
				// console.log(result.rows.toString());
				var JsonR= new Object();
				JsonR.status="resp";
				JsonR.valor=false;
				if (result.rows.length!=0) {
					// var ob=new Object();
					// ob=result.rows
					// console.log('esteobjeto',ob);
					// for (var i = 0; i < result.rows.length; i++) {
					// 	console.log('Eltamaño: '+result.rows.length)
					// 	console.log(result.rows[i])
					// }
					// console.log('EL usuario esta en la bd');
					console.log(true);
					JsonR["valor"]=true;
					req.session.usuario = result.rows[0];
					console.log(result.rows[0].login);
 				} else {
					// console.log('El usuario no esta en la bd')
					console.log(false)
					JsonR["valor"]=false;
				}
				// res.json(result.rows)
				console.log(JsonR);
				res.json(JsonR)
			});
		});
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
		pool.connect(function(err, client, done) {
			if(err) {// si existe un error
				return console.error('ir a buscar error de cliente de la pool', err);
			}
			client.query('select * from menu', function(err, result) {

				res.render('inicio',{
					menus: result.rows
				});
				if(err) {
					return console.error('Error de ejecución de consulta', err);
				}
				done();
				console.log(result.rows);//nostrando datos por consola
				// var valor=result.rows;
				//output: 1
			});
		});
		pool.on('error', function (err, client) {
			console.error('idle client error', err.message, err.stack)
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
