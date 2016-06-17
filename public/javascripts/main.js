/**
 * Created by igor-go on 20.05.2016.
 */
/**
 * Created by igor-go on 18.05.2016.
 */
jQuery(function ($) {
    var o = {};
    $(function () {
        o.releaseNameStable = $("#release-name-stable");
        o.releaseBuildStable = $("#release-build-stable");

        $.get("/rest/releaseinfo/stable").done(
            function (result) {
                o.releaseNameStable.html(result.p_rel_name + "<em>&nbsp;(" + result.p_rel_codename + ")</em>");
                o.releaseBuildStable.html(result.p_last_build + "&nbsp;от&nbsp;" + result.p_last_date);
            }
        );

/*
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
*/
    });
});