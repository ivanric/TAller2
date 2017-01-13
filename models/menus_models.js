var pg=require('pg');
var bd=require('../bd.js');
var pool=bd();


exports.menus=function(callback){
  pool.connect(function(err, client, done) {
    if(err) {// si existe un error
      return console.error('ir a buscar error de cliente de la pool', err);
    }
    client.query('select * from menu ORDER BY codm ASC', function(err, result) {
      callback(result.rows)
      if(err) {
        return console.error('Error de ejecución de consulta', err);
      }
      done();
      console.log(result.rows);//nostrando datos por consola
      // var valor=result.rows;
      //output: 1
    });
  });
  pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack)
  })
}
