const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 512;
document.body.appendChild(canvas);

fillRect = (x, y, width, height, color) => {
    if (color) ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}