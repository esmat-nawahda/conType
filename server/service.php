<?php

$url=$_GET['url'];
$total=array();
    





// break $sentence using the space character as the delimiter
$urls = explode('^', $url);
 
//tell the amount of words using the size of the array





function get_http_response_code($url) {
  $headers = get_headers($url);
  return substr($headers[0], 9, 3);
}


 
// loop through and print all the words
for ($i = 0; $i < sizeof($urls); $i++)
{
    $line = str_replace(",","&",$urls[$i]);
    $get_http_response_code = get_http_response_code($line);
 //    if (strpos($line,'&') !== false) {
 //        $arr = explode("&", $line);
    // 	$line = $arr[1];
	// }
    
    $header = get_headers( $line, 1 );

        if ( isset( $header['Content-Type'] ) ) {
            
	        $json = (array('_id' => $i,'url' => $line,'contType' => $header['Content-Type'],'status' => $get_http_response_code));
	        array_push($total, $json);
	    }
}



print(json_encode($total));
	
?>