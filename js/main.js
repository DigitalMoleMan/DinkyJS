
let settings = {
    gameplay: {

    }
}

let activeScene = scenes.game;
let time = 0;

window.onload = () => {

    ctx.translate(canvas.width / 2, canvas.height / 2);
    loop();
}

loop = () => {
    requestAnimationFrame(loop);
    time++
    activeScene.update();
    activeScene.render();
    updateInput();
}

