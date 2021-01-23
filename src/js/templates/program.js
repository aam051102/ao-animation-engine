import "./src/js/partials/engine.js";
import "./src/js/partials/assets.js";

/*
Title: [S] Vriska: W8ke Up.
Origin: Act Omega
Programmer: MadCreativity
*/

document.addEventListener("DOMContentLoaded", () => {
    // Canvas setup
    DOMcanvas = document.querySelector("#gameCanvas");

    setupCanvas();

    // Game specific
    let GAME_playAudio = 0;
    let GAME_curFrame = 0;

    // Interactables
    let GAME_interaction_screen = new Interactable(0, 0, 650, 450);
    let GAME_interaction_controlVolume = new Interactable(2, 3, 23, 22);

    // Main loop
    let lastTimestamp = 0;

    const step = (timestamp) => {
        if (timestamp - lastTimestamp >= 1000 / 24) {
            lastTimestamp = timestamp;

            // Reset canvas
            ctxBuffer.clearRect(
                0,
                0,
                DOMcanvasBuffer.width,
                DOMcanvasBuffer.height
            );

            if (
                allSpritesLoaded &&
                allFontsLoaded &&
                allGifsLoaded &&
                allAudioLoaded
            ) {
                // Play audio
                if (GAME_playAudio == 1) {
                    // Start audio
                }

                if (GAME_curFrame === 0) {
                    gifPreloader.update();

                    // "Click to start." text
                    Text.drawText(
                        "Click to start.",
                        325 -
                            Text.getTextWidth(
                                "Click to start.",
                                "FontStuck",
                                1
                            ) /
                                2,
                        400,
                        "FontStuck",
                        hexToRgb("#000000"),
                        1
                    );
                } else if (GAME_curFrame === 1) {
                }

                // Controls
                ctxBuffer.drawImage(sprVolume[volume], 3, 2, 22.95, 21.65); // Volume
            } else {
                // Draw preloader
                if (loadedGifs[gifs.indexOf(gifPreloader)]) {
                    gifPreloader.update();
                }

                // Draw volume controls
                if (loadedSprites[getSpriteIndex(sprVolume[volume])]) {
                    ctxBuffer.drawImage(sprVolume[volume], 3, 2, 22.95, 21.65);
                }

                // Draw loading progress
                if (loadedFonts[fonts.get("FontStuck").index]) {
                    const percentage = `${Math.floor(
                        (100 / totalAssets) * loadedAssets
                    )}%`;

                    Text.drawText(
                        percentage,
                        325 - Text.getTextWidth(percentage, "FontStuck", 1) / 2,
                        400,
                        "FontStuck",
                        hexToRgb("#000000"),
                        1
                    );
                }

                checkLoadAssets();
            }

            // Update main canvas with buffer
            ctx.putImageData(
                ctxBuffer.getImageData(
                    0,
                    0,
                    DOMcanvasBuffer.width,
                    DOMcanvasBuffer.height
                ),
                0,
                0
            );
        }

        requestAnimationFrame(step);
    };

    requestAnimationFrame(step);

    // Mouse move
    DOMcanvas.addEventListener("mousemove", (e) => {
        e = e || window.event;

        let box = DOMcanvas.getBoundingClientRect();
        mousex = e.clientX - box.left;
        mousey = e.clientY - box.top;

        DOMcanvas.style.cursor = "default";

        // Controls
        // Volume
        if (GAME_interaction_controlVolume.check()) {
            DOMcanvas.style.cursor = "pointer";

            return;
        }
    });

    // Mouse click
    DOMcanvas.addEventListener("click", (e) => {
        e = e || window.event;

        let box = DOMcanvas.getBoundingClientRect();
        mousex = e.clientX - box.left;
        mousey = e.clientY - box.top;

        // Controls
        // Volume
        if (GAME_interaction_controlVolume.check()) {
            if (volume >= 3) volume = 0;
            else volume++;
            updateVolume();

            return;
        }

        // Preloader screen
        if (GAME_curFrame == 0) {
            if (GAME_interaction_screen.check()) {
                GAME_curFrame += 1;
                GAME_playAudio = 1;
                updateVolume();

                return;
            }
        }
    });
});
