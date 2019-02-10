<!DOCTYPE html>

<html lang="en">
    <head>
        <link rel="icon" type="image/ico" href="favicon.ico"/>
        <meta charset="utf-8" />
        <title>EMB Notifier</title>
        <link rel="stylesheet" href="style.css" />
        <script>
            function positionA()
            {
                ht = $(window).height();
                aht = $("#alertbox").height();
                $("#alertbox").css("top", ht / 2 - aht / 2);
                wt = $(window).width();
                awt = $("#alertbox").width();
                $("#alertbox").css("left", wt / 2 - awt / 2);
            ]
        </script>
    </head>
    <body onkeyup="checkKey(event);">
        <div id="loader">
    		<img src="images/ajax-loader.gif" alt="Loading..." id="loading">
            <br>
            Loading...Please Wait
        </div>
    	<div id="alertbox">
        	<div id="alert"></div>
            <br>
            <div style="margin:auto; text-align:center;"><input type="button" class="submit" value="Ok" onclick="closeAlert()" id="falertbutton"></div>
        </div>
        
        <div id="overlay"></div>
        <div id="main" class="main">
            <div id="hud">
                <h3>hs_student</h3>
                <div class="table">
                    <!--<div class="row">
                        <div class="cell">
                            <div class="table">
                                <div class="row">
                                    <div class="cell">Board:</div>
                                    <div class="cell" id="board"></div>
                                </div>
                            </div><!--end .row-->
                        <!--</div>
                    </div>-->
                    <div class="row">
                        <div class="cell">
                            <div class="table">
                                <div class="row">
                                    <div class="cell">Account:</div>
                                    <div class="cell" id="acc"></div>
                                </div>
                            </div><!--end .row-->
                        </div>
                        <div class="cell">
                            <div class="table">
                                <div class="row">
                                    <div class="cell">New messages (impt/normal): </div>
                                    <div class="cell" id="newmsg"></div>
                                </div>
                            </div><!-- end .row-->
                        </div>
                    </div>
                </div><!--end .table-->
            </div><!--end #hud-->

            <div id="emb">
            </div>
        </div><!--end #.main-->
        <script src="http://code.jquery.com/jquery.min.js" type="text/javascript"></script>
        <script src="data-gathering.js" type="text/javascript"></script>
        <script src="fundamental.js" type="text/javascript"></script>
        <script src="kb.js" type="text/javascript"></script>
    </body>
</html>
