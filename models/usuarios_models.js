var pg=require('pg');
var bd=require('../bd.js');
var pool=bd();

//var bd_pool=require('../bd_pool.js');lo
//var bd=require('../pool.js');

//var pool=bd_pool.basedatos;
//var pool=bd();

var codusu=function(callback){
	// var c=0;
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('select COALESCE(max(codusu),0)+1 as codusu from usuario', function(err, result) {
			// res.json(result.rows);
			console.log(result.rows[0]);
			// c=result.rows[0];
			if(err) {
				return console.error('Error de ejecución de consulta', err);
			}
			done();
			callback(result.rows[0].codusu);
			// return result.rows[0];
		});
	});
}
var codper=function(callback){
	// var c=0;
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('select COALESCE(max(codper),0)+1 as codper from personal', function(err, result) {
			// res.json(result.rows);
			console.log(result.rows[0]);
			// c=result.rows[0];
			if(err) {
				return console.error('Error de ejecución de consulta', err);
			}
			done();
			callback(result.rows[0].codper);
			// return result.rows[0];
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
		// return c;
	})
}

exports.iniciar_sesion=function(req,callback){
	// pool.query('SELECT * FROM DATOS WHERE(login=$1 and password=$2 and estado=$3) ', [req.body.xlogin,req.body.xpassword,1],function(err,result){
	// 	// console.log(result.rows.toString());
	// 	// if(err) throw err;
	// 	// pool.end(function (err) {
	// 			// if (err) throw err;
	// 	// });
	// 	// JsonR.status="resp";
	// 	JsonR.valor=false;
	// 	console.log("El tam: ",result.rows.length);
	// 	if (result.rows.length!=0) {
	// 		console.log(true);
	// 		JsonR["valor"]=true;
	// 		req.session.usuario = result.rows[0];
	// 		console.log("resplog: ",result.rows[0].login);
	// 	}else {
	// 			// console.log('El usuario no esta en la bd')
	// 		console.log(false)
	// 		JsonR["valor"]=false;
	// 	}
	// 	console.log("el JSon dentro: ",JsonR);
	// 	// res.json(result.rows)
	// 	// console.log("el JSon: ",JsonR);
	// 	res.json(JsonR)
	// })

	pool.connect(function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool identificasion', err);
		}
		client.query('SELECT * FROM DATOS WHERE(login=$1 and password=$2 and estado=1) ', [req.body.xlogin,req.body.xpassword],function(err,result){
			// console.log(result.rows.toString());
			done();
			if(err) {
				return console.error('Error de ejecución de consulta', err);
			}
			callback(result.rows);

		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}

exports.GestionUsuarios=function(callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT u.* from usuario u ORDER BY u.nombre', function(err, result) {
			// res.json(result.rows);
			callback(result.rows)
			// console.log(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta', err);
			}
			done();
		});
	});

	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}

exports.ListarDatos=function(callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente  de datos   pool', err);
		}
		client.query('SELECT d.* from datos d ORDER BY d.codusu', function(err, result) {
			// res.json(result.rows);
			callback(result.rows)
			// console.log(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta datos', err);
			}
			done();
		});
	});

	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}

exports.Personales=function(callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT per.*,u.* from usuario u join personal per on per.codusu=u.codusu ORDER BY u.nombre ASC', function(err, result) {
			// res.json(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta', err);
			}
			done();
			callback(result.rows)
		});
	});

	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.AdicionarUsuarioAdministrativoPersonal=function(req,callback){
	codusu(function(resp){
		var codiguito=parseInt(resp,10);
		console.log("este cod ",codiguito);
		codper(function(resp1){
			var codper=parseInt(resp1,10);
			console.log("este codper ",codper);
			var rollback = function(client, done) {
				client.query('ROLLBACK', function(err) {
					return done(err);
				});
			};
			pool.connect(function(err, client, done) {
				if(err) throw err;
				var telef=0;
				if(req.body.telefono==''){
					// telef=parseInt(req.body.telefono);
					telef=0;
				}else {
					telef=req.body.telefono;
				}
				var foto="";
				if(req.file===undefined){
					foto="usuario.gif"
				}else{
					foto=req.file.originalname;
				}
				var codpost=0;
				if(req.body.codigo==''){
					// telef=parseInt(req.body.telefono);
					codpost=0;
				}else {
					codpost=req.body.codigo;
				}
				client.query('BEGIN', function(err) {
					if(err) return rollback(client, done);
					process.nextTick(function() {
						// var text = 'INSERT INTO account(money) VALUES($1) WHERE id = $2';
						client.query('insert into usuario(codusu,ci,nombre,ap,am,genero,fechnac,direccion,tipo,telefono,correo,foto,observacion) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',[codiguito,req.body.ci,req.body.nombre,req.body.ap,req.body.am,req.body.genero,req.body.fecha,req.body.direccion,req.body.tipo,telef,req.body.correo,foto,req.body.descripcion], function(err) {
							if(err) return rollback(client, done);
							client.query('insert into personal(codper,codpost,ffini,ffin,categoria,sueldo,est,codusu) values($1,$2,$3,$4,$5,$6,$7,$8)',[codper,codpost,req.body.fini,req.body.ffin,req.body.categoria,req.body.sueldo,1,codiguito], function(err) {
								if(err) return rollback(client, done);
								client.query('COMMIT', done);
								callback(true);
							});
						});
					});
				});
			});
		})
	})
}

