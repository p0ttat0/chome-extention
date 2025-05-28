let scaleSlider = document.getElementById("scaling");
let scaleDisplay =document.getElementById("scaleDisplay")
let weatherApiKey = document.getElementById("weatherApiInput");
scaleSlider.value = localStorage.getItem("scale")
scaleDisplay.innerHTML = `Scale: ${Math.round(scaleSlider.value*100)}%`

scaleSlider.oninput = function() {
    localStorage.setItem("scale", scaleSlider.value)
    scaleDisplay.innerHTML = `Scale: ${Math.round(scaleSlider.value*100)}%`
}