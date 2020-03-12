/// --- Sprites --- ///
// Volume control
let sprVolume = [];
sprVolume[0] = loadSprite("./assets/images/controls/Volume_01.png");
sprVolume[1] = loadSprite("./assets/images/controls/Volume_02.png");
sprVolume[2] = loadSprite("./assets/images/controls/Volume_03.png");
sprVolume[3] = loadSprite("./assets/images/controls/Volume_04.png");


/// --- Gifs --- ///
// Preloader
let gifPreloader = new AnimatedGif();
gifPreloader.loadFrames("./assets/images/animations/Preloader/Preloader", 2, "png", [
    0, 0
]);
gifPreloader.setTransform(0, 0, -1, -1);
gifPreloader.start();


/// --- Audio --- ///
// Main background audio loop
//let audioMain = loadAudio("./assets/audio/main.mp3");
//audioMain.loop = true;


/// --- Fonts --- ///
// Standard FontStuck
Text.loadFont("FontStuck", "./assets/fonts/FontStuck.png", "./assets/fonts/FontStuck.json");