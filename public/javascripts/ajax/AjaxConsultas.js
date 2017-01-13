// $(document).ready(function(){
  var Consultas={//objeto
    adicionar:function(){//funcion o propiedad del objeto
      // alert('llegue adicionar')
      $.ajax({
        url:'/Consultas/MAConsulta',
        type:'post',
        success:function(resp){
          $('#contendor-modales').html(resp);
            $('#MACons').modal('show');
            $('#FACons').formValidation({
            }).on('success.form.fv', function(e){
              e.preventDefault();
              addCons();
            })
        },
        error:function(){
          console.log('no respondio el servidor al modal MAAUsuario');
        }
      })
      function addCons(){
        if(confirm('Seguro de adionar Consulta??')){
          $('#FACons').ajaxSubmit({
            dataType:'json',
            success:function(res){
              if(res.result==true){
                alert('Consulta registrada exitosamente')
                $.ajax({
                  url:'/Consultas/Gestion',
                  type:'post',
                  success:function(gu){
                    $('#contendor').html(gu);
                  },
                  error:function(){
                    alert('error de servidor')
                  }
                })
                $('#MACons').modal('hide');
              }
            },
            error:function(){
              alert('error no se adiciono usario')
            }
          })
        }
      }
    },
    ListDiag:function(etiqueta){
      var id=$(etiqueta).data('id');
      $.ajax({
        url:'Consultas/ListDiag/'+id,
        type:'post',
        success:function(resp){
          $('.DetalleD').html(resp);
        },
        error:function(err){
          alert('error de servidor')
        }
      })
    },
    Ndiagnostico:function(etiqueta){
      var id=$(etiqueta).data('id');
      $.ajax({
        url:'Consultas/MADiag',
        type:'post',
        data:{
          id:id
        },
        success:function(resp){
          $('#contendor-modales').html(resp);
          $('#MADiag').modal('show')
          $('#FADiag').formValidation({
          }).on('success.form.fv', function(e){
            e.preventDefault();
            addDiag();
          })
          function addDiag(){
            if (confirm('Seguro de adicionar Diagnostico ??')) {
              $('#FADiag').ajaxSubmit({
                dataType:'json',
                success:function(resp){
                  if(resp.result===true){
                    $.ajax({
                      url:'Consultas/ListDiag/'+id,
                      type:'post',
                      success:function(resp){
                        $('.DetalleD').html(resp);
                        alert('Diagnostico registrado exitosamente')
                        $('#MADiag').modal('hide')
                      },
                      error:function(err){
                        alert('error de servidor')
                      }
                    })
                  }
                },
                error:function(err){
                  alert('error de servidor')
                }
              })
            }
          }
        },
        error:function(err){
          alert('error de servidor')
        }
      })
    }
    ,
    factura:function(etiqueta){
      // alert($(etiqueta).data('id'))
      var id=$(etiqueta).data('id');
      $.ajax({
        url:'/Consultas/ControlCF',
        type:'post',
        dataType:'json',
        data:{
          codcons:id
        },
        success:function(resp){
          if (resp==true) {
            console.log('Usted esta apunto de realizar una factura concons:', id)

            $.ajax({
              url:'/Consultas/ExisteDiag',
              type:'post',
              data:{
                codcons:id
              },
              dataType:'json',
              success:function(resp){
                if (resp==true) {
                  $.ajax({
                    url:'/Consultas/ExisteTrat',
                    type:'post',
                    data:{
                      codcons:id
                    },
                    dataType:'json',
                    success:function(resp){
                      if (resp==true) {
                        $.ajax({
                          url:'/Consultas/MACFactura',
                          type:'post',
                          data:{
                            codcons:id
                          },
                          success:function(resp){
                            $('#contendor-modales').html(resp);
                            $('#MACF').modal('show');
                            $('#FACF').formValidation({
                            }).on('success.form.fv', function(e){
                              e.preventDefault();
                              addFacturaCons();
                            })
                          },
                          error:function(err){
                            alert('sin respuesta del servidor')
                          }
                        })
                        function addFacturaCons(){
                          if (confirm('seguro de adicionar factura ???')) {
                            $.ajax({
                              url:'/Consultas/ControlCF',
                              type:'post',
                              dataType:'json',
                              data:{
                                codcons:id
                              },
                              success:function(resp){
                                if (resp==true) {
                                    // console.log('Usted esta apunto de realizar una factura concons:', id)
                                  $('#FACF').ajaxSubmit({
                                    success:function(resp){
                                      $('#ListaCFact').html(resp)
                                      $('#FACF').data('formValidation').resetForm(true);
                                      var date=new Date();
                                      var ndate=formatDate(date);
                                      $('#fecha_fact').val(ndate);
                                      $('#fecha_ocul').val(ndate);
                                      $('#fecha_fact').attr({
                                        'disabled':'disabled'
                                      })
                                      function formatDate(date) {
                                        var d = new Date(date),
                                        month = '' + (d.getMonth() + 1),
                                        day = '' + d.getDate(),
                                        year = d.getFullYear();

                                        if (month.length < 2) month = '0' + month;
                                        if (day.length < 2) day = '0' + day;

                                        return [year, month, day].join('-');
                                      }
                                      $.ajax({
                                        url:'Consultas/ListaConsDiag',
                                        type:'post',
                                        data:{
                                          codcons:id
                                        },
                                        dataType:'json',
                                        success:function(respuesta){
                                          console.log('respuestaJSON: ',respuesta);
                                          $('#p_cons').val(respuesta.p_cons);
                                          $('#m_codcons').val(respuesta.codcons);
                                          $('#p_diag').val(respuesta.p_diag);
                                          $('#total').val(respuesta.total);
                                        },
                                        error:function(err){
                                          alert('no se cargo los datos para el formulario')
                                        }
                                      })
                                    },
                                    error:function(error){
                                      alert('sin respuesta de servidor')
                                    }
                                  })
                                }else{
                                  alert('SE llego al maxino de facturas ingrese nuevo talonario de Facturas : Ir al Modulo Facturas')
                                  $('#MACF').modal('hide')
                                }
                              },
                              error:function(err){
                                alert('sin respuesta del servidor')
                              }
                            })
                          }
                        }
                      }else {
                        alert('esta consulta contiene tratamiento ir al modulo tratamiento para emitir factura')
                      }
                    },
                    error:function(err){
                      alert('sin respuesta del servidor')
                    }
                  })
                } else {
                  alert('usted debe registrar por lo menos un diagnostico')
                }
              },
              error:function(err){
                alert('sin respuesta del servidor')
              }
            })
          }else{
            alert('Se llego al maxino de facturas ingrese nuevo talonario de Facturas : Ir al Modulo Facturas')
          }
        },
        error:function(err){
          alert('sin respuesta del servidor')
        }
      })
    }
  }
// })
