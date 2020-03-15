@import "./node_modules/bezier-easing/dist/bezier-easing.js"
@import "./mods/HighResolutionTimer.js"

// Frames Per Second of animation
let FPS = 24;
let CANVAS_WIDTH = 650;
let CANVAS_HEIGHT = 450;

// Bezier curve standards
const BEZIER_LINEAR = BezierEasing(0.0, 0.0, 1.0, 1.0);
const BEZIER_EASE = BezierEasing(0.25, 0.1, 0.25, 1.0);
const BEZIER_EASE_IN = BezierEasing(0.42, 0.0, 1.0, 1.0);
const BEZIER_EASE_IN_OUT = BezierEasing(0.42, 0.0, 0.58, 1.0);
const BEZIER_EASE_OUT = BezierEasing(0.0, 0.0, 0.58, 1.0);

/// Variables
// Canvas
let DOMcanvas, DOMcanvasBuffer, DOMcanvasSprite;
let ctx, ctxBuffer, ctxSprite;

// Volume
let DOMvolumeButton;
let volume = 3;

// Mouse
let mousex = 0;
let mousey = 0;

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


let loadingPercentage = 0;


// Checks if various assets are loaded
function checkLoadAssets() {
    // Sprites
    if(!allSpritesLoaded) {
        allSpritesLoaded = true;

        for (var n = 0; n < sprites.length; n++) {
            if (loadedSprites[n] == false) {
                allSpritesLoaded = false;
                break;
            }
        }
    }


    // Audio
    if(!allAudioLoaded) {
        allAudioLoaded = true;

        for (var n = 0; n < audio.length; n++) {
            if (loadedAudio[n] == false) {
                allAudioLoaded = false;
                break;
            }
        }
    }


    // Gifs
    if(!allGifsLoaded) {
        allGifsLoaded = true;

        for (var n = 0; n < gifs.length; n++) {
            if (loadedGifs[n] == false) {
                allGifsLoaded = false;
                break;
            }
        }
    }


    // Fonts
    if(!allFontsLoaded) {
        allFontsLoaded = true;

        for (var n = 0; n < fonts.length; n++) {
            if (loadedFonts[n] == false) {
                allFontsLoaded = false;
                break;
            }
        }
    }

    // Calculate percentage of loading complete
    loadingPercentage = (
        (100 / (
            loadedSprites.length +
            loadedGifs.length +
            loadedAudio.length +
            loadedFonts.length
            )
        ) * (
            loadedSprites.map((e) => e == true).length +
            loadedGifs.map((e) => e == true).length +
            loadedAudio.map((e) => e == true).length +
            loadedFonts.map((e) => e == true).length
        )
    );

    return allAudioLoaded && allFontsLoaded && allGifsLoaded && allSpritesLoaded;
}

// Set up canvas
function setupCanvas() {
    // Main canvas
    DOMcanvas.width = CANVAS_WIDTH;
    DOMcanvas.height = CANVAS_HEIGHT;

    // Main canvas context
    ctx = DOMcanvas.getContext("2d");
    ctx.fillStyle = "#000000";
	ctx.font = "bold 13px Courier New";
    ctx.textAlign = "center";

    // Buffer canvas and context
    DOMcanvasBuffer = document.createElement("canvas");
    DOMcanvasBuffer.id = "bufferCanvas";
    DOMcanvasBuffer.width = CANVAS_WIDTH;
    DOMcanvasBuffer.height = CANVAS_HEIGHT;
    document.body.appendChild(DOMcanvasBuffer);

    ctxBuffer = DOMcanvasBuffer.getContext("2d");
    ctxBuffer.fillStyle = "#000000";
	ctxBuffer.font = "bold 13px Courier New";
    ctxBuffer.textAlign = "center";

    /*ctxBuffer.webkitImageSmoothingEnabled = false;
	ctxBuffer.msImageSmoothingEnabled = false;
    ctxBuffer.imageSmoothingEnabled = false;*/


    // Sprite canvas and context
    DOMcanvasSprite = document.createElement("canvas");
    DOMcanvasSprite.id = "spriteCanvas";
    DOMcanvasSprite.width = CANVAS_WIDTH;
    DOMcanvasSprite.height = CANVAS_HEIGHT;
    document.body.appendChild(DOMcanvasSprite);

    ctxSprite = DOMcanvasSprite.getContext("2d");
    /*ctxSprite.webkitImageSmoothingEnabled = false;
	ctxSprite.msImageSmoothingEnabled = false;
    ctxSprite.imageSmoothingEnabled = false;*/

    // Volume button
    DOMvolumeButton.addEventListener("click", function() {
        if(volume >= 3) volume = 0;
        else volume++;

        DOMvolumeButton.style.backgroundPosition = -(21 * volume) + "px 0";

        if(!audioMain.paused) {
            updateVolume();
        }
    });
}

