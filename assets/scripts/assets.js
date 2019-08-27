/// --- Sprites --- ///
// Volume control
loadSprite("./assets/images/controls/Volume_01.png");
loadSprite("./assets/images/controls/Volume_02.png");
loadSprite("./assets/images/controls/Volume_03.png");
loadSprite("./assets/images/controls/Volume_04.png");

// Other
loadSprite("./assets/images/BG1.png");
loadSprite("./assets/images/BG2.png");
loadSprite("./assets/images/Arrow.png");
loadSprite("./assets/images/TextBox1.png");
loadSprite("./assets/images/TextBox2.png");
loadSprite("./assets/images/FuckButtons.png");
loadSprite("./assets/images/Erisolsprite.png");


/// --- Gifs --- ///
// Preloader
let gifPreloader = new AnimatedGif();
gifPreloader.loadFrames("./assets/images/animations/Preloader/Preloader", 2, "png", [
    0, 0
]);
gifPreloader.setTransform(0, 0, -1, -1);
gifPreloader.start();

// Easteregg
let gifEasteregg = new AnimatedGif();
gifEasteregg.loadFrames("./assets/images/animations/Easteregg/Easteregg", 22, "png", [
    20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20
]);
gifEasteregg.setTransform(216, 128, -1, -1);

// Erisolsprite Hero
let gifErisolpriteHero = new AnimatedGif();
gifErisolpriteHero.loadFrames("./assets/images/animations/Erisolsprite Hero/Erisolsprite_Hero", 12, "png", [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
gifErisolpriteHero.setTransform(521, 131, 442.96, 674.61);

// Jasprosesprite Back
let gifJasprosespriteBack = new AnimatedGif();
gifJasprosespriteBack.loadFrames( "./assets/images/animations/Jasprosesprite Back/Jasprosesprite_Back", 2, "png", [
    0, 0
]);
gifJasprosespriteBack.setTransform(0, 0, -1, -1);


/// --- Audio --- ///
// Main background audio loop
loadAudio("./assets/audio/Elevatorstuck_Meows.mp3");
audio[0].loop = true;


/// --- Fonts --- ///
// Standard FontStuck
Text.loadFont("FontStuck", "./assets/fonts/FontStuck.png", "./assets/fonts/FontStuck.json");