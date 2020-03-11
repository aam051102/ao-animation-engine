/// --- Sprites --- ///
// Volume control
let sprVolume = [];
sprVolume[0] = loadSprite("./assets/images/controls/Volume_01.png");
sprVolume[1] = loadSprite("./assets/images/controls/Volume_02.png");
sprVolume[2] = loadSprite("./assets/images/controls/Volume_03.png");
sprVolume[3] = loadSprite("./assets/images/controls/Volume_04.png");

// Other
let sprBorder = loadSprite("./assets/images/Border.png");

/// --- Gifs --- ///
// Preloader
let gifPreloader = new AnimatedGif();
gifPreloader.loadFrames("./assets/images/animations/Preloader/Preloader", 1, "png", [
    0
]);
gifPreloader.setTransform(0, 0, -1, -1);
gifPreloader.start();


/// --- Audio --- ///
// Main background audio loop
let audioMain = loadAudio("./assets/audio/TheFurthestRing.mp3");
audioMain.loop = true;

// Ending drama
let audioDramaEnding = loadAudio("./assets/audio/DramaWakeUp.mp3");

/// --- Fonts --- ///
// Standard FontStuck
Text.loadFont("FontStuck", "./assets/fonts/FontStuck.png", "./assets/fonts/FontStuck.json");