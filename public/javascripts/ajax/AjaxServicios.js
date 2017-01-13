// $(document).ready(function(){
  var Servicios={//objeto
    adicionar:function(){//funcion o propiedad del objeto
      // alert('llegue adicionar')
      $.ajax({
        url:'/Servicios/MAServicio',
        type:'post',
        success:function(resp){

          $('#contendor-modales').html(resp);
            $('#MAServ').modal('show');
            $('#FAServ').formValidation({
            }).on('success.form.fv', function(e){
              e.preventDefault();
              addServ();
            })
        },
        error:function(){
          console.log('no respondio el servidor al modal MAAUsuario');
        }
      })
      function addServ(){
        if(confirm('Seguro de adionar Servicio??')){
          $('#FAServ').ajaxSubmit({
            dataType:'json',
            success:function(res){
              if(res.result==true){
                alert('Servicio Registrado exitosamente')
                $.ajax({
                  url:'/Servicios/Gestion',
                  type:'post',
                  success:function(gu){
                    $('#contendor').html(gu);
                  },
                  error:function(){
                    alert('error de servidor')
                  }
                })
                $('#MAServ').modal('hide');
              }
            },
            error:function(){
              alert('error no se adiciono usario')
            }
          })
        }
      }
    },
    modificar:function(etiqueta){
      var id=$(etiqueta).data('id');
      $.ajax({
        url: '/Servicios/MMServicio',//traeme el modal de acuerdo al tipo de personal
        type: 'POST',
        data: {
          id: id
        },
        success:function(resp){
          $('#contendor-modales').html(resp)
          $('#MMServ').modal('show');
          $('#FMServ').formValidation({
          }).on('success.form.fv', function(e){
            e.preventDefault();
            modServ();
          });
        },
        error:function(err){
          alert('Error en el servidor')
        }
      })
      function modServ(){
        // alert('modificarr')
        if(confirm('Seguro de modificar Servicio??')){
          $('#FMServ').ajaxSubmit({
            dataType:'json',
            data:{
              id:id
            },
            success:function(resp){
              // alert(resp)
              if(resp.result==true){
                // console.log('se modifico correctamente al usuario');
                alert('Servicio modificado exitosamente');
                $.ajax({
                  url:'/Servicios/Gestion',
                  type:'post',
                  success:function(gu){
                    $('#contendor').html(gu);
                  },
                  error:function(){
                    alert('error de servidor')
                  }
                })
                $('#MMServ').modal('hide');
              }else {
                console.log('respuesta del servidor fallido');
              }
            },
            error:function(){
              alert('erro de servidor sin respuesta')
            }

          })
        }
      }
    },
    eliminar:function(etiqueta){
      var id=$(etiqueta).data('id');
      var ruta="/Servicios/eliminar";
      console.log(id);
      if (confirm('¿ Esta seguro de eliminar Servicio?')) {
        $.ajax({
          url:ruta,
          type:'DELETE',
          data:{
              id:id
          },
          success:function(res){
            // alert(res);
            if(res.result==true){
              alert('Servicio eliminado exitosamente')
              $.ajax({
                url:'/Servicios/Gestion',
                type:'post',
                success:function(gu){
                  $('#contendor').html(gu);
                },
                error:function(){
                  alert('error de servidor')
                }
              })
            }
          },
          error:function(){
            alert('error al eliminar Usuario')
          }
        })
      }
    },
    habilitar:function(etiqueta){
      // alert('eliminar llego')
      var id=$(etiqueta).data('id');
      var ruta="/Servicios/habilitar";
      console.log(id);
      if (confirm('¿Esta seguro de habilitar Servicio?')) {
        $.ajax({
          url:ruta,
          type:'post',
          data:{
              id:id
          },
          success:function(res){
            // alert(res);
            if(res.result==true){
              alert('Servicio habilitado exitosamente')
              $.ajax({
                url:'/Servicios/Gestion',
                type:'post',
                success:function(gu){
                  $('#contendor').html(gu);
                },
                error:function(){
                  alert('error de servidor')
                }
              })
            }
          },
          error:function(){
            alert('error al eliminar Usuario')
          }
        })
      }
    }
  }
// })
