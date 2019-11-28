class Key {
    constructor() {
        this.pressed = false;
        this.held = false;
    }
}

var keys = {
    KeyW: new Key(),
    KeyA: new Key(),
    KeyS: new Key(),
    KeyD: new Key()
}

document.addEventListener("keydown", (e) => {
    let key = keys[e.code];
    if (!key.held) key.pressed = true;
    key.held = true;
});

document.addEventListener("keyup", (e) => {
    let key = keys[e.code];
    key.held = false
});

updateInput = () => {
    for (let i in keys) {
        if (keys[i].pressed) keys[i].pressed = false;
    }
}

