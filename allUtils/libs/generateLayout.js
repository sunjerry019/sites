var webLayout =
{
    generate: function ()
    {
        var html = "<div class='table'><div class='row'>";
        for (i = 0; i < 10; i++)
        {
            html += "<div class='box_1_3 yellow box' id='box-" + i + "'>Hi</div>";
        }
        html += "</div></div>";
        $("#content").html(html);
    },

    styleGenerate: function ()
    {
        var stylehtml = "<style>";
        var unit = 50;
        for (j = 1; j <= 3; j++)
        {
            for (k = 1; k <= 3; k++)
            {
                stylehtml += "box_" + j + "_" + k
                        + "{"
                        + "width:" + j * unit + "px;"
                        + "height:" + k * unit + "px;"
                        + "}";
            }
        }
        stylehtml += "</style>";
        var temp = $("head").html();
        temp += stylehtml;
        $("head").html(temp);
    }
}