<?php
session_start();
include_once("config.php");
    
if (isset($_SESSION['userid']) && isset($_SESSION['logstatus']))
{
    $member = $_SESSION['userid']; 

    $rqst = mysqli_query($mysqli, "SELECT * FROM `members` WHERE `memberid`=$member") or die(mysqli_error($mysqli));
    $arr = mysqli_fetch_array($rqst);

    $status = $arr["permission"];
    $admin = FALSE;
    if(!strcmp($status, 'sysadmin')) $admin = TRUE;

    if(isset($_GET["r"]) && !empty($_GET["r"]))
    {
        $userToBeVerified = intval(base64_decode($_GET["r"]), 10);

        if($userToBeVerified != $member && !$admin)
        {
            if(!$ajax) echo "<script>var x = confirm('This verification link seems to be for another user.\\n\\nPlease do not verify an email for someone else\\n\\nIf you truly believe this link is for you, click OK to resend verification email.\n\nWe will redirect you to our homepage if you choose to cancel.');if(x){window.location.href='/verifyemail.php';}else{window.location.href='/';}</script>";
            else echo "Error: Verifying someone else's email";
            die();
        }
        else if($admin)
        {
            $member = $userToBeVerified;
        }
    }

    if($admin)
    {

        $rqst = mysqli_query($mysqli, "SELECT * FROM `members` WHERE `memberid`=$member") or die(mysqli_error($mysqli));
        $arr = mysqli_fetch_array($rqst);
        echo "Verifying user $member, name: ".$arr["name"]." ...<br>";
    }
    
    //check whether it was an ajax request by checking for post data
    $ajax = !!(isset($_POST["ajax"]) && !empty($_POST["ajax"]) && intval($_POST["ajax"]) == 1);

    //check if email for current account already verified
    if(!!$arr["verified"])
    {
        if($admin) echo "Error: Email for current account already verified<br>";
        else
        {
            if(!$ajax) echo "<script>alert('Email for the current logged in account already verified!\\n\\nRedirecting you to the homepage.');window.location.href='/';</script>";
            else echo "Error: Email Already Verified";
        }
        die();
    }
    
    $pws = base64_encode($arr["password"]);
    $sas = base64_encode($arr["salt"]);
    $timestamp = time();
    
    if(isset($_GET["ah"]) && !empty($_GET["ah"]) && isset($_GET["tl"]) && !empty($_GET["tl"]) && isset($_GET["verify"]) && !empty($_GET["verify"]) && isset($_GET["y"]) && !empty($_GET["y"]))
    {
        $verif = intval($_GET["verify"], 10);
        $pw = $_GET["ah"];
        $salt = $_GET["tl"];

        $t = intval(base64_decode($_GET["y"]), 10); //time request generated
        $timeGenerated = (!!$t) ? $t : -1;
        //ah is the hash, base64ed
        //tl is the salt, base64ed
    
        //email verified if it matches credentials and one can only verify their own email    
        if(!!$verif)
        {
            if($timeGenerated > 0)
            {
                //check whether request is overdue (timeout 2 hours)
                if(($timestamp - $timeGenerated) <= 7200)
                {
                    if(!strcmp($pw, $pws) && !strcmp($salt, $sas))
                    {
                        mysqli_query($mysqli, "UPDATE `members` SET `verified`='1' WHERE `memberid`=$member") or die(mysqli_error($mysqli));
                        if($admin) "User Verified!";
                        else echo "<script>alert('Email Verified!\\n\\nRedirecting you to the homepage...');window.location.href='/';</script>";
                        exit();
                    }
                    else
                    {
                        if($admin)
                        {
                            echo "pw hash SQL: ".base64_decode($pws)."<br>";
                            echo "pw hash GET: ".base64_decode($pw)."<br><br>";
                            echo "salt SQL: ".base64_decode($salt)."<br>";
                            echo "salt GET: ".base64_decode($sas)."<br><br>";
                            echo "Unable to verify email.";
                        }
                        else echo "<script>alert('Hmm...Something is wrong here...\\n\\nWe were unable to verify your email.\\n\\nHave you changed your password and clicked on an old link, or tried to verify someone else's email?\\n\\nRedirecting you to the homepage...');window.location.href='/';</script>";
                        die();
                    }
                }
                else //if link has expired, resend verification email by redirecting back to this page without any get data
                {
                    if($admin)
                    {
                        echo "Link expired. Unable to verify.<br>Time generated: $timeGenerated, Time now: $timestamp<br><br><a href='/verifyemail.php?r=$member'>Click to resend verifcation email</a>";
                    }
                    else echo "<script>alert('Link has already expired\\n\\nResending verification email for the current logged in user...');window.location.href='/verifyemail.php';</script>";
                    die();
                }
                
            }
            else
            {
                if($admin) echo "Time Generated: $timeGenerated, Error in verification. Check GET parameters.";
                else
                {
                    echo "<script>console.error('Time Generated: ','$timeGenerated');alert('Hmm...Something is wrong here...\\n\\nWe were unable to verify your email.\\n\\nRedirecting you to the homepage...');window.location.href='/';</script>";
                }
                die();
            }
        }
        else
        {
            if($admin)
            {
                echo "?verify=$verif<br>";
                echo "Error: Unable to verify<br>";
            }
            else
            {
                echo "<script>console.error('Verify: ','$verif');alert('Hmm...Something is wrong here...\\n\\nWe were unable to verify your email.\\n\\nRedirecting you to the homepage...');window.location.href='/';</script>";
            }
            die();
        }
    }
    else if((isset($_GET["ah"]) && !empty($_GET["ah"])) || (isset($_GET["tl"]) && !empty($_GET["tl"])) || (isset($_GET["verify"]) && !empty($_GET["verify"])) || (isset($_GET["y"]) && !empty($_GET["y"])))
    {
        if($admin)
        {
            echo "<pre>";
            var_dump($_GET);
            echo "</pre>";
            echo "<br>Error: Missing Parameters, unable to verify<br>";
        }
        else
        {
            echo "<script>var x = confirm('Hmm...Something is wrong here...There were missing parameters\\n\\nWe were unable to verify your email.\\n\\nClick OK to resend verification email.\n\nor cancel to go to our homepage.');if(x){window.location.href='/verifyemail.php';}else{window.location.href='/';}</script>";
        }
        die();
    }
    else
    {
        
        //obtain short url for the current verification
        $s_username = 'drang';
        $s_password = 'anglaichiang1';
        $s_url     = 'http://thedrang.tk/verifyemail.php?ah='.$pws.'&tl='.$sas.'&verify=1&r='.base64_encode($member).'&y='.base64_encode($timestamp);
        //$keyword = 'ozh';                                         // optional keyword
        $s_title   = 'Email Verification for '.$arr["name"];         // optional, if omitted YOURLS will lookup title with an HTTP request
        $s_format  = 'json';                                        // output format: 'json', 'xml' or 'simple'
        $s_api_url = 'http://s.thedrang.tk/yourls-api.php';
        $s_ch = curl_init();
        curl_setopt( $s_ch, CURLOPT_URL, $s_api_url );
        curl_setopt( $s_ch, CURLOPT_HEADER, 0 );            // No header in the result
        curl_setopt( $s_ch, CURLOPT_RETURNTRANSFER, true ); // Return, do not echo result
        curl_setopt( $s_ch, CURLOPT_POST, 1 );              // This is a POST request
        curl_setopt( $s_ch, CURLOPT_POSTFIELDS, http_build_query(array(      // Data to POST
		    'url'      => $s_url,
		    //'keyword'  => $keyword,
		    'title'    => $s_title,
		    'format'   => $s_format,
		    'action'   => 'shorturl',
		    'username' => $s_username,
		    'password' => $s_password
	    )));
        $data = curl_exec($s_ch);
        curl_close($s_ch);
        $s_json = json_decode($data, TRUE);
        if(intval($s_json["statusCode"], 10) == 200 && !strcmp($s_json["status"], "success"))
        {
            //shorturl was generated successfully

            //send the verification email
            ini_set('sendmail_from', 'noreply@thedrang.tk');

            $to = $arr["name"]." <".$arr["email"].">";
            $subject = "Confirm Your Email Address";
            $message = "Dear ".$arr["name"].",<br><br>According to our systems, you have recently signed up for a new account at <a href='http://thedrang.tk'>thedrang.tk</a> or changed the email address associated with your account. If you have received this email after a password change, it is because you have yet to verify your email address.<br><br>Please verify your email address by clicking the following link within 2 hours: <a href='".$s_json["shorturl"]."'>".$s_json["shorturl"]."</a>.<br><br>If you believe that you have received this email in error, you may safely ignore it. However, if you think that your account might be at risk, please change your password immediately.<br><br>Best Regards,<br>The Drang Team<br><br><small>This is a computer-generated email, please do NOT reply to this email. If you have any queries, feedback or suggestions, please direct all of them to <a href='mailto:thedrangportal@gmail.com'>thedrangportal@gmail.com</a> instead.</small>";

            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= "From: The Drang <noreply@thedrang.tk>".PHP_EOL; //"\r\n";
            $headers .= "Reply-To: The Drang Portal <thedrangportal@gmail.com>" . PHP_EOL; //"\r\n" .
            //$headers .= 'Cc: example2@example.com' . "\r\n";
            $headers .= 'Bcc: sunjerry019+drang@gmail.com, ye_jia_dong@hotmail.com' . "\r\n";
            $headers .= 'X-Mailer: PHP/' . phpversion();
    
            if(mail($to,$subject,$message,$headers))
            {
                if(!$ajax && !$admin) echo "<script>alert('Email Sent!\\n\\nPlease verify your email within the next 2 hours!\\n\\nIf you do not see the email, please check your Spam/Junk Folder.\\n\\nRedirecting you to the homepage...');window.location.href='/';</script>";
                else if (!$ajax && $admin) echo "Email sent to ".$arr["name"]." <".$arr["email"].">";
                else echo "OK";
            }
            else die("Error with email");
        }
        else die("Error with YURLS");


        exit(); //If everything went OK
    }
}
else 
{
    function url_origin($s, $use_forwarded_host=false)
    {
        $ssl = (!empty($s['HTTPS']) && $s['HTTPS'] == 'on') ? true:false;
        $sp = strtolower($s['SERVER_PROTOCOL']);
        $protocol = substr($sp, 0, strpos($sp, '/')) . (($ssl) ? 's' : '');
        $port = $s['SERVER_PORT'];
        $port = ((!$ssl && $port=='80') || ($ssl && $port=='443')) ? '' : ':'.$port;
        $host = ($use_forwarded_host && isset($s['HTTP_X_FORWARDED_HOST'])) ? $s['HTTP_X_FORWARDED_HOST'] : (isset($s['HTTP_HOST']) ? $s['HTTP_HOST'] : null);
        $host = isset($host) ? $host : $s['SERVER_NAME'] . $port;
        return $protocol . '://' . $host;
    }
    function full_url($s, $use_forwarded_host=false)
    {
        return url_origin($s, $use_forwarded_host) . $s['REQUEST_URI'];
    }
    $absolute_url = full_url($_SERVER);
    $redir = '/homepage/?redirect='.rawurlencode($absolute_url);

    echo "<script>alert('Please log in first before verifying your email.\\n\\nRedirecting you to the homepage...');window.location.href='$redir';</script>";
    die();
}
?>