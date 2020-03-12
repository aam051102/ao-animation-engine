@import "./src/js/partials/engine.js"
@import "./src/js/partials/assets.js"

/*
Title: Program Template
Origin: Null
Programmer: MadCreativity
*/


document.addEventListener("DOMContentLoaded", () => {
    // Canvas setup
    DOMcanvas = document.querySelector("#gameCanvas");

    setupCanvas();
   


    // Variables
    let GAME_curSection = 0;

    // Interactables


    // Timeline
    let tl = new Timeline([
        
    ]);


    // Main loop
    let loop = setInterval(() => {
        if(allSpritesLoaded && allFontsLoaded && allGifsLoaded && allAudioLoaded) {
            // Reset canvas
            ctxBuffer.clearRect(0, 0, DOMcanvasBuffer.width, DOMcanvasBuffer.height);

            
            // Draw
            


            // Update main canvas with buffer
            ctx.putImageData(ctxBuffer.getImageData(0, 0, DOMcanvasBuffer.width, DOMcanvasBuffer.height), 0, 0);
        } else {
            if(checkLoadAssets()) {
                tl.play();
            }
        }
    }, 1000 / FPS);
});