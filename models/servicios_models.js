var pg=require('pg');
var bd=require('../bd.js');
var pool=bd();


var codserv=function(callback){
	// var c=0;
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('select COALESCE(max(codserv),0)+1 as codserv from servicio', function(err, result) {
			// res.json(result.rows);
			console.log(result.rows[0]);
			// c=result.rows[0];
			if(err) {
				return console.error('Error de ejecución de consulta', err);
			}
			done();
			callback(result.rows[0].codserv);
			// return result.rows[0];
		});
	});
}

exports.GestionServicios=function(callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("select * from servicio ORDER BY nombre", function(err, result) {
			// res.json(result.rows);
			callback(result.rows)
			// console.log(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta Gestion Servicios', err);
			}
			done();
		});
	});

	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.adicionarServicio=function(req,callback){
	codserv(function(resp){
		var codiguito=parseInt(resp,10);
		pool.connect(function(err, client, done) {
			if(err) {// si existe un error
				return console.error('ir a buscar error de cliente de la pool', err);
			}
			console.log("ahora cod ",codiguito);

			client.query('insert into servicio(codserv,nombre,precio,descripcion,estado) values($1,$2,$3,$4,$5)',[codiguito,req.body.nombre,req.body.precio,req.body.descripcion,1],function(err, result){
				if(err) {
					return console.error('Error de ejecución de consulta al adicionar servicio', err);
				}
				done();
				callback(result.rows,codiguito);
			});
		});
		pool.on('error', function (err, client) {
			console.error('idle client error', err.message, err.stack)
		})
	})
}

exports.MMServicio=function(req,callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT s.* from  servicio s where s.codserv=$1',[req.body.id], function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta MMServicio', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}

exports.ModificarServicio=function(req,callback){

		pool.connect(function(err, client, done) {
			if(err) {// si existe un error
				return console.error('ir a buscar error de cliente de la pool', err);
			}
			var fot='';
			if(req.file===undefined){
				fot=req.body.fotoriginal;
			}else{
				fot=req.file.originalname;
			}
			client.query('UPDATE servicio  SET nombre=$1,precio=$2,descripcion=$3  WHERE codserv=$4',[req.body.nombre,req.body.precio,req.body.descripcion,req.body.id],function(err, result){
				if(err) {
					callback(null)
					return console.error('Error de ejecución de consulta al Modificar Servicio', err);
				}
				done();
				callback(result.rows);
			});
		});
		pool.on('error', function (err, client) {
			console.error('idle client error', err.message, err.stack)
		})

}
exports.Eliminar=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('UPDATE servicio  SET estado=0 WHERE codserv=$1',[req.body.id],function(err, result){
			if(err) {
				return console.error('Error de ejecución  al eliminar Servicio', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.Habilitar=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('UPDATE servicio  SET estado=1 WHERE codserv=$1',[req.body.id],function(err, result){
			if(err) {
				return console.error('Error de ejecución de consulta al habilitar Servicio', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
