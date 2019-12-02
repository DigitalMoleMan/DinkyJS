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
    constructor(params = {}) {
        super(params);
        this.velocity = new Vector();
        this.mass = 1;

    }

    calculatePhysics() {
        this.velY = g * deltaTime;
    }
}

class Player extends GameObject {
    constructor(params = {}, children = []) {
        super(params, children)

        this.moveDirection = new Vector()
        this.velocity = new Vector();
        this.friction = .2;
    }

    logic() {
        this.moveDirection = new Vector()
        if (input.up.isHeld) this.moveDirection.y--;
        if (input.left.isHeld) this.moveDirection.x--;
        if (input.down.isHeld) this.moveDirection.y++;
        if (input.right.isHeld) this.moveDirection.x++;



        this.velocity.add(this.moveDirection.getNormalized());

        this.velocity.x /= (this.friction + 1);
        this.velocity.y /= (this.friction + 1);


        this.position.add(this.velocity)





    }

    draw() {
        fillRect(this.position.x - this.scaleX, this.position.y - this.scaleY, this.scaleX * 2, this.scaleX * 2, this.color)

        let vec1 = new Vector(50, 50)
        let vec2 = new Vector(100, 50)

        strokePath([
            vec1,
            vec2
        ], "#fff")

        let intersection = getIntersection([this.position, this.velocity.getNormalized().getAdd(this.position)], [vec1, vec2]);



        try {



            let intV = new Vector(intersection.x, intersection.y);
            console.log(intV.getSub(this.position).mag());
            fillRect(intersection.x, intersection.y, 10, 10, "#fff")
        } catch{ }



        strokePath([
            this.position,
            this.velocity.getNormalized().getMult(1000).getAdd(this.position)
        ], "#fff")

    }
}

