//only for use on desktop or large screen pages
var load =
{
    "check": function (loadanot)
    {
        console.log("Checking JS library dependencies...");
        var scripts = 0;
        //check for MathLex and MathJax
        if (typeof MathLex == 'undefined')
        {
            console.error("MathLex not loaded.");
            if (loadanot) if (load.script("//raw.githubusercontent.com/mathlex/mathlex/master/info-page/javascripts/mathlex.js")) console.log("MathLex now loaded");
        }
        else scripts++;

        if (typeof MathJax == 'undefined')
        {
            console.error("MathJax not loaded.");
            if (loadanot) if (load.script("//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML")) console.log("MathJax now loaded");
        }
        else scripts++;

        if (scripts == 2)
        {
            console.log(new Array(24 + 1).join('\n'));
            console.log("All Scripts Loaded");
            console.info("It is recommened to have a loading bar.");
            console.info("To improve page loading time, include MathJax and MathLex in the HTML manually.");
            load.onload();
        }
        else
        {
            setTimeout(load.check, 100);
        }
    },

    "script": function (sc)
    {
        try
        {
            var jq = document.createElement('script');
            jq.type = 'text/javascript';
            jq.src = sc;
            document.getElementsByTagName('head')[0].appendChild(jq);
            return true;
        }
        catch (e)
        {
            return false;
        }
    },

    "onload": function ()
    {
        mathy.loadPlugin();
    }
}

window.onload += load.check(true);

