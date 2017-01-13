var pg=require('pg');
var bd=require('../bd.js');
var pool=bd();


var codpac=function(callback){
	// var c=0;
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('select COALESCE(max(codpac),0)+1 as codpac from paciente', function(err, result) {
			// res.json(result.rows);
			console.log(result.rows[0]);
			// c=result.rows[0];
			if(err) {
				return console.error('Error de ejecución de consulta', err);
			}
			done();
			callback(result.rows[0].codpac);
			// return result.rows[0];
		});
	});
}

exports.GestionPacientes=function(callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query("select codpac,nombre,ap,am,grpsan,to_char(fechnac,'dd/MM/yyyy') as fecha_nacimiento,estado from paciente ORDER BY nombre", function(err, result) {
			// res.json(result.rows);
			callback(result.rows)
			// console.log(result.rows);
			if(err) {
				return console.error('Error de ejecución de consulta Gestion Pacientes', err);
			}
			done();
		});
	});

	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
exports.adicionarPaciente=function(req,usuario,callback){
	codpac(function(resp){
		var codiguito=parseInt(resp,10);
		pool.connect(function(err, client, done) {
			if(err) {// si existe un error
				return console.error('ir a buscar error de cliente de la pool', err);
			}
			console.log("ahora cod ",codiguito);
			console.log("telefonoC ",req.body.telefono=='');
			var npol=0,nseg=0,cpost=0,telef=0;
			if(req.body.telefono!=''){
				telef=req.body.telefono;
			}
			if (req.body.numpol!='') {
				npol=req.body.numpol;
			}
			if(req.body.numseg!=''){
				nseg=req.body.numseg;
			}
			if (req.body.codpos!='') {
				cpost=req.body.codpos;
			}
			client.query('insert into paciente(codpac,ci,nombre,ap,am,genero,fechnac,edad,numpol,numseg,grpsan,direccion,localidad,provincia,codpost,telefono,correo,observacion,estado,login) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)',[codiguito,req.body.ci,req.body.nombre,req.body.ap,req.body.am,req.body.genero,req.body.fechnac,req.body.edad,npol,nseg,req.body.grpsan,req.body.direccion,req.body.localidad,req.body.provincia,cpost,telef,req.body.correo,req.body.observacion,1,usuario.login],function(err, result){
				if(err) {
					return console.error('Error de ejecución de consulta al adicionar paciente', err);
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


exports.Eliminar=function(req,callback){
	pool.connect(function(err, client, done) {
		if(err) {// si existe un error
			return console.error('ir a buscar error de cliente de la pool', err);
		}
		client.query('UPDATE paciente  SET estado=0 WHERE codpac=$1',[req.body.id],function(err, result){
			if(err) {
				return console.error('Error de ejecución  al eliminar Paciente', err);
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
		client.query('UPDATE paciente  SET estado=1 WHERE codpac=$1',[req.body.id],function(err, result){
			if(err) {
				return console.error('Error de ejecución de consulta al habilitar Paciente', err);
			}
			done();
			callback(result.rows);
		});
	});
	pool.on('error', function (err, client) {
		console.error('idle client error', err.message, err.stack)
	})
}
