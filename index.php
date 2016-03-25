<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Near Earth Objects</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="style.css">
    <script src="js/jquery-2.2.1.min.js"></script>
    <script src="js/d3.min.js"></script>
  </head>
  <body>

    <?php
      require "key.php";//variable called $apiKey

      //get data from NASA Near Earth Objects
      //$url= "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=";
      $url= "https://api.nasa.gov/neo/rest/v1/neo/browse/?api_key=";

      $apidata = json_decode(curlGet($url.$apiKey),true);
      $apidata=$apidata["near_earth_objects"];

      $asteroids = [];

    
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

    <div class="container">
      <h2> Near Earth Objects </h2>
      <section id="chart">
        <div class="item">Star  </div>
        <div class="item">Ship  </div>
        <div class="item">Cup  </div>

      </section>
    </div>


    <script>
    /*
      var data = <?php echo json_encode($apidata); ?>;
      var dataArray = $.map(data, function(value, index) {
        return [value];
      });

      console.log(dataArray[2][0])
*/
    </script>
  </body>
</html>
