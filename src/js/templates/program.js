@import "./src/js/partials/engine.js"
@import "./src/js/partials/assets.js"

/*
Title: [S] Vriska: W8ke Up
Origin: Act Omega
Programmer: MadCreativity
*/


document.addEventListener("DOMContentLoaded", () => {
    // Program settings
    CANVAS_WIDTH = 650;
    CANVAS_HEIGHT = 450;
    FPS = 24;

    // Canvas setup
    DOMcanvas = document.querySelector("#gameCanvas");
    DOMvolumeButton = document.querySelector("#volumeButton");
    

    setupCanvas();

    // Variables
    let GAME_curSection = 0;

    // Interactables
    let GAME_interaction_screen = new Interactable(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Timeline
    let tl = new Timeline([
        new Key(
            new TweenValue(0, 150),
            10, 150,
            BEZIER_EASE_IN_OUT
        )
    ]);


    // Main loop
    let loop = new HighResolutionTimer({
        duration: Math.floor(1000 / FPS),
        callback: function() {
            ctxBuffer.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            if(allSpritesLoaded && allFontsLoaded && allGifsLoaded && allAudioLoaded) {        
                /* PROGRAM START */
                // Preloader section
                if(GAME_curSection === 0) {
                    gifPreloader.update();

                    Text.drawText("Click to start.", CANVAS_WIDTH / 2 - (Text.getTextWidth("Click to start.", "FontStuck", 1) / 2), CANVAS_HEIGHT - 50, "FontStuck", hexToRgb("#000000"), 1);
                }
                /* PROGRAM END */
            } else {
                // Draw preloader
                if(loadedGifs[gifs.indexOf(gifPreloader)]) {
                    gifPreloader.update();
                }

                // Loading text
                if(loadedFonts[fonts.get("FontStuck").loadedIndex]) {
                    const percentageText = loadingPercentage + "%";
                    Text.drawText(percentageText, CANVAS_WIDTH / 2 - (Text.getTextWidth(percentageText, "FontStuck", 1) / 2), CANVAS_HEIGHT - 50, "FontStuck", hexToRgb("#000000"), 1);
                }

                checkLoadAssets();
            }

            ctx.putImageData(ctxBuffer.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT), 0, 0);
        }
    });
    loop.run();

    // Mouse move
    DOMcanvas.addEventListener("mousemove", (e) => {
        e = e || window.event;

        let box = DOMcanvas.getBoundingClientRect();
        mousex = e.clientX - box.left;
        mousey = e.clientY - box.top;


        // Game specific
        DOMcanvas.style.cursor = "default";
    });

    // Mouse click
    DOMcanvas.addEventListener("mousedown", (e) => {
        e = e || window.event;

        let box = DOMcanvas.getBoundingClientRect();
        mousex = e.clientX - box.left;
        mousey = e.clientY - box.top;

        // Game specific
        // Preloader screen
        if(GAME_curSection == 0) {
            if(GAME_interaction_screen.check()) {
                GAME_curSection++;
                //audioMain.play();
                updateVolume();
                tl.play();

                return;
            }
        }
    });
});