// Add padding
function addPadding(input, char, length) {
    let output = input.toString();

    while(output.length < length) {
        output = char + output;
    }

    return output;
}

// Hexadecimal to RGB
function hexToRgb(color) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    color = color.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {
        r: 0,
        g: 0,
        b: 0
    };
}

// Set volume
function updateVolume() {
    for(let i = 0; i < audio.length; i++) {
        audio[i].volume = (volume != 0) ? 0.33 * volume : 0;
    }
}

// Sprite loading function
function loadSprite(path) {
    sprites[currentSprite] = new Image();
    loadedSprites[currentSprite] = false;
    sprites[currentSprite].src = path;

    sprites[currentSprite].onload = function () {
        loadedSprites[sprites.indexOf(this)] = true;
    };

    currentSprite++;

    return sprites[currentSprite - 1];
};

// Audio loading function
function loadAudio(path) {
    audio[currentAudio] = new Audio(path);
    loadedAudio[currentAudio] = false;
    
    audio[currentAudio].addEventListener("loadeddata", function() {
        loadedAudio[audio.indexOf(this)] = true;
    });


    currentAudio++;

    return audio[currentAudio - 1];
};

// Text class
class Text {
    // Get text width
    static getTextWidth (text, font, size) {
        let width = 0;
        let fontShortcut = fonts.get(font);

        for(let i = 0; i < text.length; i++) {
            // Line breaks
            if(text[i] == " ") {
                width += fontShortcut.spaceWidth * size;

                continue;
            }

            width += (fontShortcut.sprites.get(text[i]).z + fontShortcut.glyphSpacing) * size;
        }

        return width;
    }

