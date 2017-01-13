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
var codcf=function(callback){
	// var c=0;
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('select COALESCE(max(codcf),0)+1 as codcf from consfact', function(err, result) {
			// res.json(result.rows);
			console.log(result.rows[0]);
			// c=result.rows[0];
			if(err) {
				return console.error('Error de ejecución de consulta consfact', err);
			}
			done();
			callback(result.rows[0].codcf);
			// return result.rows[0];
		});
	});
}
var coddiag=function(callback){
	// var c=0;
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('select COALESCE(max(coddiag),0)+1 as coddiag from diagnostico', function(err, result) {
			// res.json(result.rows);
			console.log(result.rows[0]);
			// c=result.rows[0];
			if(err) {
				return console.error('Error de ejecución de consulta cod diagnostico', err);
			}
			done();
			callback(result.rows[0].coddiag);
			// return result.rows[0];
		});
	});
}

exports.GestionConsultas=function(callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("select p.codpac,p.nombre as namepac,p.ap as appac,p.am as ampac,u.codusu,u.nombre,u.ap,u.am,to_char(c.fecha,'dd/MM/yyyy') as fecha_cons,c.codcons,c.precio,c.estado from paciente p,usuario u,consulta c,datos d where p.login=d.login and u.codusu=d.codusu and c.login=d.login and c.codpac=p.codpac ORDER BY namepac ASC", function(err, result) {
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
exports.ListarPacientes=function(req,callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT * from  paciente where estado=1 ORDER BY nombre ASC', function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta lista pac en consultas', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.adicionarConsulta=function(req,usuario,callback){
	codcons(function(resp){
		var codiguito=parseInt(resp,10);
		pool.connect(function(err, client, done) {
			if(err) {// si existe un error
				return console.error('ir a buscar error de cliente de la pool', err);
			}
			console.log("ahora cod ",codiguito);
			var ritresp=0;
			var temp=0;
			var altura=0;
			var peso=0;
			var puls=0;
			if (req.body.ritresp!='') {
				ritresp=req.body.ritresp;
			}
			if (req.body.temp!='') {
				temp=req.body.temp;
			}
			if (req.body.altura!='') {
				altura=req.body.altura;
			}
			if (req.body.peso!='') {
				peso=req.body.peso;
			}
			if (req.body.puls!='') {
				puls=req.body.puls;
			}
			client.query('insert into consulta(codcons,fecha,ritresp,temp,altura,peso,puls,precio,motivo,codpac,login,estado) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',[codiguito,req.body.fecha,ritresp,temp,altura,peso,puls,req.body.precio,req.body.motivo,req.body.codpac,usuario.login,1],function(err, result){
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
exports.ListDiag=function(id,callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT * from  diagnostico where codcons=$1 ORDER BY coddiag ASC',[id],function(err, result) {
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


var MaxcodfCF=function(callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT COALESCE(MAX(codtfact)) as codtfact from consfact', function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta MaxcodfCF', err);
			}
			done();
			callback(result.rows[0].codtfact);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
var MaxcodfF=function(callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT COALESCE(MAX(codtfact)) as codtfact from factura', function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta MaxcodfF', err);
			}
			done();
			callback(result.rows[0].codtfact);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
var NumMaxFC=function(valor,callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT COALESCE(MAX(num_fact)) as num_fact from consfact where (codtfact=$1)',[valor], function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta NumMaxFC', err);
			}
			done();
			callback(result.rows[0].num_fact);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
var NumMaxF=function(valor,callback){//datos de accesso
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT COALESCE(MAX(num_fin)) as num_fin from factura where (codtfact=$1)',[valor], function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta NumMaxF', err);
			}
			done();
			callback(result.rows[0].num_fin);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}

exports.ControlCF=function(req,callback){
	MaxcodfCF(function(respuesta1){
		var codTal=respuesta1;
		// var codConsF=parseInt(respuesta1,10);
		// console.log('Constrol:codConsFact: ',codConsF=='null');
		// console.log('Constrol:codConsFact: ',codConsF=='');
		console.log('Control:codTal: ',codTal);
		if (codTal===null) {
			callback(true)
		} else {
			var codConsF=parseInt(respuesta1,10);
			console.log('codConsF: ',codConsF);
			NumMaxFC(codConsF,function(respuesta2){
				var NumFC=parseInt(respuesta2,10);
				console.log('NumFC: ',NumFC);
				// console.log('codConsF1: ',codConsF);
				NumMaxF(codConsF,function(respuesta3){
					var NumFin=parseInt(respuesta3,10);
					console.log('NumFin: ',NumFin);
					if(NumFC<NumFin){
						console.log('true');
						callback(true)
						// MaxcodfF(function(respuesta4){
						// 	var codF=parseInt(respuesta4,10);
						// 	if(codConsF!=codF){
						// 		callback(true)
						// 	}else{
						// 		callback(false)
						// 	}
						// })
					}else {
						console.log('else');
						MaxcodfF(function(respuesta4){
							var codF=parseInt(respuesta4,10);
							if(codConsF!=codF){
								callback(true)
							}else{
								callback(false)
							}
						})
						// callback(false)
					}
				})
				// NumMaxF()
			})
		}
	})
}
exports.ExisteDiag=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("select MAX(codcons) as codc from diagnostico  where codcons=$1",[req.body.codcons],function(err, result) {
			// res.json(result.rows);
			callback(result.rows)
			// console.log(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta ExisteDiag', err);
			}
			done();
		});
	});

	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.MACFactura=function(req,callback){
	codc=req.body.codcons;
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("select c.codcons,c.precio as p_cons,sum(d.precio) as p_diag from consulta c,diagnostico d  WHERE (d.codcons=c.codcons and c.codcons=$1 and d.codcons=$2) and c.codcons  not in(select t.codcons from tratamiento t where c.codcons=t.codcons) GROUP BY c.precio,c.codcons",[codc,codc],function(err, result) {
			// res.json(result.rows);
			callback(result.rows)
			// console.log(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta MACFactura', err);
			}
			done();
		});
	});

	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.ListaConsDiag=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("select c.codcons,c.precio as p_cons,sum(d.precio) as p_diag from consulta c,diagnostico d  WHERE (d.codcons=c.codcons and c.codcons=$1 and d.codcons=$2) and c.codcons  not in(select t.codcons from tratamiento t where c.codcons=t.codcons) GROUP BY c.precio,c.codcons",[req.body.codcons,req.body.codcons],function(err, result) {
			// res.json(result.rows);
			callback(result.rows)
			// console.log(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta ListaConsDiag', err);
			}
			done();
		});
	});

	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.LFactConsultas=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("SELECT (nombre||' '|| apellidos ) as nombre,nit,to_char(fecha,'yyyy-mm-dd') as fecha,num_fact,estado,importe,saldo,codcons,codtfact from consfact where codcons=$1",[req.body.codcons],function(err, result) {
			// res.json(result.rows);
			callback(result.rows)
			// console.log(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta LFactConsultas', err);
			}
			done();
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
var num_fact=function(valor,callback){//datos de accesso
	var codf=parseInt(valor,10);
	console.log('codf: ',codf);
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT COALESCE(MAX(num_fact)) as num_fact from consfact where (codtfact=$1)',[codf], function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta num_fact', err);
			}
			done();
			callback(result.rows[0].num_fact);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
