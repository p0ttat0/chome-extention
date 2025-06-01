let scaleSlider = document.getElementById("scaling");
let speedSlider = document.getElementById("spinSpeed");
let scaleDisplay = document.getElementById("scaleDisplay");
let speedSliderDisplay = document.getElementById("speedSliderDisplay");
let extentionToggle = document.getElementById("extentionToggle");
let weatherApiKey = document.getElementById("weatherApiInput");
scaleSlider.value = localStorage.getItem("scale")
speedSlider.value = localStorage.getItem("speed")
scaleDisplay.innerHTML = `Scale: ${Math.round(scaleSlider.value*100)}%`
speedSliderDisplay.innerHTML = `Slot Machine Spin Speed: ${speedSlider.value}X`

scaleSlider.oninput = function() {
    localStorage.setItem("scale", scaleSlider.value);
    scaleDisplay.innerHTML = `Scale: ${Math.round(scaleSlider.value*100)}%`
}

speedSlider.oninput = function() {
    localStorage.setItem("speed", speedSlider.value);
    speedSliderDisplay.innerHTML = `Slot Machine Spin Speed: ${speedSlider.value}X`
}

extentionToggle.oninput = function() {
    localStorage.setItem("extentionToggle", extentionToggle.checked);
}