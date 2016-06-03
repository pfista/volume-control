const HOST = 'http://127.0.0.1:8082'

const xhttp = new XMLHttpRequest();
xhttp.addEventListener("readystatechange", processRequest, false);

function processRequest(e) {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    var response = JSON.parse(xhttp.responseText);
    console.log(response);
    document.getElementById("outputvolume").innerHTML = response["outputVolume"];
    document.getElementById("inputvolume").innerHTML = response["inputVolume"];
    document.getElementById("alertvolume").innerHTML = response["alertVolume"];
    document.getElementById("muted").innerHTML = response["outputMuted"];
  }
}

function updateVolume(volume) {
  console.log("Trying to set volume to: ", volume);
  xhttp.open("GET", HOST+'/volume?outputVolume='+volume, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}

let slider = document.getElementById('volumeSlider');
slider.oninput = function() {
  console.log("slider changed to: " + slider.value);
  updateVolume(slider.value);
}

slider.onchange = updateVolume(slider.value);
