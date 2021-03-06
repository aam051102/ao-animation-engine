import "./src/js/partials/bwaudio.js";

/// Variables
// Canvas
let DOMcanvas, DOMcanvasBuffer, DOMcanvasSprite;
let ctx, ctxBuffer, ctxSprite;

// Volume
let volume = 3;

// Mouse
let mousex = 0;
let mousey = 0;

// Percentage counter
let totalAssets = 0;
let loadedAssets = 0;

// Sprites
let sprites = [];
let loadedSprites = [];
let allSpritesLoaded = false;
let currentSprite = 0;

// Audio
let audio = [];
let loadedAudio = [];
let allAudioLoaded = false;
let currentAudio = 0;

// Gifs
let gifs = [];
let loadedGifs = [];
let allGifsLoaded = false;
let currentGif = 0;

// Fonts
let fonts = new Map();
let allFontsLoaded = false;
let loadedFonts = [];

// Checks if various assets are loaded
function checkLoadAssets() {
    // Sprites
    if (!allSpritesLoaded) {
        allSpritesLoaded = true;

        for (var n = 0; n < sprites.length; n++) {
            if (loadedSprites[n] == false) {
                allSpritesLoaded = false;
                break;
            }
        }
    }

    // Audio
    if (!allAudioLoaded) {
        allAudioLoaded = true;

        for (var n = 0; n < audio.length; n++) {
            if (loadedAudio[n] == false) {
                allAudioLoaded = false;
                break;
            }
        }
    }

    // Gifs
    if (!allGifsLoaded) {
        allGifsLoaded = true;

        for (var n = 0; n < gifs.length; n++) {
            if (loadedGifs[n] == false) {
                allGifsLoaded = false;
                break;
            }
        }
    }

    // Fonts
    if (!allFontsLoaded) {
        allFontsLoaded = true;

        for (var n = 0; n < fonts.length; n++) {
            if (loadedFonts[n] == false) {
                allFontsLoaded = false;
                break;
            }
        }
    }
}

// Fix canvas ratio
function fixRatio(context, canvas) {
    let devicePixelRatio = window.devicePixelRatio || 1;
    let backingStoreRatio =
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
    let ratio = devicePixelRatio / backingStoreRatio;

    if (devicePixelRatio !== backingStoreRatio) {
        let oldWidth = canvas.width;
        let oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + "px";
        canvas.style.height = oldHeight + "px";

        context.scale(ratio, ratio);
    }
}

// Set up canvas
function setupCanvas() {
    // Buffer canvas and context
    DOMcanvasBuffer = document.createElement("canvas");
    DOMcanvasBuffer.id = "bufferCanvas";
    DOMcanvasBuffer.width = DOMcanvas.width;
    DOMcanvasBuffer.height = DOMcanvas.height;

    // Sprite canvas and context
    DOMcanvasSprite = document.createElement("canvas");
    DOMcanvasSprite.id = "spriteCanvas";
    DOMcanvasSprite.width = DOMcanvas.width;
    DOMcanvasSprite.height = DOMcanvas.height;

    // Main canvas context
    ctx = DOMcanvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.font = "bold 14px Courier New";
    ctx.textAlign = "center";
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    fixRatio(ctx, DOMcanvas);

    // Buffer
    document.body.appendChild(DOMcanvasBuffer);

    ctxBuffer = DOMcanvasBuffer.getContext("2d");
    ctxBuffer.fillStyle = ctx.fillStyle;
    ctxBuffer.font = ctx.font;
    ctxBuffer.textAlign = ctx.textAlign;
    ctxBuffer.webkitImageSmoothingEnabled = false;
    ctxBuffer.msImageSmoothingEnabled = false;
    ctxBuffer.imageSmoothingEnabled = false;

    fixRatio(ctxBuffer, DOMcanvasBuffer);

    // Sprite
    document.body.appendChild(DOMcanvasSprite);

    ctxSprite = DOMcanvasSprite.getContext("2d");
    ctxSprite.webkitImageSmoothingEnabled = false;
    ctxSprite.msImageSmoothingEnabled = false;
    ctxSprite.imageSmoothingEnabled = false;
}

// Add padding
function addPadding(input, char, length) {
    let output = input.toString();

    while (output.length < length) {
        output = char + output;
    }

    return output;
}

// Hexadecimal to RGB
function hexToRgb(color) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    color = color.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : {
              r: 0,
              g: 0,
              b: 0,
          };
}

