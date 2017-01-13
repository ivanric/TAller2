var Sequelize=require('sequelize');
var coneccion=new Sequelize("pru","postgres","postgres",{
// var coneccion=new Sequelize("NOMBRE_BASE","USUARIO","CONTRASEÑA",{
  host: 'localhost',
  dialect: 'postgres',
  // pool: {
  //   max: 5,
  //   min: 0,
  //   idle: 10000
  // },
  define:{
    //las columnas de la tabla no se veran
    timestamps:false,
    //deshabilita la convencion por default para el nombre de las tablas
    freezeTableName:true
  }
  // ,
  // storage:__dirname + "/database.db", //solo para sqlite para guardar su backup
}); //creando un objeto de tipo Sequelize()


//Probar la conexión
coneccion.authenticate()
.then(function(err) {
  console.log('Connection terminada.');
})
.catch(function (err) {
  console.log('no se conecto con la base de usuario:', err);
});
console.log('conectado...');



// -----------------Definiendo objetos
// var arch=coneccion.define("paciente",{
//   // ida:{//primer nombre de la columna
//   //   type:Sequelize.INTEGER,//el tipo de usuario (debe estar en mayusculas)
//   //   primarykey:true,//es la llave principal
//   //   // autoIncrement:true
//   // },
//   nombre:Sequelize.TEXT,
//   ap:Sequelize.TEXT
// }
// // ,{
// //   //este objeto se asocia con  la tabla de la base de usuario
// //   tableName:"archivo"
// // }
// );

var arch=coneccion.define("archivo",{
  // id:{//primer nombre de la columna
  //   type:Sequelize.INTEGER,//el tipo de usuario (debe estar en mayusculas)
  //   primarykey:true,//es la llave principal
  //   // autoIncrement:true
  // },
  nombre:Sequelize.TEXT,
  ap:Sequelize.TEXT
}
// ,{
//   timestamps:false
// }
// ,{
//   //este objeto se asocia con  la tabla de la base de usuario
//   tableName:"archivo"
// }
);
module.exports.pruebilla="Una pequeña pruebaaa";
module.exports.coneccion=coneccion;
module.exports.ARC=arch;
