<?php

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Matrix Calculator</title>
        <link rel="stylesheet" href="matrixcal.css">
        <script src="http://code.jquery.com/jquery.min.js"></script>
        <script src="matrixcal.js"></script>
        </script>
    </head>
    <body>
        <div>Input Matrix Below:</div>
        <div id="cal">
            <div>
                <label>Enter Matrix Dimensions: <input id="rol" type="number"> by <input id="col" type="number">. <input type="button" value="Enter" onclick="matrix.generateInput()"></label>
            </div>
            <div id="inputs"></div>
        </div>
    </body>
</html>
