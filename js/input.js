/*INPUTS*/

class Input {
    constructor() { }
}

class ButtonInput extends Input {
    constructor() {
        super();
        this.isPressed = false;
        this.isHeld = false;
    }
}


const input = {
    up: new ButtonInput(),
    left: new ButtonInput(),
    down: new ButtonInput(),
    right: new ButtonInput(),

    jump: new ButtonInput()
}

/*BINDS*/

class Bind {
    constructor(boundInput) {
        this.boundInput = boundInput
    }
}

class KeyBind extends Bind {
    constructor(boundInput) {
        super(boundInput);
    }

}

var keys = {
    KeyW: new KeyBind(input.up),
    KeyA: new KeyBind(input.left),
    KeyS: new KeyBind(input.down),
    KeyD: new KeyBind(input.right),

    Space: new KeyBind(input.jump)
}

document.addEventListener("keydown", (e) => {
    let key = keys[e.code];
    if (!key.boundInput.isHeld) key.boundInput.isPressed = true;
    key.boundInput.isHeld = true;
});

document.addEventListener("keyup", (e) => {
    let key = keys[e.code];
    key.boundInput.isHeld = false
});

updateInput = () => {
    for (let i in input) {
        input[i].isPressed = false;
    }
}

