<?php
if(isset($_GET["pw"]) && !strcmp($_GET["pw"], "anglaichiang"))
{
    ini_set('sendmail_from', 'noreply@thedrang.tk');
    $email = "ye_jia_dong@hotmail.com";

    $to = "Sun Yudong <sunjerry019@gmail.com>";
    $subject = "This is just a test";
    $txt = "Hello World";
    $headers = "From: The Drang <noreply@thedrang.tk>".PHP_EOL; //"\r\n";
    $headers .= "Reply-To: $email" . PHP_EOL; //"\r\n" .
    //$headers .= 'Cc: example2@example.com' . "\r\n";
    //$headers .= 'Bcc: example3@example.com' . "\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();
    
    if(mail($to,$subject,$txt,$headers)) echo "email sent";
    else echo "Error in email sending";
}
else
{
    echo "Error! No password";
}
?>
