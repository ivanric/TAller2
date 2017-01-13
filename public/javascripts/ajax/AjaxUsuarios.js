// $(document).ready(function(){
  var Usuarios={//objeto
    adicionar:function(){//funcion o propiedad del objeto
      // alert('llegue adicionar')
      // document.getElementById("Conf").reset();
      $.ajax({
        url:'/Usuarios/SelUser',
        type:'post',
        success:function (resp) {
          $('#contendor-modales').html(resp);
          $('#Conf')[0].reset();
          $('#Conf').find('input[name=tipoUsu]').prop('checked',false);
          $("#AUConf").modal("show");

          $('#Conf').formValidation({
          }).on('success.form.fv', function(e){
            e.preventDefault();
            add();
          })
          // function add(){
          // }
          //$('#Conf').find("input[name=tipoUsu]").on("change",function(){
          $('#Conf').find("input[name=tipoUsu]").on("click",function(){
            // alert(this.value)
            var selecciondo=this.value;
            var IDFORM='';
            var MODALUSU='';
            if (selecciondo=='a') {
              $.ajax({
                url:'/Usuarios/ModalAAUsuario',
                type:'post',
                success:function(resp){

                  $('#contendor-modales').append(resp);
                    MODALUSU='#addUserAdm';
                    IDFORM='#FormAddUserAdm';
                    // alert('A----',MODALUSU,' ',IDFORM)
                    console.log('A----',MODALUSU,' ',IDFORM);
                    $(MODALUSU).modal('show');
                    $(IDFORM).formValidation({
                    }).on('success.form.fv', function(e){
                      e.preventDefault();
                      addUser(MODALUSU,IDFORM);
                    })
                },
                error:function(){
                  console.log('no respondio el servidor al modal MAAUsuario');
                }
              })

            } else {
              $.ajax({
                url:'/Usuarios/ModalAPUsuario',
                type:'post',
                success:function(resp){
                  $('#contendor-modales').append(resp);
                    MODALUSU='#addUserPer';
                    IDFORM='#FormAddUserPer';
                    // alert('P----',MODALUSU,' ',IDFORM)
                    console.log('P----',MODALUSU,' ',IDFORM);
                    $(MODALUSU).modal('show');
                    $(IDFORM).formValidation({
                    }).on('success.form.fv', function(e){
                      e.preventDefault();
                      addUser(MODALUSU,IDFORM);
                    })
                },
                error:function(){
                  console.log('no respondio el servidor al modal MAAUsuario');
                }
              })
            }

            function addUser(){
              // alert('TOTO----',MODALUSU,' ',IDFORM)
              console.log('TOTO----',MODALUSU,' ',IDFORM);
              $(IDFORM).ajaxSubmit({
                dataType:'json',
                success:function(res){
                  if(res.result==true){
                    alert('Usuario registrado exitosamente')
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
                    $(MODALUSU).modal('hide');
                    $('#AUConf').modal('hide');
                  }
                },
                error:function(){
                  alert('error no se adiciono usario')
                }
              })
            }


          })
        },
        error:function(error) {

        }
      })
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

              modAUsuario();

            });
          },
          error:function(err){
            alert('Error en el servidor')
          }
        })
        function modAUsuario(){
          // alert('modificarr')
          if(confirm('Seguro de modificar usuario Administrativo')){
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
                alert('se modifico correctamente al usuario');
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
      // alert('eliminar llego')
      var id=$(etiqueta).data('id');
      var tipo=$(etiqueta).attr('accesskey')
      var ruta="/Usuarios/eliminar/"+tipo;
      // var ruta="/Usuarios/eliminar";
      console.log(id);
      console.log(tipo);
      if (confirm('¿ Esta seguro de eliminar Usuario?')) {
        $.ajax({
          url:ruta,
          type:'DELETE',
          data:{
              id:id
              // tipo:tipo
          },
          success:function(res){
            // alert(res);
            if(res.result==true){
              alert('se elimino correctamente Usuario')
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
      var tipo=$(etiqueta).attr('accesskey')
      var ruta="/Usuarios/habilitar/"+tipo;
      // var ruta="/Usuarios/eliminar";
      console.log(id);
      console.log(tipo);
      if (confirm('¿ Esta seguro de habilitar Usuario?')) {
        $.ajax({
          url:ruta,
          type:'post',
          data:{
              id:id
              // tipo:tipo
          },
          success:function(res){
            // alert(res);
            if(res.result==true){
              alert('se habilito correctamente Usuario')
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
