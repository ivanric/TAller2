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
exports.TotHist=function(callback){
	// var c=0;
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool TotHist', err);
		}
		client.query('select count(*) as tot from historial', function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta TotHist', err);
			}
			done();
			callback(result.rows);
		});
	});
}

exports.GestionHistoriales=function(req,callback){
	// TotHist(function(tot){
		// var tot=parseInt(tot,10);
		// console.log('total historiales ',tot);
		pool.connect(function(err, client, done) {
			if(err) {// si existe un error
				return console.error('ir a buscar error de cliente de la pool', err);
			}

			// console.log('total historiales1 ',tot);
			// client.query("select num,to_char(fecha,'dd/mm/yy') as fecha,antper,consentimiento,login,codpac,estado,2 as Tot from historial ORDER BY num LIMIT $1 OFFSET $2",[req.body.length,req.body.start],function(err, result){
			if (req.body.opcion==-1) {
				client.query("select h.num,p.nombre,p.ap,to_char(h.fecha,'dd/mm/yy') as fecha,h.antper,h.consentimiento,d.login,h.codpac,h.estado from historial h,paciente p,datos d where h.codpac=p.codpac and d.login=h.login and concat(p.nombre,p.ap) LIKE $1 ORDER BY h.num",["%"+req.body.filtro+"%"],function(err, result){
					if(err) {
						return console.error('Error de ejecución de consulta Gestion historiales2', err);
					}
					done();
					callback(result.rows);
				});
			}else{
				// client.query("select h.num,p.nombre,p.ap,to_char(h.fecha,'dd/mm/yy') as fecha,h.antper,h.consentimiento,d.login,h.codpac,h.estado from historial h,paciente p,datos d where h.codpac=p.codpac and d.login=h.login and concat(p.nombre,p.ap) LIKE '"+"%"+req.body.filtro+"%"+"' ORDER BY h.num",function(err, result){
				client.query("select h.num,p.nombre,p.ap,to_char(h.fecha,'dd/mm/yy') as fecha,h.antper,h.consentimiento,d.login,h.codpac,h.estado from historial h,paciente p,datos d where h.codpac=p.codpac and d.login=h.login and concat(p.nombre,p.ap) LIKE $1 and h.estado=$2 ORDER BY h.num",["%"+req.body.filtro+"%",req.body.opcion],function(err, result){
					if(err) {
						return console.error('Error de ejecución de consulta Gestion historiales2', err);
					}
					done();
					callback(result.rows);
				});
			}
		});
		pool.on('error', function (err, client) {
			console.error('idle client error', err.message, err.stack)
		})
	// })
}
exports.lista=function(req,callback){
	// TotHist(function(tot){
		// var tot=parseInt(tot,10);
		// console.log('total historiales ',tot);
		pool.connect(function(err, client, done) {
			if(err) {// si existe un error
				return console.error('ir a buscar error de cliente de la pool', err);
			}

			// console.log('total historiales1 ',tot);
			// client.query("select num,to_char(fecha,'dd/mm/yy') as fecha,antper,consentimiento,login,codpac,estado,2 as Tot from historial ORDER BY num LIMIT $1 OFFSET $2",[req.body.length,req.body.start],function(err, result){
			client.query("select num,to_char(fecha,'dd/mm/yy') as fecha,antper,consentimiento,login,codpac,estado from historial ORDER BY num LIMIT $1 OFFSET $2",[req.body.length,req.body.start],function(err, result){
				if(err) {
					return console.error('Error de ejecución de consulta lista', err);
				}
				done();
				callback(result.rows);
			});
		});
		pool.on('error', function (err, client) {
			console.error('idle client error', err.message, err.stack)
		})
	// })
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
