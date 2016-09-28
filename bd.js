var pg=require('pg');

	var config = {
	  user: 'postgres', //env var: PGUSER
	  database: 'TallerII', //env var: PGDATABASE
	  password: 'postgres', //env var: PGPASSWORD
	  host: 'localhost', // Server hosting the postgres database
	  port: 5432, //env var: PGPORT
	  max: 10, // número máximo de clientes en la pool
	  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
	};

	 // esto inicializa un conjunto de conexiones
	 // que se mantendrá abierta las conexiones inactivas durante 30 segundos
	 // y establecer un límite de 10 clientes de inactividad máximo
	 //pol es un conjunto de clientes

	var pool = new pg.Pool(config);

	// Para ejecutar una consulta podemos adquirir un cliente de la pool,
	 // Ejecutar una consulta en el cliente y, a continuación, devolver al cliente a la pool
	// pool.connect(function(err, client, done) {
	//   if(err) {// si existe un error
	//     return console.error('ir a buscar error de cliente de la pool', err);
	//   }
	//   client.query('SELECT * FROM DATOS', function(err, result) {
	//     // llama  (done()) `hecho ()` para liberar al cliente de vuelta a la pool
	//     done();

	//     if(err) {
	//       return console.error('Error de ejecución de consulta', err);
	//     }
	//     console.log(result.rows);//nostrando datos por consola
	//     //output: 1

	//   });
	// });

	// pool.on('error', function (err, client) {
	// // Si un error se encuentra por un cliente mientras se encuentra inactivo en la pool
	//    // La pool en sí emitirá un evento de error tanto con el error y
	//    // El cliente que emitió el error original
	//    // Esto es un acontecimiento raro, pero puede suceder si hay una partición de red
	//    // Entre la aplicación y la base de datos, se reinicia la base de datos, etc.
	//    // Y así que sería bueno para manejar la situación y al menos ingrese a cabo
	//   console.error('idle client error', err.message, err.stack)
	// })


//basedatos es una variable que exporta una funcion
module.exports.basedatos=pool;