// exports.AdicionarUsuarioAdministrativo=function(req,callback){
// 	codusu(function(resp){
// 		var codiguito=parseInt(resp,10);
// 		console.log("este cod ",codiguito);
// 		pool.connect(function(err, client, done) {
// 			if(err) {// si existe un error
// 				return console.error('ir a buscar error de cliente de la pool', err);
// 			}
// 			console.log("ahora cod ",codiguito);
// 			console.log("en consulta fotoC:  ",req.file);
// 			// console.log("fechaC ",req.body.fecha=='');
// 			// var f=Date.parse(req.body.fecha)
// 			// var fd=new Date(f);
// 			// console.log("fechaC ",fd);
// 			console.log("telefonoC ",req.body.telefono=='');
// 			var telef=0;
// 			if(req.body.telefono==''){
// 				// telef=parseInt(req.body.telefono);
// 				telef=0;
// 			}else {
// 				telef=req.body.telefono;
// 			}
// 			var foto="";
// 			if(req.file===undefined){
// 				foto="usuario.gif"
// 			}else{
// 				foto=req.file.originalname;
// 			}
// 			client.query('insert into usuario(codusu,ci,nombre,ap,am,genero,fechnac,direccion,tipo,telefono,correo,foto,observacion) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',[codiguito,req.body.ci,req.body.nombre,req.body.ap,req.body.am,req.body.genero,req.body.fecha,req.body.direccion,req.body.tipo,telef,req.body.correo,foto,req.body.descripcion],function(err, result){
// 				if(err) {
// 					return console.error('Error de ejecución de consulta al adicionar usuario Administrativo', err);
// 				}
// 				done();
// 				callback(result.rows,codiguito);
// 			});
// 		});
// 		pool.on('error', function (err, client) {
// 			console.error('idle client error', err.message, err.stack)
// 		})
// 	})
// }
// exports.AdicionarUsuarioPersonal=function(req,codu,callback){
// 	// var codusu=0;
// 	console.log("entrante: ",req.body);
// 	console.log("ahora codusuper ",codusu);
// 	codper(function(resp){
// 		var codper=parseInt(resp,10);
// 		console.log("este cod ",codper);
// 		pool.connect(function(err, client, done) {
// 			if(err) {// si existe un error
// 				return console.error('ir a buscar error de cliente de la pool', err);
// 			}
// 			console.log("ahora cod ",codper);
// 			var codpost=0;
// 			if(req.body.codigo==''){
// 				// telef=parseInt(req.body.telefono);
// 				codpost=0;
// 			}else {
// 				codpost=req.body.codigo;
// 			}
// 			client.query('insert into personal(codpers,codpost,ffini,ffin,categoria,sueldo,est,codusu) values($1,$2,$3,$4,$5,$6,$7,$8)',[codper,codpost,req.body.fini,req.body.ffin,req.body.categoria,req.body.sueldo,1,codu],function(err, result){
// 				if(err) {
// 					return console.error('Error de ejecución de consulta al adicionar personal', err);
// 				}
// 				done();
// 				callback(result.rows);
// 			});
// 		});
// 		pool.on('error', function (err, client) {
// 			console.error('idle client error', err.message, err.stack)
// 		})
// 	})
// }

