var ajaxdata;
var results;
var expression = "";
var evaluated = false;
var initi = true;
var prevans = "0";

function init()
{
    $.get("gc-middleman.php", { "q": "1%2B1" }, function(results){});
}

function logconsole(msg)
{
    try
    {
        console.log(msg);
    }
    catch(e){}
}

function parseJ(jsonj)
{
    jsonj = jsonj.replace('lhs','"lhs"');
    jsonj = jsonj.replace('rhs','"rhs"');
    jsonj = jsonj.replace('error','"error"');
    jsonj = jsonj.replace('icc','"icc"');
    return jsonj;
}

var calculator =
{
    "convertCurrency": function(from, to, amt)
    {
        var q = amt + from + "=?" + to;
        $.get("gc-middleman.php", { "q": q }, function(results)
        {
            //alert(results);
            results = parseJ(results);
            resultsjson = jQuery.parseJSON(results);
            if(resultsjson.error != "")
            {
                calculator.error(resultsjson.error, 1);
            }
            else
            {
                resultsjson.lhs = calculator.parseResult(resultsjson.lhs);
                resultsjson.rhs = calculator.parseResult(resultsjson.rhs);
                $("#output-currency").html("<span>" + resultsjson.lhs + " = " + resultsjson.rhs + "</span>");
                $("#output-currency").show(100, function()
                {
                    $('#output-currency span').animate({
                        backgroundColor: "#F9FF9A"
                    }, 250, function()
                    {
                        $('#output-currency span').animate({
                            backgroundColor: "#FFFFFF"
                        }, 250, function()
                        {
                            //done
                        });
                    });
                })
            }
        });

    },

    "updateDisplay": function(content, prev)
    {
        if(prev != "")
        {
            $("#prev").html(prev);
        }
        else
        {
            $("#prev").html("");
        }
        $("#display").html(content);
    },

    "buttonClick": function(ide, f)
    {
        if(initi)
        {
            expression = ide;
            initi = false;
        }
        else
        {
            if(f == 'f' && expression == "")
            {
                expression = prevans + ide;
            }
            else
            {
                expression += ide;
            }
        }
        calculator.updateDisplay(expression, "");
        evaluated = false;
    },

    "parseResult": function(str)
    {
        str = str.replace(/\�/g, ' ');
        return str;
    },

    "evaluate": function()
    {
        if(!evaluated)
        {
            evaluated = true;
            expression += "=";
            try
            {
                exptemp = expression.replace(/\√/g, "sqrt");
            }
            catch(e) { }
            exptemp = encodeURIComponent(exptemp);
            $.get("gc-middleman.php", { "q": exptemp }, function(results2)
            {
                //alert(results);
                results2 = parseJ(results2);
                try
                {
                    logconsole(results2);
                    results2json = jQuery.parseJSON(results2); logconsole("results2json = jQuery.parseJSON(results2);");
                    if(results2json.error != "" && results2json.error != "0")
                    {
                        logconsole('results2json.error != "" && results2json.error != "0"');
                        calculator.error(results2json.error, 2); logconsole("calculator.error(results2json.error, 2);");
                        $("#clear").html("AC"); logconsole('$("#clear").html("AC");');
                        $("#clear").attr("onclick", "calculator.clear(2)"); logconsole('$("#clear").attr("onclick", "calculator.clear(2)");');
                        expression = ""; logconsole('expression = "";');
                    }
                    else
                    {
                        results2json.rhs = calculator.parseResult(results2json.rhs); logconsole('results2json.rhs = calculator.parseResult(results2json.rhs);');
                        prevans = results2json.rhs; logconsole('prevans = results2json.rhs;');
                        calculator.updateDisplay(prevans, expression); logconsole("calculator.updateDisplay(prevans, expression);")
                        $("#clear").html("AC"); logconsole('$("#clear").html("AC");');
                        $("#clear").attr("onclick", "calculator.clear(2)"); logconsole('$("#clear").attr("onclick", "calculator.clear(2)");');
                        expression = ""; logconsole('expression = "";');
                    }
                }
                catch(e)
                {
                    alert(e);
                    calculator.error(e, 2);
                    $("#clear").html("AC");
                    $("#clear").attr("onclick", "calculator.clear(2)");
                    expression = "";
                }
            });
        }
    },

    "clear": function(type)
    {
        switch(type)
        {
            case 1:
                expression.split("");
                expression = expression.slice(0, expression.length - 1);
                calculator.updateDisplay(expression, "");
                break;
            case 2:
                calculator.updateDisplay("", "");
                expression = "";
                $("#clear").html("C");
                $("#clear").attr("onclick", "calculator.clear(1)");
                break;
            default:
                logconsole("Invalid clear() Argument");
                break;
        }
    },

    "ver": "1.1",
    "error": function(id, source)
    {
        if(source == 1)
        {
            alert("An error has occured. (" + id + ")! Please try again later.");
        }
        else if(source == 2)
        {
            calculator.updateDisplay("Error", expression);
        }
        else
        {
            logconsole("Error occured (" + id + ")");
        }
    }
}

function whichButton(event)
{
    if ($("#amt").is(":focus")) { }
    else
    {
        if (event.keyCode == 49 || event.keyCode == 97)
        {
            calculator.buttonClick('1');
        }
        if (event.keyCode == 50 || event.keyCode == 98)
        {
            calculator.buttonClick('2');
        }
        if (event.keyCode == 51 || event.keyCode == 99)
        {
            calculator.buttonClick('3');
        }
        if (event.keyCode == 52 || event.keyCode == 100)
        {
            calculator.buttonClick('4');
        }
        if (event.keyCode == 53 || event.keyCode == 101)
        {
            calculator.buttonClick('5');
        }
        if (event.keyCode == 54 || event.keyCode == 102)
        {
            calculator.buttonClick('6');
        }
        if (event.keyCode == 55 || event.keyCode == 103)
        {
            calculator.buttonClick('7');
        }
        if (event.keyCode == 56)
        {
            if (event.shiftKey == 1)
            {
                calculator.buttonClick('*', 'f');
            }
            else
            {
                calculator.buttonClick('8');
            }
        }
        if (event.keyCode == 104)
        {
            calculator.buttonClick('8');
        }
        if (event.keyCode == 106)
        {
            calculator.buttonClick('×', 'f');
        }
        if (event.keyCode == 107)
        {
            calculator.buttonClick('+', 'f');
        }
        if (event.keyCode == 57 || event.keyCode == 105)
        {
            calculator.buttonClick('9');
        }
        if (event.keyCode == 48 || event.keyCode == 96)
        {
            calculator.buttonClick('0');
        }
        if (event.keyCode == 191 || event.keyCode == 111)
        {
            calculator.buttonClick('÷', 'f');
        }
        if (event.keyCode == 189 || event.keyCode == 109)
        {
            calculator.buttonClick('-', 'f');
        }
        if (event.keyCode == 187)
        {
            if (event.shiftKey == 1)
            {
                calculator.buttonClick('+', 'f');
            }
            else
            {
                calculator.evaluate(); //=
            }
        }
        if (event.keyCode == 13)
        {
            calculator.evaluate(); //=
        }
        if (event.keyCode == 190 || event.keyCode == 110)
        {
            calculator.buttonClick('.');
        }
    }
}

$(document).ready(function()
{
    $("#equalbtn").click(function()
    {
        calculator.evaluate();
    });
    $("#loader").fadeOut(500,function()
    {
        calculator.updateDisplay(prevans, "");
    });
});