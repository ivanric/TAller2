// $(document).ready(function(){
  var Tratamientos={//objeto
    adicionar:function(){//funcion o propiedad del objeto
      // alert('llegue adicionar')
      $.ajax({
        url:'/Tratamientos/MATratamiento',
        type:'post',
        success:function(resp){
          $('#contendor-modales').html(resp);
            $('#MATrat').modal('show');
            $('#FATrat').formValidation({
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
        if(confirm('Seguro de adionar Tratamiento??')){
          $('#FATrat').ajaxSubmit({
            dataType:'json',
            success:function(res){
              if(res.result==true){
                alert('Tratamiento Registrada exitosamente')
                $.ajax({
                  url:'/Tratamientos/Gestion',
                  type:'post',
                  success:function(gu){
                    $('#contendor').html(gu);
                  },
                  error:function(){
                    alert('error de servidor')
                  }
                })
                $('#MATrat').modal('hide');
              }
            },
            error:function(){
              alert('error no se adiciono tratamiento')
            }
          })
        }
      }
    },
    ListRev:function(etiqueta){
      var id=$(etiqueta).data('id');
      $.ajax({
        url:'Tratamientos/ListRev/'+id,
        type:'post',
        success:function(resp){
          $('.DetalleR').html(resp);
        },
        error:function(err){
          alert('error de servidor')
        }
      })
    },
    NRevision:function(etiqueta){
      var id=$(etiqueta).data('id');
      console.log('este_',id);
      $.ajax({
        url:'Tratamientos/MARev',
        type:'post',
        data:{
          id:id
        },
        success:function(resp){
          $('#contendor-modales').html(resp);
          $('#MARev').modal('show')
          $('#FARev').formValidation({
          }).on('success.form.fv', function(e){
            e.preventDefault();
            addRev();
          })
          function addRev(){
            if (confirm('Seguro de adicionar Revision ??')) {
              $('#FARev').ajaxSubmit({
                data:{
                  codt:id
                },
                dataType:'json',
                success:function(resp){
                  if(resp.result===true){
                    $.ajax({
                      url:'Tratamientos/ListRev/'+id,
                      type:'post',
                      success:function(resp){
                        $('.DetalleR').html(resp);
                        alert('Revision registrado exitosamente')
                        $('#MARev').modal('hide')
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
    },
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
              url:'/Tratamientos/MATFactura',
              type:'post',
              data:{
                codcons:id
              },
              success:function(resp){
                $('#contendor-modales').html(resp);
                $('#MATF').modal('show');
                $('#FATF').formValidation({
                }).on('success.form.fv', function(e){
                  e.preventDefault();
                  addFacturaTrat();
                })
              },
              error:function(err){
                alert('sin respuesta del servidor')
              }
            })
            function addFacturaTrat(){
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
                      $('#FATF').ajaxSubmit({
                        success:function(resp){
                          $('#ListaTFact').html(resp)
                          $('#FATF').data('formValidation').resetForm(true);
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
                            url:'Tratamientos/ListaJSon',
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
                              $('#total').val(respuesta.Total);
                              $('#p_serv').val(respuesta.p_serv);
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
                      $('#MATF').modal('hide')
                    }
                  },
                  error:function(err){
                    alert('sin respuesta del servidor')
                  }
                })
              }
            }
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