// Set volume
function updateVolume() {
    for (let i = 0; i < audio.length; i++) {
        audio[i].setVolume(volume != 0 ? 0.33 * volume : 0);
    }
}

// Sprite loading function
function loadSprite(path) {
    sprites[currentSprite] = new Image();
    loadedSprites[currentSprite] = false;
    sprites[currentSprite].src = path;
    totalAssets++;

    sprites[currentSprite].onload = function () {
        loadedSprites[sprites.indexOf(this)] = true;
        loadedAssets++;
    };

    currentSprite++;

    return sprites[currentSprite - 1];
}

// Audio loading function
function loadAudio(path) {
    audio[currentAudio] = new BWAudio(path);
    loadedAudio[currentAudio] = false;
    totalAssets++;

    let audioPos = currentAudio;
    audio[currentAudio].oncanplay = () => {
        loadedAudio[audioPos] = true;
        loadedAssets++;
    };

    currentAudio++;

    return audio[currentAudio - 1];
}

// Text class
class Text {
    // Get text width
    static getTextWidth(text, font, size) {
        let width = 0;
        let fontShortcut = fonts.get(font);

        for (let i = 0; i < text.length; i++) {
            // Line breaks
            if (text[i] == " ") {
                width += fontShortcut.spaceWidth * size;

                continue;
            }

            width +=
                (fontShortcut.sprites.get(text[i]).z +
                    fontShortcut.glyphSpacing) *
                size;
        }

        return width;
    }

    // Text loading function
    static loadFont(font, src, data) {
        let thisFont = new TextFont(src);
        let thisFontPos = thisFont.index;
        totalAssets++;
        loadedFonts[thisFontPos] = false;

        // Glyph loading
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let myObj = JSON.parse(this.responseText);

                for (let i = 0; i < myObj.glyphs.length; i++) {
                    thisFont.add(
                        myObj.glyphs[i].glyph,
                        myObj.glyphs[i].x,
                        myObj.glyphs[i].y,
                        myObj.glyphs[i].width,
                        myObj.glyphs[i].height
                    );
                }

                thisFont.glyphSpacing = myObj.glyphSpacing;
                thisFont.breakHeight = myObj.breakHeight;
                thisFont.lineHeight = myObj.lineHeight;
                thisFont.spaceWidth = myObj.spaceWidth;

                loadedAssets++;
                loadedFonts[thisFontPos] = true;
            }
        };
        xmlhttp.open("GET", data, true);
        xmlhttp.send();

        fonts.set(font, thisFont);
    }

    // Text drawing function
    static drawText(text, x, y, font, colour, size) {
        let offsetX = 0;
        let offsetY = 0;
        let fontShortcut = fonts.get(font);

        for (let i = 0; i < text.length; i++) {
            // Line breaks
            if (text[i] == "\\" && text[i + 1] == "n") {
                offsetX = 0;
                offsetY +=
                    (fontShortcut.lineHeight + fontShortcut.breakHeight) * size;
                i += 1;

                continue;
            } else if (text[i] == " ") {
                offsetX += fontShortcut.spaceWidth * size;

                continue;
            }

            // Drawing
            let spriteShortcut = fontShortcut.sprites.get(text[i]);

            if (spriteShortcut !== undefined) {
                ctxSprite.drawImage(
                    fontShortcut.source,
                    spriteShortcut.x,
                    spriteShortcut.y,
                    spriteShortcut.z,
                    spriteShortcut.w,
                    x + offsetX,
                    y + offsetY,
                    spriteShortcut.z * size,
                    spriteShortcut.w * size
                );

                // Glyph movement
                offsetX +=
                    (spriteShortcut.z + fontShortcut.glyphSpacing) * size;
            } else {
                console.log("Glyph missing: " + text[i]);
                break;
            }
        }

        // Recolour
        var spriteData = ctxSprite.getImageData(
            0,
            0,
            DOMcanvasSprite.width,
            DOMcanvasSprite.height
        );
        var data = spriteData.data;

        for (var p = 0; p < data.length; p += 4) {
            data[p + 0] = colour.r; // Red
            data[p + 1] = colour.g; // Green
            data[p + 2] = colour.b; // Blue
        }

        ctxSprite.putImageData(spriteData, 0, 0);
        ctxBuffer.drawImage(DOMcanvasSprite, 0, 0);
        ctxSprite.clearRect(
            0,
            0,
            DOMcanvasSprite.width,
            DOMcanvasSprite.height
        );
    }
}

