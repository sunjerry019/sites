<?php
    $q = $_GET["q"];
    $page = file_get_contents('http://www.google.com/ig/calculator?hl=en&q=' . $q);
    echo $page;
    //header("Location: http://www.google.com/ig/calculator?hl=en&q=".$q);
?>