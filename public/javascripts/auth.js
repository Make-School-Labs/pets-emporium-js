$(document).ready(function() {

  $('#login-form').submit(function (e) {
    e.preventDefault();

    var user = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/login',
      data: user,
      success: function(data) {
        console.log(data.token);
        Cookies.set('token', data.token);
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  $('#sign-up-form').submit(function (e) {
    e.preventDefault();

    var user = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/sign-up',
      data: user,
      success: function(data) {
        console.log(data);
        Cookies.set('token', data.token);
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  $('#logout').click(function (e) {
    e.preventDefault();

  })
      //     beforeSend: function(xhr) {
      //   if (localStorage.token) {
      //     xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      //   }
      // },

});