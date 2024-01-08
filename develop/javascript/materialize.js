// Initialize the Materialize select
$(document).ready(function(){
    $('select').formSelect();
});

// Initialize the Materialize date picker
$(document).ready(function(){
    $(".datepicker").datepicker({format: "yyyy-mm-dd", autoClose: true, showClearBtn: true});
});

// Initialize the Materialize character counter
$(document).ready(function() {
    $('input#state-name').characterCounter();
});

  