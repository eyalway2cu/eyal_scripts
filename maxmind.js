<script>
var onSuccess = function(location){
var redirect = "http://atdconf.com";
var country = location.country.iso_code.toLowerCase();
  if (country != "il") {
    document.location = redirect;
  }
};

var onError = function(error){
  console.log(
      "Error:\n\n"
      + JSON.stringify(error, undefined, 4)
  );
};

geoip2.country(onSuccess, onError);
<script>