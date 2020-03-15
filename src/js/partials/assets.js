/// --- Preloader Assets --- ///
// Preloader
let gifPreloader = new AnimatedGif();
gifPreloader.loadFrames("./assets/images/animations/Preloader/Preloader", 1, "png", [
    0
]);
gifPreloader.setTransform(0, 0, -1, -1);
gifPreloader.start();

// Standard FontStuck
Text.loadFont("FontStuck", "./assets/fonts/FontStuck.png", "./assets/fonts/FontStuck.json");

/// --- Sprites --- ///


/// --- Gifs --- ///


/// --- Audio --- ///
// Main background audio loop
let audioMain = loadAudio("./assets/audio/TheFurthestRing.mp3");
audioMain.loop = true;

/// --- Fonts --- ///
