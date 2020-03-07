@import "./src/js/partials/engine.js"
@import "./src/js/partials/assets.js"

/*
Title: Test Program
Origin: Null
Programmer: MadCreativity
*/


document.addEventListener("DOMContentLoaded", () => {
    // Canvas setup
    DOMcanvas = document.querySelector("#gameCanvas");

    setupCanvas();
   

    // Main loop
    let loop = setInterval(() => {
        if(allSpritesLoaded && allFontsLoaded && allGifsLoaded && allAudioLoaded) {
            // Reset canvas
            ctxBuffer.clearRect(0, 0, 650, 450);

            
            // Draw
            


            // Update main canvas with buffer
            ctx.putImageData(ctxBuffer.getImageData(0, 0, DOMcanvasBuffer.width, DOMcanvasBuffer.height), 0, 0);
        } else {
            checkLoadAssets();
        }
    }, 41);
});