var mathy =
{
    "loadPlugin": function ()
    {
        (function ($)
        {
            mathy.count = 0;
            //when user presses "insert equation"
            $.fn.mathy = function (options)
            {
                //One can customize the following settings
                var settings = $.extend({
                    // These are the defaults.
                    lang: "LaTeX",
                    headerFont: "'Open Sans', 'Calibri', 'Arial', sans-serif",
                    headerWeight: "300",
                    bodyFont: "'Open Sans', 'Calibri', 'Arial', sans-serif",
                    header: "Enter mathematical equation",
                    remove: false,
                    customID: "mathy",
                    themeColor: "#09c",
                    backgroundColor: "#F9F9F9"
                }, options);
                if (this.filter("input, textarea").length > 1)
                {
                    console.error("Cannot call mathy on more than 1 element at once!");
                }
                else
                {
                    this.filter("input, textarea").each(function ()
                    {
                        //process font settings, written not as a function so as to reduce plugin footprint
                        var tmp = settings.headerFont.split(",");
                        for (var i = 0; i < tmp.length; i++)
                        {
                            var tmp2 = $.trim(tmp[i]);
                            var tmp3 = tmp2.split(" ");
                            if (tmp3.length > 1)
                            {
                                tmp[i] = "";
                                if (tmp2[i].substr(0, 1) != "'") tmp[i] += "'";
                                tmp[i] += tmp2;
                                if (tmp2[i].substr(-1, 1) != "'") tmp[i] += "'";
                            }
                        }
                        settings.headerFont = tmp.join(", ");

                        tmp = settings.bodyFont.split(",");
                        for (var i = 0; i < tmp.length; i++)
                        {
                            var tmp2 = $.trim(tmp[i]);
                            var tmp3 = tmp2.split(" ");
                            if (tmp3.length > 1)
                            {
                                tmp[i] = "";
                                if (tmp2[i].substr(0, 1) != "'") tmp[i] += "'";
                                tmp[i] += tmp2;
                                if (tmp2[i].substr(-1, 1) != "'") tmp[i] += "'";
                            }
                        }
                        settings.bodyFont = tmp.join(", ");

                        //initialize the output targets
                        var output =
                        {
                            container:
                            {
                                id: settings.customID + "-container"
                            },
                            codeIO:
                            {
                                id: settings.customID + "-codeIO"
                            },
                            jax:
                            {
                                id: settings.customID + "-jaxOutput"
                            },
                            input:
                            {
                                id: settings.customID + "-input"
                            },
                            header:
                            {
                                id: settings.customID + "-header"
                            },
                            leftCon:
                            {
                                id: settings.customID + "-leftCon"
                            },
                            selector:
                            {
                                id: settings.customID + "-typeSelect"
                            },
                            submit:
                            {
                                id: settings.customID + "-submitEqn"
                            },
                            rightInput:
                            {
                                id: settings.customID + "-rightInput"
                            }
                        };
                        //create output objects if do not exist
                        if ($("#" + output.container.id).length == 0 || $("#" + output.codeIO.id).length == 0 || $("#" + output.jax.id).length == 0)
                        {
                            //code the elements
                            output.header.html = settings.header;

                            output.selector.code = "<div id='" + output.selector.id + "-container'>Type:&nbsp;&nbsp;&nbsp;<div class='" + settings.customID + "-inputcorner'></div><select id='" + output.selector.id + "'><option value='displayed'>Displayed</option><option value='inline'>Inline</option></select><div class='" + settings.customID + "-inputcorner'></div></div>";

                            output.submit.code = "<input id='" + output.submit.id + "' type='button' value='Enter Equation'>";

                            output.input.code = "<div class='" + settings.customID + "-leftConItem'><span>Maths:</span><div class='" + settings.customID + "-leftMargin'><div class='" + settings.customID + "-inputcorner'></div><input id='" + output.input.id + "' placeholder='" + settings.header + "'><div class='" + settings.customID + "-inputcorner'></div></div></div>";

                            output.codeIO.code = "<div class='" + settings.customID + "-leftConItem'><span>" + settings.lang + ":</span><div class='" + settings.customID + "-leftMargin'><div class='" + settings.customID + "-inputcorner'></div><input id='" + output.codeIO.id + "' placeholder='" + settings.lang + "'><div class='" + settings.customID + "-inputcorner'></div></div></div>";

                            output.jax.html = "\\[ \\]";

                            output.rightInput.code = "";

                            //Add elements to html code
                            output.container.html = "<h2 id='" + output.header.id + "'>" + output.header.html + "</h2>";
                            output.container.html += output.submit.code;
                            output.container.html += output.selector.code;
                            output.container.html += "<div id='" + output.leftCon.id + "'>";
                            output.container.html += output.input.code;
                            output.container.html += output.codeIO.code;
                            output.container.html += "</div>";
                            output.container.html += output.rightInput.html;
                            output.container.html += "<div id='" + output.jax.id + "'>" + output.jax.html + "</div>";

                            //write to html
                            var finalOut = "<div id='" + output.container.id + "'>" + output.container.html + "</div>";
                            $("body").append(finalOut);

                            //style the elements
                            output.container.style =
                            {
                                "position": "fixed",
                                "left": "0",
                                "right": "0",
                                "bottom": "0",
                                "width": "calc(100% - 40px)",
                                "height": "250px",
                                "border-top": "1px solid #ccc",
                                "box-shadow": "0 -8px 6px -6px black",
                                "-moz-box-shadow": "0 -8px 6px -6px black",
                                "-webkit-box-shadow": "0 -8px 6px -6px black",
                                "display": "none",
                                "padding": "10px 20px",
                                "background-color": settings.backgroundColor
                            };
                            output.header.style =
                            {
                                "font-family": settings.headerFont,
                                "margin": "5px 0px",
                                "font-weight": settings.headerWeight,
                                "display": "inline-block"
                            };
                            output.submit.style =
                            {
                                "position": "absolute",
                                "left": "350px",
                                "top": "23px",
                                "margin": "0 auto",
                                "width": "110px"
                            };
                            output.selector.style =
                            {
                                "width": "83px",
                                "padding": "5px",
                                "outline": "none",
                                "border": "none",
                                "border-bottom": "1px solid " + settings.themeColor,
                                "background-color": settings.backgroundColor,
                                "-webkit-appearance": "none",
                                "-moz-appearance": "none",
                                "appearance": "none",
                                "cursor": "pointer"
                            };
                            output.input.style =
                            {
                                "border": "0px",
                                "border-bottom": "1px solid " + settings.themeColor,
                                "outline": "none",
                                "width": "498px",
                                "height": "24px",
                                "font-family": "Consolas, monospace",
                                "display": "inline-block",
                                /*"margin-left": "-4px",
                                "margin-right": "-4px",*/
                                "padding": "3px",
                                "background-color": settings.backgroundColor
                            };
                            output.codeIO.style =
                            {
                                "border": "0px",
                                "border-bottom": "1px solid " + settings.themeColor,
                                "outline": "none",
                                "width": "498px",
                                "height": "24px",
                                "font-family": "Consolas, monospace",
                                "display": "inline-block",
                                /*"margin-left": "-4px",
                                "margin-right": "-4px",*/
                                "padding": "3px",
                                "background-color": settings.backgroundColor
                            };
                            output.jax.style =
                            {
                                "width": "100%",
                                "height": "99px",
                                "text-align": "center",
                                "font-size": "20px",
                                "overflow-y": "auto",
                                "overflow-x": "auto"
                            };
                            output.leftCon.style =
                            {
                                "height": "100px",
                                "padding-bottom": "5px",
                                "border-bottom": "1px dashed #aaa"
                            };
                            output.rightInput.style =
                            {

                            };

                            //apply the styles
                            $("#" + output.container.id).css(output.container.style);
                            $("#" + output.header.id).css(output.header.style);
                            $("#" + output.submit.id).css(output.submit.style);
                            $("#" + output.selector.id).css(output.selector.style);
                            $("#" + output.selector.id + "-container").css(
                            {
                                "position": "absolute",
                                "left": "476px",
                                "top": "20px",
                                "font-weight": "300"
                            });
                            $("#" + output.input.id).css(output.input.style);
                            $("." + settings.customID + "-inputcorner").css(
                            {
                                "display": "inline-block",
                                "height": "5px",
                                "width": "1px",
                                "vertical-align": "bottom",
                                "background-color": settings.themeColor
                            });
                            $("." + settings.customID + "-leftMargin").css(
                            {
                                "position": "absolute",
                                "left": "100px",
                                "display": "inline-block"
                            });
                            $("." + settings.customID + "-leftConItem").css(
                            {
                                "height": "40px",
                                "font-family": settings.bodyFont,
                                "font-size": "14px"
                            });
                            $("." + settings.customID + "-leftConItem span").css(
                            {
                                "display": "inline-block",
                                "height": "35px",
                                "line-height": "35px"
                            });
                            $("#" + output.leftCon.id).css(output.leftCon.style);
                            $("#" + output.codeIO.id).css(output.codeIO.style);
                            $("#" + output.rightInput.id).css(output.rightInput.style);
                            $("#" + output.jax.id).css(output.jax.style);

                            //check whether target has an id and assign one if not
                            if (!this.id)
                            {
                                this.id = settings.customID + "-target" + mathy.count;
                                mathy.count++;
                            }

                            //set data-target to be the id
                            $("#" + output.container.id)[0].dataset.target = this.id;

                            //get MathJax output object
                            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                            var mjDisplayBox;
                            MathJax.Hub.Queue(function ()
                            {
                                mjDisplayBox = MathJax.Hub.getAllJax(output.jax.id)[0];
                            });

                            //update outputs on keyup
                            $("#" + output.input.id).on('keyup', function (e)
                            {
                                var ma = $.trim($(this).val());
                                $(this).css('color', 'black');
                                if (ma.length > 0)
                                {
                                    try
                                    {
                                        var tree = MathLex.parse(ma);
                                        var tex = MathLex.render(tree, settings.lang.toLowerCase());
                                        if ($("#" + output.selector.id).val() == "displayed") $("#" + output.codeIO.id).val("\\[" + tex + "\\]");
                                        else if ($("#" + output.selector.id).val() == "inline") $("#" + output.codeIO.id).val("\\(" + tex + "\\)");
                                        MathJax.Hub.Queue(['Text', mjDisplayBox, tex]);
                                    }
                                    catch (err)
                                    {
                                        $(this).css('color', 'red');
                                    }
                                }
                                else
                                {
                                    //clear the display if input is empty
                                    $("#" + output.codeIO.id).val("");
                                    MathJax.Hub.Queue(['Text', mjDisplayBox, ""]);
                                }
                            });
                            $("#" + output.selector.id).on('change', function (e)
                            {
                                var currVal = $.trim($("#" + output.codeIO.id).val());
                                var extractedText = currVal.substring(2, currVal.length - 2);
                                if ($(this).val() == "displayed") $("#" + output.codeIO.id).val("\\[" + extractedText + "\\]");
                                else if ($(this).val() == "inline") $("#" + output.codeIO.id).val("\\(" + extractedText + "\\)");
                            });

                            //display it
                            $("#" + output.container.id).slideDown(100);
                        }

                        //code output
                        //MathJax Output

                        //on submit enter the equation at location of cursor, courtesy of http://goo.gl/ynWOuA
                        /*var el = $("#" + $("#" + output.container.id)[0].dataset.target)[0];
                        var text = equationOut;
                        var val = el.value, endIndex, range, doc = el.ownerDocument;
                        if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number")
                        {
                        endIndex = el.selectionEnd;
                        el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
                        el.selectionStart = el.selectionEnd = endIndex + text.length;
                        } else if (doc.selection != "undefined" && doc.selection.createRange)
                        {
                        el.focus();
                        range = doc.selection.createRange();
                        range.collapse(false);
                        range.text = text;
                        range.select();
                        }*/
                    });
                }
                return this;
            }
        } (jQuery));
    }
}