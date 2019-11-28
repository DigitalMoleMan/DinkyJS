
let settings = {
    gameplay: {

    }
}

let activeScene = scenes.game;

window.onload = () => {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    loop(Date.now());
}

let deltaTime = 0;
let previousTime = 0;

loop = (time) => {
    requestAnimationFrame(loop);

    if (previousTime == 0) previousTime = time - 1;
    deltaTime = ((time - previousTime) * .1);

    previousTime = time;

    // console.log(deltaTime)

    activeScene.update();
    activeScene.render();
    updateInput();
}

