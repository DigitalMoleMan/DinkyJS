

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 512;
document.body.appendChild(canvas);

fillRect = (x, y, width, height, color) => {
    if (color) ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

strokePath = (points = [], color) => {
    if (color) ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();
}