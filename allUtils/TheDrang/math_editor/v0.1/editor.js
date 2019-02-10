//Init Variables
var language = "TeX" //Default is TeX
var localSto = false;
var noload = false;

$(window).load(function (e)
{
    try { localSto = ('localStorage' in window && window['localStorage'] !== null); } catch (e) { }; //check for support for localstorage

    //load default language from localStorage if available
    if (localSto && localStorage["math_def_lang"])
    {
        language = localStorage["math_def_lang"];

        //select the default lang
        $("#lang").val(language);

        //if never ask again, do not load dialog (=="true" because localStorage stores as string)
        if (localStorage["math_rmb_lang"] == "true") noload = true;
    }

    $("#load").fadeOut(300, function ()
    {
        //show language option if not asked to remember option
        if (!noload) $("#language").delay(150).fadeIn(200);

        //otherwise just fadeOut the overlay 
        else
        {
            $("#overlay").fadeOut(150);
        }
    });
});

$("document").ready(function ()
{
    $("#langbtn").click(function (e)
    {
        language = $("#lang").val();

        if (localSto)
        {
            localStorage["math_def_lang"] = language;
            localStorage["math_rmb_lang"] = $("#rmb").is(':checked');
        }

        $("#preview").html("<script type='math/" + language.toLowerCase() + "'></script>");

        $("#language").fadeOut(150, function ()
        {
            $("#overlay").fadeOut(150);
        });
    });

    $(".txtarea").focus(function (e)
    {
        if ($(this).html() == "Write Math Here") $(this).html("").css("color", "#000");
    });

    $(".txtarea").blur(function (e)
    {
        var h = $.trim($.trim($(this).html()).decodeHTML()); //trim the whole thing to leave only non-whitespace characters

        if (h == "") $(this).css("color", "#aaa").html("Write Math Here");
    });

    $(".txtarea")[0].addEventListener("input", function ()
    {
        $("#preview script").html($.trim($(this).html()).decodeHTML());
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

        var math = MathJax.Hub.getAllJax("preview")[0];
        MathJax.Hub.Queue(["Text",math, $.trim($(this).html()).decodeHTML()]);
    }, false);
});

//prototypes
String.prototype.decodeHTML = function()
{
    //convert encoded html to html
    return $("<div/>").html(this).text();
}

String.prototype.encodeHTML = function() 
{
    //encode string to html entities
    return this.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#'+i.charCodeAt(0)+';';
    })
}