class GameObject {
    constructor(params = {}, children = []) {
        this.posX = 0;
        this.posY = 0;
        this.zIndex = 0;
        this.hidden = false;

        for (let property in params) this[property] = params[property];

        this.children = children;

        for (let child of this.children) child.parent = this;
    }

    update() {
        this.logic();
        for (let child of this.children) child.update();
    }

    logic() {

    }

    render(anchorX = 0, anchorY = 0) {
        if (!this.hidden) {
            ctx.save();
            ctx.translate(-this.scaleX, -this.scaleY);
            ctx.translate(anchorX, anchorY);
            this.draw();
            for (let child of this.children) {
                ctx.save();
                child.render(this.posX + this.scaleX, this.posY + this.scaleY);
                ctx.restore();
            }

            ctx.restore();
        }
    }

    draw() {

    }
}

class Background extends GameObject {
    constructor(params = {}) {
        super(params);
    }

    draw() {
        fillRect(this.posX, this.posY, this.scaleX * 2, this.scaleY * 2, this.color)
    }
}

class TestBox extends GameObject {
    constructor(params = {}, children = []) {
        super(params, children);
    }

    logic() {

    }

    draw() {
        fillRect(this.posX, this.posY, this.scaleX * 2, this.scaleX * 2, this.color)
    }
}

class Player extends GameObject {
    constructor(params = {}, children = []) {
        super(params, children)
        this.velX = 0;
        this.velY = 0;
        this.friction = 1.2;
        this.weight = 1;
    }

    logic() {
        if (keys.KeyW == "held") this.velY--;
        if (keys.KeyA == "held") this.velX--;
        if (keys.KeyS == "held") this.velY++;
        if (keys.KeyD == "held") this.velX++;

        this.velX /= this.friction;
        this.velY /= this.friction;

        this.posX += this.velX;
        this.posY += this.velY;
    }

    draw() {
        fillRect(this.posX, this.posY, this.scaleX * 2, this.scaleX * 2, this.color)
    }
}