class Collider {
    constructor(position, xOffsetLeft, xOffsetRight, yOffsetUp, yOffsetDown) {
        this.position = position;
        this.width = xOffsetLeft + xOffsetRight;
        this.height = yOffsetUp + yOffsetDown;
        this.topLeft = new Vector(position.x - xOffsetLeft, position.y - yOffsetUp);
        this.topRight = new Vector(position.x + xOffsetRight, position.y - yOffsetUp);
        this.bottomLeft = new Vector(position.x - xOffsetLeft, position.y + yOffsetDown);
        this.bottomRight = new Vector(position.x + xOffsetRight, position.y + yOffsetDown);
    }

    draw() {
        fillRect(this.position.x - 5, this.position.y - 5, 10, 10, "#f00");
        strokeRect(this.position.x - this.xOffsetLeft, this.position.y - this.yOffsetUp, this.width, this.height, "#f00", 5)
    }
}