//when everything finishes loading / Initialization
$(window).load(function (e)
{
    $("#load").fadeOut(300, function ()
    {
        $("#overlay").fadeOut(150);
    });
});

$(document).ready(function (e)
{
    $("#mathify").click(function (e)
    {
        $("#txt").mathy();
    });
});