// Text font object
class TextFont {
    constructor(src) {
        this.source = new Image();
        this.source.src = src;

        this.sprites = new Map();
        this.glyphSpacing = 0;
        this.breakHeight = 0;
        this.lineHeight = 0;
        this.spaceWidth = 0;

        this.index = Object.entries(fonts).length;
    }

    // Add sprite
    add(glyph, offsetx, offsety, width, height) {
        this.sprites.set(glyph, new Vector4(offsetx, offsety, width, height));
    }
}

// Animated Gif object
class AnimatedGif {
    constructor() {
        this.frames = [];
        this.loadedFrames = [];
        this.timing = [];
        this.curTiming = 0;
        this.curFrame = 0;
        this.isPlaying = false;
        this.transform = new Vector4();
    }

    loadFramesSpecific(frames, timing) {
        this.timing = timing;

        gifs[currentGif] = this;
        loadedGifs[currentGif] = false;

        for (let i = 0; i < frames.length; i++) {
            this.frames[i] = new Image();
            this.frames[i].src = frames[i];

            this.loadedFrames[i] = false;

            this.frames[i].onload = (e) => {
                this.loadedFrames[
                    this.frames.indexOf(e.target == null ? e.path[0] : e.target)
                ] = true;

                if (frames.length == this.loadedFrames.length) {
                    let hasFailed = false;

                    for (let n = 0; n < this.loadedFrames.length; n++) {
                        if (this.loadedFrames[n] == false) {
                            hasFailed = true;
                            break;
                        }
                    }

                    if (!hasFailed) {
                        loadedGifs[gifs.indexOf(this)] = true;
                    }
                }
            };
        }

        currentGif++;
    }

    loadFrames(path, amount, fileType, timing) {
        this.timing = timing;

        gifs[currentGif] = this;
        loadedGifs[currentGif] = false;

        for (let i = 0; i < amount; i++) {
            this.frames[i] = new Image();
            this.frames[i].src =
                path + "_" + addPadding(i + 1, "0", 2) + "." + fileType;

            this.loadedFrames[i] = false;

            this.frames[i].onload = (e) => {
                this.loadedFrames[
                    this.frames.indexOf(e.target == null ? e.path[0] : e.target)
                ] = true;

                if (amount == this.loadedFrames.length) {
                    let hasFailed = false;

                    for (let n = 0; n < this.loadedFrames.length; n++) {
                        if (this.loadedFrames[n] == false) {
                            hasFailed = true;
                            break;
                        }
                    }

                    if (!hasFailed) {
                        loadedGifs[gifs.indexOf(this)] = true;
                    }
                }
            };
        }

        currentGif++;
    }

    setTransform(x, y, width, height) {
        this.transform = new Vector4(x, y, width, height);
    }

    start() {
        this.isPlaying = true;
    }

    stop() {
        this.isPlaying = false;
    }

    reset() {
        this.curFrame = 0;
        this.curTiming = this.timing[0];
    }

    update() {
        if (this.transform.z !== -1 && this.transform.w !== -1) {
            ctxBuffer.drawImage(
                this.frames[this.curFrame],
                this.transform.x,
                this.transform.y,
                this.transform.z,
                this.transform.w
            );
        } else {
            ctxBuffer.drawImage(
                this.frames[this.curFrame],
                this.transform.x,
                this.transform.y
            );
        }

        if (this.isPlaying) {
            if (this.curTiming <= 0) {
                if (this.curFrame < this.frames.length - 1) {
                    this.curFrame++;
                } else {
                    this.curFrame = 0;
                }

                this.curTiming = this.timing[this.curFrame];
            } else {
                this.curTiming--;
            }
        }
    }
}

// Interactable
class Interactable {
    constructor(x, y, width, height) {
        this.transform = new Vector4(x, y, width, height);
    }

    check() {
        if (
            mousex >= this.transform.x &&
            mousex <= this.transform.x + this.transform.z &&
            mousey >= this.transform.y &&
            mousey <= this.transform.y + this.transform.w
        ) {
            return true;
        }

        return false;
    }
}

// Vector4
function Vector4(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
}

// Get index of item in sprites array
function getSpriteIndex(pointer) {
    return sprites.indexOf(pointer);
}

// Fade
class Fade {
    constructor(speed) {
        this.curFade = 0.0;
        this.speed = speed;
    }

    update(drawFunc) {
        ctxBuffer.globalAlpha = this.curFade;

        drawFunc();

        ctxBuffer.globalAlpha = 1;

        this.curFade += speed;
    }
}
