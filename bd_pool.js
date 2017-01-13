var pg=require('pg');

	var config = {
	  user: 'postgres', //env var: PGUSER
	  database: 'TallerII', //env var: PGDATABASE
	  password: 'postgres', //env var: PGPASSWORD
	  host: 'localhost', // Server hosting the postgres database
	  port: 5432, //env var: PGPORT
	  max: 100, // número máximo de clientes en la pool
	  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
	};

	 // esto inicializa un conjunto de conexiones
	 // que se mantendrá abierta las conexiones inactivas durante 30 segundos
	 // y establecer un límite de 10 clientes de inactividad máximo
	 //pol es un conjunto de clientes

	var pool = new pg.Pool(config);


//basedatos es una variable que exporta una funcion
module.exports.basedatos=pool;
