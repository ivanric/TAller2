// $(document).ready(function(){
  var Pacientes={//objeto
    adicionar:function(){//funcion o propiedad del objeto
      // alert('llegue adicionar')
      $.ajax({
        url:'/Pacientes/MAPaciente',
        type:'post',
        success:function(resp){

          $('#contendor-modales').html(resp);
            $('#MAPac').modal('show');
            $('#FAPac').formValidation({
            }).on('success.form.fv', function(e){
              e.preventDefault();
              addPac();
            })
        },
        error:function(){
          console.log('no respondio el servidor al modal MAAUsuario');
        }
      })
      function addPac(){
        if(confirm('Seguro de adionar Paciente??')){
          $('#FAPac').ajaxSubmit({
            dataType:'json',
            success:function(res){
              if(res.result==true){
                alert('Paciente registrado exitosamente')
                $.ajax({
                  url:'/Pacientes/Gestion',
                  type:'post',
                  success:function(gu){
                    $('#contendor').html(gu);
                  },
                  error:function(){
                    alert('error de servidor')
                  }
                })
                $('#MAPac').modal('hide');
              }
            },
            error:function(){
              alert('error no se adiciono Paciente')
            }
          })
        }
      }
    },
    modificar:function(etiqueta){
      var tipo=$(etiqueta).attr('accesskey');
      var id=$(etiqueta).data('id');
      if (tipo=='a') {
        $.ajax({
          url: '/Usuarios/MMAUsuario',//traeme el modal de acuerdo al tipo de personal
          type: 'POST',
          // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
          data: {
            id: id,
            tipo:tipo
          },
          success:function(resp){
            $('#contendor-modales').html(resp)
            $('#caja_fecha_modificada').remove();
            $('#MMUA').modal('show')
            // $('#btn-UserM').on('click',function(){
            // })
            $('#FMUA').formValidation({
            }).on('success.form.fv', function(e){
              e.preventDefault();
              // $('#fecha_nac').val('')
              // alert('date');

              modPaciente();

            });
          },
          error:function(err){
            alert('Error en el servidor')
          }
        })
        function modPaciente(){
          // alert('modificarr')
          if(confirm('Seguro de modificar Paciente')){
            $('#FMUA').ajaxSubmit({
            dataType:'json',
            data:{
              id:id,
              tipo:tipo
            },
            success:function(resp){
              // alert(resp)
              if(resp.result==true){
                // console.log('se modifico correctamente al usuario');
                alert('Paciente modificado exitosamente');
                $.ajax({
                  url:'/Usuarios/Gestion',
                  type:'post',
                  success:function(gu){
                    $('#contendor').html(gu);
                  },
                  error:function(){
                    alert('error de servidor')
                  }
                })
                $('#MMUA').modal('hide');
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

      } else {
        $.ajax({
          url: '/Usuarios/MMPUsuario',//traeme el modal de acuerdo al tipo de personal
          type: 'POST',
          // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
          data: {
            id: id,
            tipo:tipo
          },
          success:function(resp){
            $('#contendor-modales').html(resp)
            $('#MMUP').modal('show')
            $('#FMUP').formValidation({
            }).on('success.form.fv', function(e){
              e.preventDefault();
              modPUsuario();
            });
          },
          error:function(err){
            alert('Error en el servidor')
          }
        })
        function modPUsuario(){
          // alert('modificarr')
          if(confirm('seguro de modificar usuario personal?')){
            $('#FMUP').ajaxSubmit({
              dataType:'json',
              data:{
                id:id,
                tipo:tipo
              },
              success:function(resp){
                // alert(resp)
                if(resp.result==true){
                  // console.log('se modifico correctamente al usuario');
                  alert('se modifico correctamente al usuario Personal');
                  $.ajax({
                    url:'/Usuarios/Gestion',
                    type:'post',
                    success:function(gu){
                      $('#contendor').html(gu);
                    },
                    error:function(){
                      alert('error de servidor')
                    }
                  })
                  $('#MMUP').modal('hide');
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
      }
    },
    eliminar:function(etiqueta){
      var id=$(etiqueta).data('id');
      var ruta="/Pacientes/eliminar";
      console.log(id);
      if (confirm('¿Esta seguro de eliminar Paciente?')) {
        $.ajax({
          url:ruta,
          type:'DELETE',
          data:{
              id:id
          },
          success:function(res){
            // alert(res);
            if(res.result==true){
              alert('Paciente eliminado exitosamente')
              $.ajax({
                url:'/Pacientes/Gestion',
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
      var ruta="/Pacientes/habilitar";
      console.log(id);
      if (confirm('¿ Esta seguro de habilitar Paciente?')) {
        $.ajax({
          url:ruta,
          type:'post',
          data:{
              id:id
          },
          success:function(res){
            // alert(res);
            if(res.result==true){
              alert('Paciente habilitado exitosamente')
              $.ajax({
                url:'/Pacientes/Gestion',
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
    ,
    Ver:function(etiqueta){
      var id=$(etiqueta).data('id');
      var ruta="/Usuarios/Ver/";
      console.log(id);
      $.ajax({
        url:ruta,
        type:'post',
        data:{
          id:id
        },
        success:function(res){
          $('#contendor-modales').html(res);
          $('#verUsuario').modal('show');
          $('.acceptVUser').on('click',function(){
            $.ajax({
              url:'/Usuarios/Gestion',
              type:'post',
              success:function(gu){
                $('#contendor').html(gu);
                $('#verUsuario').modal('hide')
              },
              error:function(){
                alert('error de servidor')
              }
            })
          })
        },
        error:function(){
          alert('error de servidor')
        }
      })
    }
    ,
    Accesso:function(etiqueta){
      $.ajax({
        url: '/Usuarios/MACUsuario',
        type: 'post',
        dataType: 'html',
        data:{
          id:$(etiqueta).data('id')
        },
        success:function(resp){
          $('#contendor-modales').html(resp);
          $('#accesso').modal('show');
          $('#accessoUsuario').formValidation({
          }).on('success.form.fv', function(e){
            e.preventDefault();
            addAcesso();
          })
          function addAcesso(){
            var id=$(etiqueta).data('id');

            console.log(id);
            if (confirm('seguro de Crear Acesso???')) {
              $('#accessoUsuario').ajaxSubmit({
                dataType:'json',
                data:{
                  id:id
                },
                success:function(res){
                  // alert(res);
                  if(res.result==true){
                    alert('Usuario con cuenta exitosamente')
                    $.ajax({
                      url:'/Usuarios/Gestion',
                      type:'post',
                      success:function(gu){
                        $('#contendor').html(gu);
                        $('#accesso').modal('hide')
                      },
                      error:function(){
                        alert('error de servidor')
                      }
                    })
                  }
                },
                error:function(){
                  alert('error al crear cuenta de  Usuario')
                }
              })
            }
          }
        },
        error:function(resp) {
          console.log("error de servidor")
        }
      })
    },
    MAccesso:function(etiqueta){
      $.ajax({
        url: '/Usuarios/MMCUsuario',//modal Modificar cuenta usuario
        type: 'post',
        dataType: 'html',
        data:{
          id:$(etiqueta).data('id')
        },
        success:function(resp){
          $('#contendor-modales').html(resp);
          $('#MAcc').modal('show');
          $('#FMAccU').formValidation({
          }).on('success.form.fv', function(e){
            e.preventDefault();
            addAcesso();
          })
          function addAcesso(){
            var id=$(etiqueta).data('id');

            console.log(id);
            if (confirm('seguro de cambiar Cuenta???')) {
              $('#FMAccU').ajaxSubmit({
                dataType:'json',
                data:{
                  id:id
                },
                success:function(res){
                  // alert(res);
                  if(res.result==true){
                    alert('Usuario con contraseña nueva exisamente')
                    $.ajax({
                      url:'/Usuarios/Gestion',
                      type:'post',
                      success:function(gu){
                        $('#contendor').html(gu);
                        $('#MAcc').modal('hide')
                      },
                      error:function(){
                        alert('error de servidor')
                      }
                    })
                  }else{
                    alert('error no se pudo completar la transaccion')
                    $('#MAcc').modal('hide');
                  }
                },
                error:function(){
                  alert('error al crear cuenta de  Usuario')
                }
              })
            }
          }
        },
        error:function(resp) {
          console.log("error de servidor")
        }
      })
    }
  }
// })
