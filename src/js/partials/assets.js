///--- Sprites ---///
// Volume control
const sprVolume = [];
sprVolume[0] = loadSprite("./assets/images/controls/volume-0.png");
sprVolume[1] = loadSprite("./assets/images/controls/volume-1.png");
sprVolume[2] = loadSprite("./assets/images/controls/volume-2.png");
sprVolume[3] = loadSprite("./assets/images/controls/volume-3.png");

///--- Gifs ---///
const gifPreloader = new AnimatedGif();
gifPreloader.loadFrames(
    "./assets/images/animations/preloader/preloader",
    2,
    "png",
    [0, 0]
);
gifPreloader.setTransform(0, 0, -1, -1);
gifPreloader.start();

///--- Audio ---///

///--- Fonts ---///
// Standard FontStuck
Text.loadFont(
    "FontStuck",
    "./assets/fonts/fontstuck.png",
    "./assets/fonts/fontstuck.json"
);
