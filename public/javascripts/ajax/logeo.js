var logeo=function(){
	var validando=function(){//funcion anonima
		// alert('entreLogueada')
		$.ajax({
			url:"/modalLogeo",
			type:"post",
			data:{
				er:111111
			},
			success:function(resp){
					// alert('s')
					$('#contenedor-modal').html(resp);
					$('#Modallog').modal('show');
					// $('#log').find('.modal-dialog').addClass('animated flip');
					$('#logvalidate').formValidation({
						message: 'Contenido no valido',
						feedbackIcons: {
							valid: 'glyphicon glyphicon-ok',
							invalid: 'glyphicon glyphicon-remove',
							validating: 'glyphicon glyphicon-refresh'
						},
						fields: {
							xlogin: {
								message: 'The username is not valid',
								validators: {
									notEmpty: {
										message: 'ingrese un login'
									},
									stringLength: {
										min: 4,
										max: 20,
										message: 'El login deve ser 4 caracteres y menor que 20 caracteres'
									},
									regexp: {
										regexp: /^[a-zA-Z0-9_\.]+$/,
										message: 'El login no acepta caracteres especiales'
									}
								}
							},
							xpassword: {
								validators: {
									notEmpty: {
										message: 'Requiere una clave'
									}
								}
							}
						},

					}).on('success.form.fv', function(e){
						e.preventDefault();
						loguearse();

					})
					function loguearse(){
						$('#logvalidate').ajaxSubmit({
							dataType:"json",
							success:function(respuesta){
								// al/*ert(respuesta)
								// $('#contenedor-modal').append(respuesta);
								// $('#mensajes').modal('show');
								// $('#ModalMensaje').addClass('animated bounceInUp');
								// console.log('La respuesta: ',respuesta[0].login);
								console.log('La respuesta: ',respuesta.valor);
								if (respuesta.valor) {
									window.location.href="/inicio";
									// window.location.assign("Usuario/inicio");
								} else{

								};
							},
							error:function(e){
								alert('error envio logeo');
							}
						});
					}
			}

		});
	}
	return{
		validar:function(){//funcion del objeto logueo
			validando();//llamada a la funcion anonima
		}
	}
}();
