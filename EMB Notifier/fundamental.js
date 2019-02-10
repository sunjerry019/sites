function falert(msg, width, value)
{
	$("#alert").html(msg);
    if(width != "" || width != null)
    {
	    $("#alert").css("width", width + "px");
    }
    else
    {
        $("#alert").css("width", "auto");
    }
    if(value != "" || value != null)
    {
        $("#falertbutton").attr("value", value);
    }
    else
    {
        $("#falertbutton").attr("value", "Ok");
    }
	$("#overlay").fadeIn(200, function()
	{
	    positionA();
	    $("#alertbox").fadeIn(200);
	    alertison = true;
	});
}
function closeAlert()
{
    $("#alertbox").fadeOut(200, function()
    {
        $("#overlay").fadeOut(200);
        $("#alert").css("width", "auto");
        $("#alert").html("");
        alertison = false;
    });
}

$(window).load(function(e) {
	$("#loader").fadeOut(200, function ()
	{
		
	});
	
});