var $dt_user = $('#table-usuarios').DataTable({
      //- $('#table-usuarios').DataTable(
  "oLanguage": {
  "sUrl": "../javascripts/DataTable/Spanish.lang"
  },
  "dom":'rt<button>ip',
  // "ordering":false,
  "pageLength":5,
  "ajax":{
    'url':'/ListarUsuarios',
    'type':'post',
    //- 'dataType':'json',
    'data':function(d){
      console.log('el jsonn es',d);
    }
  },
  "columns":[
    {"data":"codusu"},
    {"data":"codusu"},
    {"data":"codusu"},
    {"data":"estado"},
    {"data":"codusu"},
    {"data":"codusu"},
    {"data":"codusu"},
    {"data":"codusu"},
    {"data":"codusu"},
  ],
  "createdRow":function(row,data,dataIndex){
    $('td',row).eq(0).html(data.codUsu)
  }

});
