class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        return this;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
    }

    mult(n) {
        this.x *= n;
        this.y *= n;
    }

    div(n) {
        this.x /= n;
        this.y /= n;
    }

    mag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    normalize() {
        let m = this.mag()
        if (m > 0) this.div(m);
    }

    getAdd(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    getMult(n) {
        return new Vector(this.x * n, this.y * n);
    }

    getNormalized() {
        let m = this.mag()
        let normalizedVector = new Vector();
        if (m > 0) normalizedVector = new Vector(this.x / m, this.y / m);
        return normalizedVector;
    }

    getAngle() {
        return Math.atan2(this.y, this.x);
    }
}