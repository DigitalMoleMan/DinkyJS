importImage = (path) => {
    let img = new Image();
    img.src = path;
    return img;
}

class SpriteSheet {
    constructor(imageSource, celWidth, celHeight) {
        this.imgSrc = imageSource;
        this.celWidth = celWidth;
        this.celHeight = celHeight;
    }
}

var sprites = {
    player: {
        bands: new SpriteSheet(importImage('assets/images/bands_sheet.png'), 32, 32)
    }
}