    // Text loading function
    static loadFont (font, src, data) {
        let thisFont = new TextFont(src);
        thisFont.loadedIndex = loadedFonts.length;
        loadedFonts.push(false);

        // Glyph loading
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let myObj = JSON.parse(this.responseText);

                for(let i = 0; i < myObj.glyphs.length; i++) {
                    thisFont.add(myObj.glyphs[i].glyph, myObj.glyphs[i].x, myObj.glyphs[i].y, myObj.glyphs[i].width, myObj.glyphs[i].height);
                }

                thisFont.glyphSpacing = myObj.glyphSpacing;
                thisFont.breakHeight = myObj.breakHeight;
                thisFont.lineHeight = myObj.lineHeight;
                thisFont.spaceWidth = myObj.spaceWidth;

                loadedFonts[thisFont.loadedIndex] = true;
            }
        };
        xmlhttp.open("GET", data, true);
        xmlhttp.send();

        fonts.set(font, thisFont);
    }

    // Text drawing function
    static drawText (text, x, y, font, colour, size) {
        let offsetX = 0;
        let offsetY = 0;
        let fontShortcut = fonts.get(font);

        for(let i = 0; i < text.length; i++) {
            // Line breaks
            if(text[i] == "\\" && text[i + 1] == "n") {
                offsetX = 0;
                offsetY += (fontShortcut.lineHeight + fontShortcut.breakHeight) * size;
                i += 1;

                continue;
            } else if(text[i] == " ") {
                offsetX += fontShortcut.spaceWidth * size;

                continue;
            }

            // Drawing
            let spriteShortcut = fontShortcut.sprites.get(text[i]);

            if(spriteShortcut !== undefined) {
                ctxSprite.drawImage(fontShortcut.source, spriteShortcut.x, spriteShortcut.y, spriteShortcut.z, spriteShortcut.w, x + offsetX, y + offsetY, spriteShortcut.z * size, spriteShortcut.w * size);
            } else {
                console.log("Glyph missing: " + text[i]);
                break;
            }

            // Glyph movement
            offsetX += (spriteShortcut.z + fontShortcut.glyphSpacing) * size;
        }

        // Recolour
        var spriteData = ctxSprite.getImageData(0, 0, DOMcanvasSprite.width, DOMcanvasSprite.height);
        var data = spriteData.data;

        for(var p = 0; p < data.length; p += 4) {
            data[p + 0] = colour.r; // Red
            data[p + 1] = colour.g; // Green
            data[p + 2] = colour.b; // Blue
        }

        // Place on buffer
        ctxSprite.putImageData(spriteData, 0, 0);

        ctxBuffer.drawImage(DOMcanvasSprite, 0, 0);


        ctxSprite.clearRect(0, 0, DOMcanvasSprite.width, DOMcanvasSprite.height);
    };
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
        this.loadedIndex = 0;
    };

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

        for(let i = 0; i < frames.length; i++) {
            this.frames[i] = new Image();
            this.frames[i].src = frames[i];


            this.loadedFrames[i] = false;

            this.frames[i].onload = (e) => {
                this.loadedFrames[this.frames.indexOf((e.target == null) ? e.path[0] : e.target)] = true;

                if(frames.length == this.loadedFrames.length) {
                    let hasFailed = false;
                    
                    for(let n = 0; n < this.loadedFrames.length; n++) {
                        if(this.loadedFrames[n] == false) {
                            hasFailed = true;
                            break;
                        }
                    }

                    if(!hasFailed) {
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

        for(let i = 0; i < amount; i++) {
            this.frames[i] = new Image();
            this.frames[i].src = path + "_" + addPadding(i + 1, '0', 2) + "." + fileType;
            
            this.loadedFrames[i] = false;
            
            this.frames[i].onload = (e) => {
                this.loadedFrames[this.frames.indexOf((e.target == null) ? e.path[0] : e.target)] = true;
                
                
                if(amount == this.loadedFrames.length) {
                    let hasFailed = false;
                    
                    for(let n = 0; n < this.loadedFrames.length; n++) {
                        if(this.loadedFrames[n] == false) {
                            hasFailed = true;
                            break;
                        }
                    }

                    if(!hasFailed) {
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
        if(this.transform.z !== -1 && this.transform.w !== -1) {
            ctxBuffer.drawImage(this.frames[this.curFrame], this.transform.x, this.transform.y, this.transform.z, this.transform.w);
        } else {
            ctxBuffer.drawImage(this.frames[this.curFrame], this.transform.x, this.transform.y);
        }

        if(this.isPlaying) {
            if(this.curTiming <= 0) {
                if(this.curFrame < this.frames.length - 1) {
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
    };

    check() {
        if(mousex >= this.transform.x && mousex <= this.transform.x + this.transform.z && mousey >= this.transform.y && mousey <= this.transform.y + this.transform.w) {
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


// Timeline
class Timeline {
    constructor(keys) {
        this.updateLoop = new HighResolutionTimer({
            duration: Math.floor(1000 / FPS),
            callback: this.update.bind(this)
        });
        this.keys = keys || [];
        this.curFrame = 0;
    }

    addKey(key) {
        this.keys.push(key);
    }

    play() {
        this.updateLoop.run();
    }

    stop() {
        this.updateLoop.stop();
        this.updateLoop = 0;
    }

    getValue(key) {
        return this.keys[key].value.value;
    }

    update() {
        for(let i = 0; i < this.keys.length; i++) {
            if(this.keys[i].frameStart == this.curFrame) {
                this.keys[i].play();
            }

            if(this.keys[i].isPlaying) {
                this.keys[i].update(this.curFrame);
            }
        }

        this.curFrame++;
    }
}

// Keyframe/tween class
class Key {
    constructor(value, frameStart, frameEnd, easing) {
        this.isPlaying = false;
        this.frameStart = frameStart || 1;
        this.frameEnd = frameEnd || 10;
        this.easing = easing || BezierEasing(0, 0, 1, 1);
        this.value = value;
    }

    play() {
        this.isPlaying = true;
    }

    update(curFrame) {
        if(curFrame == this.frameEnd) {
            this.isPlaying = false;
        }


        this.value.value = ((this.value.max - this.value.min) * this.easing((1 / (this.frameEnd - this.frameStart)) * (curFrame - this.frameStart))) + this.value.min;
    }
}

// Value to be tweened
function TweenValue(curValue, newValue) {
    this.min = curValue || 0;
    this.max = newValue || 1;
    this.value = 0;
}