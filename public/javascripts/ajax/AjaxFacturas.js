// $(document).ready(function(){
  var Facturas={//objeto
    adicionar:function(){//funcion o propiedad del objeto
      // alert('llegue adicionar')
      $.ajax({
        url:'/Facturas/MAFactura',
        type:'post',
        success:function(resp){

          $('#contendor-modales').html(resp);
            $('#MAFact').modal('show');
            $('#FAFact').formValidation({
            }).on('success.form.fv', function(e){
              e.preventDefault();
              addServ();
            })
        },
        error:function(){
          console.log('no respondio el servidor al modal MAFact');
        }
      })
      function addServ(){
        if(confirm('Seguro de adionar Factura??')){
          $('#FAFact').ajaxSubmit({
            dataType:'json',
            success:function(res){
              if(res.result==true){
                alert('Se adiciono correctamente Factura')
                $.ajax({
                  url:'/Facturas/Gestion',
                  type:'post',
                  success:function(gu){
                    $('#contendor').html(gu);
                  },
                  error:function(){
                    alert('error de servidor')
                  }
                })
                $('#MAFact').modal('hide');
              }
            },
            error:function(){
              alert('error no se adiciono usario')
            }
          })
        }
      }
    },
  }
// })
