/**
 * Created by igor-go on 18.05.2016.
 */
jQuery(function ($) {
    var o = {};
    $(function () {
        $.backstretch("images/backlogo.jpg");

        o.loginMessage = $("#login-message");
        o.errorMessage = $("#login-error-message");
        o.username = $("#login-username");
        o.password = $("#login-password");
        o.loginButton = $("#login-button");

        o.loginButton.on('click', function (event) {
            event.preventDefault();
            $.post({
                    url: "/login",
                    data: {
                        username: o.username.val(),
                        password: o.password.val()
                    },
                    dataType: 'JSON'
                })
                .done(function (result) {
                    window.location.href = result.redirect;
                    //console.log(result);
                })
                .fail(function (error) {
                    o.errorMessage.text(error.responseText);
                    o.errorMessage.removeClass("hidden");
                    o.loginMessage.addClass("hidden");
                });
        });
    });
});