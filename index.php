<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Near Earth Objects</title>
  </head>
  <body>
    <?php
      require "key.php";//variable called $apiKey

      //get data from NASA Near Earth Objects
      $url= "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=";

      $apidata = json_decode(curlGet($url.$apiKey),true);

      dump($apidata);



      function dump($v,$t=""){
      	echo "<h2>".$t."</h2>";
      	echo "<pre>";
      	print_r($v);
      	echo "</pre>";
      }

      function curlGet($u){
        // create curl resource
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $u);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_ENCODING , '');
        curl_setopt($ch, CURLOPT_USERAGENT, 'MyUserAgent');
        $output = curl_exec($ch);
        curl_close($ch);

        return $output;
      }


    ?>

  </body>
</html>
