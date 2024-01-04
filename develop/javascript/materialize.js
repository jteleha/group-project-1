// Initialize the Materialize select
$(document).ready(function(){
    $('select').formSelect();
});

// Initialize the Materialize date picker
$(document).ready(function(){
    $('.datepicker').datepicker();
    $(".datepicker").datepicker({format: "yyyy-mm-dd", autoClose: true});
  });

  $(document).ready(function() {
    $('input#state-name').characterCounter();
  });