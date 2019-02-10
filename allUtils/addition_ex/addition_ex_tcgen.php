<?php
for($i=1;$i<=150;$i++)
{
    $a = mt_rand(0,1073741823);
    $b = mt_rand(0,1073741823);

    $file = fopen($i.".in", "w") or die("Unable to open file!");
    fwrite($file, $a." ".$b);
    fclose($file);

    $file = fopen($i.".out", "w") or die("Unable to open file!");
    fwrite($file,($a+$b));
    fclose($file);
}
echo "Done";
?>
