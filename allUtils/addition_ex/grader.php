<?php
$ansFile = fopen("ans.cpp", "r") or die("Unable to open file!");
$code = fread($ansFile,filesize("ans.cpp"));

if(!preg_match_all("/;+/", $code, $matches))
{
    $score = pow(78/strlen($code), 4)*100;
    echo $score;
}
else
{
    echo "WA";
}
fclose($ansFile)
?>