exports.ModificaraUsuarioAdministrativo=function(req,callback){

		pool.connect(function(err, client, done) {
			if(err) {// si existe un error
				return console.error('ir a buscar error de cliente de la pool', err);
			}
			var telef=0;
			if(req.body.telefono==''){
				// telef=parseInt(req.body.telefono);
				telef=0;
			}else {
				telef=req.body.telefono;
			}
			var fot='';
			if(req.file===undefined){
				fot=req.body.fotoriginal;
			}else{
				fot=req.file.originalname;
			}
			client.query('UPDATE usuario  SET ci=$1,nombre=$2,ap=$3,am=$4,genero=$5,fechnac=$6,direccion=$7,tipo=$8,telefono=$9,correo=$10,foto=$11,observacion=$12 WHERE codusu=$13',[req.body.ci,req.body.nombre,req.body.ap,req.body.am,req.body.genero,req.body.fecha,req.body.direccion,req.body.tipo,telef,req.body.correo,fot,req.body.descripcion,req.body.id],function(err, result){
				if(err) {
					callback(null)
					return console.error('Error de ejecución de consulta al Modificar UA', err);
				}
				done();
				callback(result.rows);
			});
		});
		pool.on('error', function (err, client) {
			console.error('idle client error', err.message, err.stack)
		})

}
exports.ModificaraUsuarioPersonal=function(req,callback){

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
			var telef=0;
			if(req.body.telefono==''){
				// telef=parseInt(req.body.telefono);
				telef=0;
			}else {
				telef=req.body.telefono;
			}
			client.query('UPDATE usuario  SET ci=$1,nombre=$2,ap=$3,am=$4,genero=$5,fechnac=$6,direccion=$7,tipo=$8,telefono=$9,correo=$10,foto=$11,observacion=$12 WHERE codusu=$13',[req.body.ci,req.body.nombre,req.body.ap,req.body.am,req.body.genero,req.body.fecha,req.body.direccion,req.body.tipo,telef,req.body.correo,fot,req.body.descripcion,req.body.id],function(err, result){
				if(err) {
					callback(null)
					return console.error('Error de ejecución de consulta al Modificar UP', err);
				}
				done();
				callback(result.rows);
			});
		});
		pool.on('error', function (err, client) {
			console.error('idle client error', err.message, err.stack)
		})

}


exports.ModificaraTablaPersonal=function(req,callback){
	console.log("TP",req.body);
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
			var codpost=0;
			if(req.body.codpost==''){
				// telef=parseInt(req.body.telefono);
				codpost=0;
			}else {
				codpost=req.body.codpost;
			}
			client.query('UPDATE personal  SET codpost=$1,ffini=$2,ffin=$3,categoria=$4,sueldo=$5  WHERE codusu=$6',[codpost,req.body.ffini,req.body.ffin,req.body.categoria,req.body.sueldo,req.body.id],function(err, result){
				if(err) {
					callback(null)
					return console.error('Error de ejecución de consulta al Modificar TP', err);
				}
				done();
				callback(result.rows);
			});
		});
		pool.on('error', function (err, client) {
			console.error('idle client error', err.message, err.stack)
		})

}
exports.MMADMINModal=function(req,callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT u.* from  usuario u where u.codusu=$1',[req.body.id], function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta MMADMINModal', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}


exports.MMPersonalModal=function(req,callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT p.* from  personal p where p.codusu=$1',[req.body.id], function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta MMPUsuario', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}

exports.EliminarUsuarioA=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('UPDATE usuario  SET estado=0 WHERE codusu=$1',[req.body.id],function(err, result){
			if(err) {
				return console.error('Error de ejecución de consulta al eliminar UA', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.HabilitarUsuarioA=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('UPDATE usuario  SET estado=1 WHERE codusu=$1',[req.body.id],function(err, result){
			if(err) {
				return console.error('Error de ejecución de consulta al habilitar UA', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.VerDatosUsuarios=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		// client.query('SELECT u.*,p.* from usuario u join personal p on u.codusu=p.codusu where u.codusu=$1 ORDER BY u.nombre',[req.body.id], function(err, result) {
		client.query('SELECT u.* from usuario u where u.codusu=$1 ORDER BY u.nombre',[req.body.id], function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.VerDatosUsuariosP=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT p.* from  personal p where p.codusu=$1',[req.body.id], function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.MostrarUsuarioParaAcesso=function(req,callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT u.* from  usuario u where u.codusu=$1',[req.body.id], function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}

exports.CrearCuenta=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente datos accesso de la pool', err);
		}
		console.log("ahora cod ",req.body);
		var codpost=0;
		if(req.body.codigo==''){
			// telef=parseInt(req.body.telefono);
			codpost=0;
		}else {
			codpost=req.body.codigo;
		}
		client.query('insert into datos(login,password,estado,codusu) values($1,$2,$3,$4)',[req.body.xlogin,req.body.xpassword,1,req.body.id],function(err, result){
			if(err) {
				return console.error('Error de ejecución de consulta al adicionar accesso', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.ListarDatosMAcesso=function(req,callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT d.* from  datos d where d.codusu=$1',[req.body.id], function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta listdatos', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}

exports.CambiarCuenta=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente cambiarcuenta accesso de la pool', err);
		}
		console.log("ahora cod ",req.body);
		var codpost=0;
		if(req.body.codigo==''){
			// telef=parseInt(req.body.telefono);
			codpost=0;
		}else {
			codpost=req.body.codigo;
		}
		client.query('UPDATE datos  SET password=$1 WHERE codusu=$2',[req.body.xpassword,req.body.id],function(err, result){
			if(err) {
				return console.error('Error de ejecución de consulta al cambiar accesso', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