var NumIni=function(valor,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('SELECT num_ini from factura where (codtfact=$1)',[valor], function(err, result) {
			if(err) {
				return console.error('Error de ejecución de consulta NumIni', err);
			}
			done();
			callback(result.rows[0].num_ini);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.adicionarFactura=function(req,callback){
	MaxcodfF(function(resp){
		var codtfact=parseInt(resp,10);
		console.log('codtfact: ',codtfact);
		num_fact(codtfact,function(resp1){
			console.log('num_fact: ',resp1===null);
			var num_fact=parseInt(resp1,10)+1;
			if(resp1===null){
				console.log('entro true');
				NumIni(codtfact,function(respuesta){
					var num_ini=parseInt(respuesta,10);
					console.log('true.entro: ',respuesta);
					var numf=num_ini
					codcf(function(resultado){
						var codcf=parseInt(resultado,10);
						pool.connect(function(err, client, done) {
							if(err) {// si existe un error
								return console.error('ir a buscar error de cliente de la pool', err);
							}
							console.log("ahora cod ",codtfact);

							client.query('insert into consfact(nombre,apellidos,nit,fecha,num_fact,estado,importe,saldo,codcons,codtfact,codcf) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',[req.body.nombre,req.body.apellidos,req.body.nit,req.body.fecha,numf,req.body.estado,req.body.importe,req.body.saldo,req.body.codcons,codtfact,codcf],function(err, result){
								if(err) {
									return console.error('Error de ejecución de consulta al adicionar facturaC', err);
								}
								done();
								callback(result.rows);
							});
						});
						pool.on('error', function (err, client) {
							console.error('idle client error', err.message, err.stack)
						})
					})
				})
			}else {
				console.log('entro false');
				var numf=num_fact
				codcf(function(resultado){
					var codcf=parseInt(resultado,10);
					pool.connect(function(err, client, done) {
						if(err) {// si existe un error
							return console.error('ir a buscar error de cliente de la pool', err);
						}
						console.log("ahora cod ",codtfact);

						client.query('insert into consfact(nombre,apellidos,nit,fecha,num_fact,estado,importe,saldo,codcons,codtfact,codcf) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',[req.body.nombre,req.body.apellidos,req.body.nit,req.body.fecha,numf,req.body.estado,req.body.importe,req.body.saldo,req.body.codcons,codtfact,codcf],function(err, result){
							if(err) {
								return console.error('Error de ejecución de consulta al adicionar facturaC', err);
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
			console.log('numf: ',numf);


		})
	})
}
