﻿var Pool=require('pg').Pool;

	var pool =new Pool({
	  user: 'postgres', //env var: PGUSER
	  password: 'postgres', //env var: PGPASSWORD
	  host: 'localhost', // Server hosting the postgres database
	  database: 'TallerII', //env var: PGDATABASE
	  // port: 5432, //env var: PGPORT
	  max: 10, // número máximo de clientes en la pool
	  idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
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

	// module.exports=function(){
	// 	return pool;
	// }
	//var pg = require(__dirname + '/lib');
// basedatos es una variable que exporta una funcion
module.exports.basedatos=pool;
