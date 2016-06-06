const HOST = 'http://mik.local:8082'

const xhttp = new XMLHttpRequest();
xhttp.addEventListener("readystatechange", processRequest, false);

function processRequest(e) {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    var response = JSON.parse(xhttp.responseText);
    console.log(response);
    document.getElementById("outputvolume").innerHTML = response["outputVolume"];
    $(".progress-warning").attr("value", Number(response["outputVolume"]));
    slider.value = Number(response["outputVolume"])
    $(".progress-warning").removeClass("progress-striped");
    $(".progress-warning").removeClass("progress-animated");
    //document.getElementById("inputvolume").innerHTML = response["inputVolume"];
    //document.getElementById("alertvolume").innerHTML = response["alertVolume"];
    //document.getElementById("muted").innerHTML = response["outputMuted"];
  }
}

function updateVolume(volume) {
  $(".progress-warning").addClass("progress-striped");
  $(".progress-warning").addClass("progress-animated");
  xhttp.open("GET", HOST+'/volume?outputVolume='+volume, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}

var slider = document.getElementById('volumeSlider');
slider.oninput = function() {
  document.getElementById("outputvolume").innerHTML = slider.value;
  $(".progress-warning").attr("value", slider.value);
  updateVolume(slider.value);
}

function getVolume() {
  xhttp.open("GET", HOST+'/volume', true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}

getVolume();
