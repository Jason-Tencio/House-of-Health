$(document).ready(function() {
    $('#confirmButton').click(function() {
      var email1 = $('#email1').val();
      var email2 = $('#email2').val();
  
      if (email1 === email2) {
        alert('Emails match. Confirmation successful.');
      } else {
        alert('Emails do not match. Please try again.');
      }
    });
  });
  