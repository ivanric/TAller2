/* ---------- Submenu  ---------- */

$('.dropmenu').click(function(e){

  e.preventDefault();

  $(this).parent().find('ul').slideToggle();

});
/* ---------- Disable moving to top ---------- */
$('a[href="#"][data-top!=true]').click(function(e){
  e.preventDefault();
});
