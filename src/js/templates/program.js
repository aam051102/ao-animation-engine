@import "./src/js/partials/engine.js"
@import "./src/js/partials/assets.js"

/*
Title: [S] Vriska: W8ke Up
Origin: Act Omega
Programmer: MadCreativity
*/


document.addEventListener("DOMContentLoaded", () => {
    // Canvas setup
    DOMcanvas = document.querySelector("#gameCanvas");

    setupCanvas();

    const FPS = 24;
   
    // Game specific
    let GAME_curFrame = 0;
    let GAME_fade = 0;
    let GAME_fade2 = 0;
    let GAME_timer = [];

    // Interactables
    let GAME_interaction_screen = new Interactable(0, 0, 950, 650);
    let GAME_interaction_controlVolume = new Interactable(152, 103, 23, 22);


    // Main loop
    let loop = setInterval(() => {
        if(allSpritesLoaded && allFontsLoaded && allGifsLoaded && allAudioLoaded) {
            // Reset canvas
            ctxBuffer.clearRect(0, 0, 950, 650);

            
            // Draw
            if(GAME_curFrame === 0) {
                gifPreloader.update();

                // "Click to start." text
                Text.drawText("Click to start.", 475 - (Text.getTextWidth("Click to start.", "FontStuck", 1) / 2), 500, "FontStuck", hexToRgb("#000000"), 1);
            } else if(GAME_curFrame === 1) {
                // Slight pause before animation
                GAME_timer[0]--;

                if(GAME_timer[0] <= 0) {
                    GAME_curFrame++;
                    
                    GAME_timer[0] = 3;
                }
            } else if(GAME_curFrame === 2) {
                // Black box fade
                ctxBuffer.globalAlpha = GAME_fade;
                ctxBuffer.fillRect(150, 100, 650, 450);
                ctxBuffer.globalAlpha = 1;
                GAME_fade += 1 / 16;

                // Border
                if(GAME_timer[0] <= 0) {
                    ctxBuffer.globalAlpha = GAME_fade2;
                    ctxBuffer.drawImage(sprBorder, 0, 0);
                    ctxBuffer.globalAlpha = 1;
                    GAME_fade2 += 1 / 13;
                } else {
                    GAME_timer[0]--;
                }

                if(GAME_fade >= 1 && GAME_fade2 >= 1) {
                    GAME_fade = 0;
                    GAME_fade2 = 0;
                    GAME_curFrame++;
                }
            } else if(GAME_curFrame === 3) {
                ctxBuffer.fillRect(150, 100, 650, 450);
                ctxBuffer.drawImage(sprBorder, 0, 0);


                ctxBuffer.globalAlpha = GAME_fade;
                ctxBuffer.fillRect(0, 0, 950, 650);
                ctxBuffer.globalAlpha = 1;
                GAME_fade += 0.36 / 3;

                if(GAME_fade >= 0.36) {
                    GAME_curFrame++;
                }
            } else if(GAME_curFrame === 4) {
                ctxBuffer.fillRect(150, 100, 650, 450);
                ctxBuffer.drawImage(sprBorder, 0, 0);


                ctxBuffer.globalAlpha = GAME_fade;
                ctxBuffer.fillRect(0, 0, 950, 650);
                ctxBuffer.globalAlpha = 1;
                GAME_fade -= 0.36 / 13;

                if(GAME_fade <= 0) {
                    GAME_fade = 0;
                    GAME_curFrame++;
                }
            } else if(GAME_curFrame === 5) {
                ctxBuffer.fillRect(150, 100, 650, 450);

                ctxBuffer.globalAlpha = 1 - GAME_fade;
                ctxBuffer.drawImage(sprBorder, 0, 0);
                ctxBuffer.globalAlpha = 1;
                GAME_fade += 0.14 / 9;

                if(GAME_fade >= 0.14) {
                    GAME_curFrame++;
                }
            } else if(GAME_curFrame === 6) {
                ctxBuffer.fillRect(150, 100, 650, 450);

                ctxBuffer.globalAlpha = 0.86;
                ctxBuffer.drawImage(sprBorder, 0, 0);
                ctxBuffer.globalAlpha = 1;
            }


            // Draw volume controls
            if(loadedSprites[getSpriteIndex(sprVolume[volume])]) {
                ctxBuffer.drawImage(sprVolume[volume], 153, 102, 22.95, 21.65); // Volume
            }

            // Update main canvas with buffer
            ctx.putImageData(ctxBuffer.getImageData(0, 0, DOMcanvasBuffer.width, DOMcanvasBuffer.height), 0, 0);
        } else {
            // Draw preloader
            if(loadedGifs[gifs.indexOf(gifPreloader)]) {
                gifPreloader.update();
            }

            // Draw volume controls
            if(loadedSprites[getSpriteIndex(sprVolume[volume])]) {
                ctxBuffer.drawImage(sprVolume[volume], 153, 102, 22.95, 21.65); // Volume
            }


            checkLoadAssets();
        }
    }, 1000 / FPS);

    // Mouse move
    DOMcanvas.addEventListener("mousemove", (e) => {
        e = e || window.event;

        let box = DOMcanvas.getBoundingClientRect();
        mousex = e.clientX - box.left;
        mousey = e.clientY - box.top;


        // Game specific
        DOMcanvas.style.cursor = "default";

        // Control - volume
        if(GAME_interaction_controlVolume.check()) {
            DOMcanvas.style.cursor = "pointer";

            return;
        }
    });

    // Mouse click
    DOMcanvas.addEventListener("mousedown", (e) => {
        e = e || window.event;

        let box = DOMcanvas.getBoundingClientRect();
        mousex = e.clientX - box.left;
        mousey = e.clientY - box.top;

        // Game specific
        // Control - volume
        if(GAME_interaction_controlVolume.check()) {
            if(volume >= 3) volume = 0;
            else volume++;

            if(!audioMain.paused) {
                updateVolume();
            }

            return;
        }

        // Preloader screen
        if(GAME_curFrame == 0) {
            if(GAME_interaction_screen.check()) {
                GAME_curFrame += 1;
                GAME_timer[0] = 5;
                audioMain.play();
                updateVolume();

                return;
            }
        }
    });
});