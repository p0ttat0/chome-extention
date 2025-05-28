//sets scaling pre parsing
const defaultFontSize = screen.height/1080*16;
const scale = (localStorage.getItem("scale") == NaN) ? 1 : localStorage.getItem("scale");
const body = document.getElementsByTagName('html')[0];
body.style.fontSize = `${scale*defaultFontSize}px`;