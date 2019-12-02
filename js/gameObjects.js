class GameObject {
    constructor(params = {}, children = []) {
        this.position = new Vector();
        this.zIndex = 0;
        this.hidden = false;

        this.children = children;

        for (let property in params) this[property] = params[property];
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

class PhysicsObject extends GameObject {
    constructor(params, children) {
        super(params, children);
        this.gravity = new Vector(0, .1);

        this.mass = .5;

        this.velocity = new Vector();
        this.acceleration = new Vector();
    }

    applyForce(force) {
        let f = force.getDiv(this.mass);
        this.acceleration.add(f);
    }

    getFriction() {
        let c = .01;
        let normal = 1;
        let frictionMag = c * normal;
        return this.velocity.getMult(-1).getNormalized().getMult(frictionMag);;
    }

    updatePhysics() {


        this.applyForce(this.getFriction())

        this.applyForce(this.gravity);

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        this.acceleration.mult(0);
    }
}

class Player extends PhysicsObject {
    constructor(params = {}, children = []) {
        super(params, children)

        this.moveSpeed = .05;
        this.jumpHeight = 4;


        this.moveDirection = new Vector();

    }

    logic() {
        this.moveDirection = new Vector()
        if (input.up.isHeld) this.moveDirection.y--;
        if (input.left.isHeld) this.moveDirection.x--;
        if (input.down.isHeld) this.moveDirection.y++;
        if (input.right.isHeld) this.moveDirection.x++;


        this.applyForce(this.moveDirection.getNormalized().getMult(this.moveSpeed));




        if (this.position.x > (canvas.width / 2)) {
            this.position.x = (canvas.width / 2);
            this.velocity.x *= 0;
        }
        if (this.position.x < (-(canvas.width / 2) + this.scaleX * 2)) {
            this.velocity.x *= 0;
            this.position.x = -(canvas.width / 2) + this.scaleX * 2;
        }
        if (this.position.y > (canvas.height / 2)) {
            this.velocity.y *= 0;
            this.position.y = (canvas.height / 2);

            this.isGrounded = true;

        } else this.isGrounded = false;

        if (input.jump.isPressed) this.jump();

        if (!input.jump.isHeld && this.velocity.y < 0) this.velocity.y /= 1.05


        this.updatePhysics()
    }

    jump() {
        if (this.isGrounded) this.applyForce(new Vector(0, -this.jumpHeight));
    }

    draw() {
        fillRect(this.position.x - this.scaleX, this.position.y - this.scaleY, this.scaleX * 2, this.scaleX * 2, this.color)

        drawSprite(sprites.player.bands, Math.round(this.position.x), 0, this.position.x, this.position.y - this.scaleY * 2)

        try {

            this.fromWall = this.intersection.getSub(this.position).mag();
            console.log(this.intersection.getSub(this.position).mag());
            fillRect(this.intersection.x - 5, this.intersection.y - 5, 10, 10, "#fff")
        } catch{ }



        strokePath([
            this.position,
            this.velocity.getNormalized().getMult().getAdd(this.position)
        ], "#f00")

    }
}

