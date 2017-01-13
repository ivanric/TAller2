var pg=require('pg');
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'Taller2', //env var: PGDATABASE
  password: 'postgres', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
module.exports=function(){
	var db=new pg.Pool(config);
	// db.connect();
	return db;
}
// module.exports.basedatos=pool;
