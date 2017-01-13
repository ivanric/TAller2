var pg=require('pg');
var bd=require('../bd.js');
var pool=bd();


var codcons=function(callback){
	// var c=0;
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('select COALESCE(max(codcons),0)+1 as codcons from consulta', function(err, result) {
			// res.json(result.rows);
			console.log(result.rows[0]);
			// c=result.rows[0];
			if(err) {
				return console.error('Error de ejecución de consulta', err);
			}
			done();
			callback(result.rows[0].codcons);
			// return result.rows[0];
		});
	});
}
var codRev=function(callback){
	// var c=0;
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('select COALESCE(max(codrev),0)+1 as codrev from revision', function(err, result) {
			// res.json(result.rows);
			console.log(result.rows[0]);
			// c=result.rows[0];
			if(err) {
				return console.error('Error de ejecución de consulta', err);
			}
			done();
			callback(result.rows[0].codrev);
			// return result.rows[0];
		});
	});
}
var codtrat=function(callback){
	// var c=0;
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('select COALESCE(max(codtrat),0)+1 as codtrat from tratamiento', function(err, result) {
			// res.json(result.rows);
			console.log(result.rows[0]);
			// c=result.rows[0];
			if(err) {
				return console.error('Error de ejecución de consulta codtrat', err);
			}
			done();
			callback(result.rows[0].codtrat);
			// return result.rows[0];
		});
	});
}

exports.GestionTratamientos1=function(callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("select t.codtrat,t.codserv,p.codpac,p.nombre as namepac,p.ap as appac,p.am as ampac,u.codusu,s.nombre as nameserv,u.nombre,u.ap,u.am,to_char(c.fecha,'dd/MM/yyyy') as fecha_cons,c.codcons,c.precio,c.estado from paciente p,usuario u,consulta c,datos d,tratamiento t,servicio s where p.login=d.login and u.codusu=d.codusu and c.login=d.login and c.codpac=p.codpac and t.codcons=c.codcons and t.codserv=s.codserv ORDER BY namepac ASC", function(err, result) {
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
exports.GestionTratamientos2=function(callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("select s.*,t.* from servicio s join tratamiento t on t.codserv=s.codserv", function(err, result) {
			// res.json(result.rows);
			callback(result.rows)
			// console.log(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta Gestion tratamientos2', err);
			}
			done();
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.ListarPacientes=function(req,callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		// client.query('SELECT p.codpac,p.nombre,p.ap,p.am,c.codcons from  paciente p ,consulta c where p.estado=1  and c.codcons=(select MAX(codcons) from consulta) ORDER BY p.nombre ASC', function(err, result) {
		client.query('SELECT p.codpac,p.nombre,p.ap,p.am,MAX(c.codcons) as codc from  paciente p join consulta c on p.estado=1 and c.codpac=p.codpac GROUP BY p.codpac ORDER BY p.nombre ASC', function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta lista pac en tratamientos', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.ListarServicios=function(req,callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT * from  servicio where estado=1 ORDER BY nombre ASC', function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta lista serv en tratamientos', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.adicionarRevision=function(req,usuario,callback){
	codRev(function(resp){
		var codiguito=parseInt(resp,10);
		pool.connect(function(err, client, done) {
			if(err) {// si existe un error
				return console.error('ir a buscar error de cliente de la pool', err);
			}
			console.log("ahora cod ",codiguito);
			client.query('insert into revision(codrev,fecha,descripcion,codtrat) values($1,$2,$3,$4)',[codiguito,req.body.fecha,req.body.descripcion,req.body.codt],function(err, result){
				if(err) {
					return console.error('Error de ejecución de consulta al adicionar revision', err);
				}
				done();
				callback(result.rows);
			});
		});
		pool.on('error', function (err, client) {
			console.error('idle client error', err.message, err.stack)
		})
	})
}
exports.ListRev=function(id,callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("SELECT codrev,to_char(fecha,'dd/mm/yy') as fech,descripcion,codtrat from  revision where codtrat=$1 ORDER BY codrev ASC",[id],function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta lista diagnostico consulta', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.adicionarDiagnostico=function(req,callback){
	coddiag(function(resp){
		var codiguito=parseInt(resp,10);
		pool.connect(function(err, client, done) {
			if(err) {// si existe un error
				return console.error('ir a buscar error de cliente de la pool', err);
			}
			console.log("ahora cod ",codiguito);

			client.query('insert into diagnostico(coddiag,precio,descripcion,codcons) values($1,$2,$3,$4)',[codiguito,req.body.precio,req.body.descripcion,req.body.codcons],function(err, result){
				if(err) {
					return console.error('Error de ejecución de consulta al adicionar diagnostico consulta', err);
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

exports.ListaConsPrecio=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("select c.codcons,c.precio as p_cons from consulta c WHERE (c.codcons=$1)  GROUP BY c.precio,c.codcons",[req.body.codcons],function(err, result) {
			// res.json(result.rows);
			callback(result.rows)
			// console.log(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta ListaConsPrecio', err);
			}
			done();
		});
	});

	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.PrecioDiagnostico=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("select sum(d.precio) as p_diag from diagnostico d WHERE (d.codcons=$1)  ",[req.body.codcons],function(err, result) {
			// res.json(result.rows);
			callback(result.rows)
			// console.log(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta PrecioDiagnostico', err);
			}
			done();
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.ServicioTratamiento=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("select s.nombre,s.precio as p_serv,t.codserv from tratamiento t,servicio s  WHERE (t.codserv=s.codserv and t.codcons=$1)",[req.body.codcons],function(err, result) {
			// res.json(result.rows);
			callback(result.rows)
			// console.log(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta PrecioDiagnostico', err);
			}
			done();
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
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
