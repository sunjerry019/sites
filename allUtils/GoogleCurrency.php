<?php
	if(isset($_GET["a"]) && isset($_GET["from"]) && isset($_GET["to"]))
	{
		$a = $_GET["a"];
		$from = $_GET["from"];
		$to = $_GET["to"];
		
		$page = (string) file_get_contents('https://www.google.com/finance/converter?a='.$a.'&from='.$from.'&to='.$to);
		$end = explode($from, $page);
		$eqamt = explode($to, $end[6]);
		$mamt = explode("=", $eqamt[0]);

		foreach ($mamt as &$value) {
			$value = htmlspecialchars($value);
		}

		$amt = explode('&gt;', $mamt[2]);
		echo trim($amt[1]);
	}
	else
	{
		echo "Error";
	}
?>