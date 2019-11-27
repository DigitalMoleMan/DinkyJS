

var keys = {}

document.addEventListener("keydown", (e) => {
    if (keys[e.code] !== "pressed" && keys[e.code] !== "held") keys[e.code] = "pressed"
});

document.addEventListener("keyup", (e) => keys[e.code] = "released");

updateInput = () => {
    for (let key in keys) if (keys[key] == "pressed") keys[key] = "held"
}