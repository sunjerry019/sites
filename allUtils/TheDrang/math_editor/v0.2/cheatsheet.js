//Init vars
currentTab = "start";

$(window).load(function (e)
{
    if (window.location.hash)
    {
        goToPage(window.location.hash.toString().substr(1), true);
    }
    $("#load").fadeOut(300, function ()
    {
        $("#overlay").fadeOut(150);
    });
});

$(document).ready(function (e)
{
    $("h3[data-id=start]").click(function (e)
    {
        goToPage("start");
    });

    $(".item").click(function (e)
    {
        goToPage(this.dataset.id);
    });

    $("a[href^=#]").click(function (e)
    {
        goToPage($(this).attr("href").substr(1));
    });
});

function goToPage(ide, noanimation)
{
    if(!!$("#" + ide)[0])
    {
        if(noanimation)
        {
            $("#" + currentTab).fadeOut(0, function ()
            {
                $(".item[data-id=" + currentTab + "]").removeClass("active");
                $(".item[data-id=" + ide + "]").addClass("active");
                $("#" + ide).fadeIn(0);
                currentTab = ide;
            });
        }
        else
        {
            $("#" + currentTab).fadeOut(150, function ()
            {
                $(".item[data-id=" + currentTab + "]").removeClass("active");
                $(".item[data-id=" + ide + "]").addClass("active");
                $("#" + ide).fadeIn(150);
                window.location.href = "#" + ide;
                currentTab = ide;
            });
        }
    }
    else
    {
        console.error("No such page. Are you sure you typed the address correctly?");
    }
}

String.prototype.encodeHTML = function() 
{
    //encode string to html entities
    return this.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#'+i.charCodeAt(0)+';';
    })
}