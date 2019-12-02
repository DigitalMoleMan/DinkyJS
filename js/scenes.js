class Scene {
    constructor(meta = {}, gameObjects = []) {
        for (let property in meta) this[property] = sceneMeta[property];
        this.gameObjects = gameObjects;

        for (let gameObject of this.gameObjects) gameObject.parent = this;
    }

    update() {
        for (let gameObject of this.gameObjects) gameObject.update();
    }

    render() {
        for (let gameObject of this.gameObjects) gameObject.render();
    }
}

let scenes = {
    game: new Scene({
    },
        [
            new Background({
                posX: 0,
                posY: 0,
                scaleX: canvas.width,
                scaleY: canvas.height
            }),
            new Player({
                position: new Vector(0, 0),
                scaleX: 10,
                scaleY: 10,
                color: "#fff"
            }),
        ])
}