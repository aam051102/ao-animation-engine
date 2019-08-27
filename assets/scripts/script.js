window.addEventListener('DOMContentLoaded', () => {
    // Canvas setup
    // Main canvas
    DOMcanvas = document.querySelector("#gameCanvas");

    setupCanvas();
    
    // Game specific
    let GAME_curFrame = 0;
    let GAME_fade = 0;
    let GAME_fadeOut = false;

    let GAME_messageFrame = 0;
    let GAME_fuckMessage = false;
    let GAME_jasproseMessage = 0;
    
    let GAME_erisolspriteHeroPosX = 509.1;
    let GAME_erisolspriteHeroPosY = 112;
    
    let GAME_erisolspriteArrowOffset = 0;
    let GAME_erisolspriteArrowDirection = false;

    let GAME_fuckButtonsPos = -165;

    // Interactables
    let GAME_interaction_screen = new Interactable(0, 0, 650, 450);
    let GAME_interaction_controlVolume = new Interactable(2, 3, 23, 22);
    let GAME_interaction_easteregg = new Interactable(225, 199, 55, 60);
    let GAME_interaction_fuckButtons = new Interactable(33, 10, 164, 426);


    // Main loop
    let loop = setInterval(() => {
        if (allSpritesLoaded && allFontsLoaded && allGifsLoaded && allAudioLoaded) {
            // Reset canvas
            ctxBuffer.clearRect(0, 0, 650, 450);
            

            if(GAME_curFrame === 0) {
                gifPreloader.update();

                // "Click to start." text
                Text.drawText("Click to start.", 325 - (Text.getTextWidth("Click to start.", "FontStuck", 1) / 2), 400, "FontStuck", hexToRgb("#000000"), 1);
            } else if(GAME_curFrame === 1) {
                gifPreloader.update();

                // Fade out
                ctxBuffer.globalAlpha = GAME_fade;
                ctxBuffer.fillRect(0, 0, 650, 450);
                ctxBuffer.globalAlpha = 1;
                GAME_fade += .02;

                if(GAME_fade >= 1) {
                    GAME_curFrame += 1;

                    gifJasprosespriteBack.start();
                }
            } else if(GAME_curFrame === 2) {
                ctxBuffer.drawImage(sprites[4], 0, 0);

                ctxBuffer.drawImage(sprites[10], 442, 135 - GAME_erisolspriteArrowOffset, 44.775, 70.2);
                if(GAME_fade == 0) ctxBuffer.drawImage(sprites[6], 450, 113 + GAME_erisolspriteArrowOffset, 20.88, 12.96);

                gifJasprosespriteBack.update();
                gifEasteregg.update();


                // Erisolsprite arrow
                if(!GAME_erisolspriteArrowDirection) {
                    GAME_erisolspriteArrowOffset++;

                    if(GAME_erisolspriteArrowOffset >= 2) {
                        GAME_erisolspriteArrowDirection = true;
                    }
                } else {
                    GAME_erisolspriteArrowOffset--;

                    if(GAME_erisolspriteArrowOffset <= 0) {
                        GAME_erisolspriteArrowDirection = false;
                    }
                }

                // Easteregg
                if(gifEasteregg.curFrame == gifEasteregg.frames.length - 1) {
                    gifEasteregg.stop();
                }

                // Jasprose message
                if(GAME_jasproseMessage == 1) {
                    if(GAME_messageFrame == 2) {
                        ctxBuffer.drawImage(sprites[7], 56.5, 25, 537, 50);
                    } else if(GAME_messageFrame == 1) {
                        ctxBuffer.drawImage(sprites[7], 49.5, 24.5, 551, 51);
                    } else if(GAME_messageFrame == 0) {
                        ctxBuffer.drawImage(sprites[7], 191, 37.5, 268, 25);
                    }

                    if(GAME_messageFrame > 0) {
                        Text.drawText("Who the fuck is this.", 80, 50 - 6, "FontStuck", hexToRgb("#000000"), 1);
                    }

                    if(GAME_messageFrame < 2) {
                        GAME_messageFrame++;
                    }
                } else if(GAME_jasproseMessage == 2) {
                    if(GAME_messageFrame == 2) {
                        ctxBuffer.drawImage(sprites[7], 56.5, 25, 537, 50);
                    } else if(GAME_messageFrame == 1) {
                        ctxBuffer.drawImage(sprites[7], 49.5, 24.5, 551, 51);
                    } else if(GAME_messageFrame == 0) {
                        ctxBuffer.drawImage(sprites[7], 191, 37.5, 268, 25);
                    }

                    if(GAME_messageFrame > 0) {
                        Text.drawText("You interrogate the ghastly green sprite for answers.", 80, 50 - 6, "FontStuck", hexToRgb("#000000"), 1);
                    }

                    if(GAME_messageFrame < 2) {
                        GAME_messageFrame++;
                    }
                }

                // Fade out
                if(GAME_fadeOut) {
                    ctxBuffer.globalAlpha = GAME_fade;
                    ctxBuffer.fillRect(0, 0, 650, 450);
                    ctxBuffer.globalAlpha = 1;
                    GAME_fade += .05;

                    if(GAME_fade >= 1) {
                        GAME_curFrame += 1;
                        GAME_fadeOut = false;

                        gifJasprosespriteBack.start();
                    }
                } else {
                    // Fade in
                    if(GAME_fade >= 0.02) {
                        ctxBuffer.globalAlpha = GAME_fade;
                        ctxBuffer.fillRect(0, 0, 650, 450);
                        ctxBuffer.globalAlpha = 1;
                        GAME_fade -= .02;
                    } else if(GAME_fade < 0.02 && GAME_fade > 0) {
                        GAME_fade = 0;
                    }
                }
            } else if(GAME_curFrame === 3) {
                ctxBuffer.drawImage(sprites[5], 0, 0)
                ctxBuffer.drawImage(sprites[9], GAME_fuckButtonsPos, 10);

                gifErisolpriteHero.update();


                // ErisolspriteHero
                if(GAME_erisolspriteHeroPosX != 336) {
                    if(GAME_erisolspriteHeroPosX == 509.1) { GAME_erisolspriteHeroPosX = 475.4; GAME_erisolspriteHeroPosY = 90.4; }
                    else if(GAME_erisolspriteHeroPosX == 475.4) { GAME_erisolspriteHeroPosX = 443.6; GAME_erisolspriteHeroPosY = 70; }
                    else if(GAME_erisolspriteHeroPosX == 443.6) { GAME_erisolspriteHeroPosX = 413.7; GAME_erisolspriteHeroPosY = 51; }
                    else if(GAME_erisolspriteHeroPosX == 413.7) { GAME_erisolspriteHeroPosX = 385.8; GAME_erisolspriteHeroPosY = 33.1; }
                    else if(GAME_erisolspriteHeroPosX == 385.8) { GAME_erisolspriteHeroPosX = 359.8; GAME_erisolspriteHeroPosY = 16.4; }
                    else if(GAME_erisolspriteHeroPosX == 359.8) { GAME_erisolspriteHeroPosX = 335.6; GAME_erisolspriteHeroPosY = 1; }
                    else if(GAME_erisolspriteHeroPosX == 335.6) { GAME_erisolspriteHeroPosX = 324.1; GAME_erisolspriteHeroPosY = -6.3; gifErisolpriteHero.start(); }

                    gifErisolpriteHero.setTransform(GAME_erisolspriteHeroPosX, GAME_erisolspriteHeroPosY, 442.96, 674.61);
                }

                // Fuck buttons
                if(GAME_fuckButtonsPos != 33) {
                    if(GAME_fuckButtonsPos == -165) GAME_fuckButtonsPos = -164;
                    else if(GAME_fuckButtonsPos == -164) GAME_fuckButtonsPos = -122;
                    else if(GAME_fuckButtonsPos == -122) GAME_fuckButtonsPos = -82;
                    else if(GAME_fuckButtonsPos == -82) GAME_fuckButtonsPos = -40;
                    else if(GAME_fuckButtonsPos == -40) GAME_fuckButtonsPos = 0;
                    else if(GAME_fuckButtonsPos == 0) GAME_fuckButtonsPos = 42;
                    else if(GAME_fuckButtonsPos == 42) GAME_fuckButtonsPos = 33;
                }

                // Fuck buttons
                if(GAME_fuckMessage) {
                    if(GAME_messageFrame == 2) {
                        ctxBuffer.drawImage(sprites[8], 56.5, 225, 537, 177);
                    } else if(GAME_messageFrame == 1) {
                        ctxBuffer.drawImage(sprites[8], 46.5, 221.5, 557, 184);
                    } else if(GAME_messageFrame == 0) {
                        ctxBuffer.drawImage(sprites[8], 156.5, 258, 338, 111);
                    }

                    if(GAME_messageFrame > 0) {
                        Text.drawText("fuck", 325 - Text.getTextWidth("fuck", "FontStuck", 1) / 2, 225 + (177 / 2) - 4, "FontStuck", hexToRgb("#4ac925"), 1);
                    }

                    if(GAME_messageFrame < 2) {
                        GAME_messageFrame++;
                    }
                }

                // Fade
                if(GAME_fade >= 0.05) {
                    ctxBuffer.globalAlpha = GAME_fade;
                    ctxBuffer.fillRect(0, 0, 650, 450);
                    ctxBuffer.globalAlpha = 1;
                    GAME_fade -= .05;
                } else if(GAME_fade < 0.05 && GAME_fade > 0) {
                    GAME_fade = 0;
                }
            }
            

            // Controls
            ctxBuffer.drawImage(sprites[volume], 3, 2, 22.95, 21.65); // Volume

            
            // Update main canvas with buffer
            ctx.putImageData(ctxBuffer.getImageData(0, 0, DOMcanvasBuffer.width, DOMcanvasBuffer.height), 0, 0);
		} else {
            // Draw preloader
            if(loadedGifs[gifs.indexOf(gifPreloader)]) {
                gifPreloader.update();
            }

            // Draw volume controls
            if(loadedSprites[volume]) {
                ctxBuffer.drawImage(sprites[volume], 3, 2, 22.95, 21.65); // Volume
            }


            checkLoadAssets();
        }
    }, 41);

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

        // Erisolsprite
        if(GAME_curFrame == 2 && GAME_fade == 0 && GAME_jasproseMessage == 0) {
            if(GAME_interaction_screen.check()) {
                DOMcanvas.style.cursor = "pointer";

                return;
            }
        }

        // Fuck buttons
        if(GAME_curFrame == 3 && !GAME_fuckMessage && GAME_fade == 0) {
            if(GAME_interaction_fuckButtons.check()) {
                DOMcanvas.style.cursor = "pointer";

                return;
            }
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

            if(!audio[0].paused) {
                updateVolume();
            }

            return;
        }

        // Preloader screen
        if(GAME_curFrame == 0) {
            if(GAME_interaction_screen.check()) {
                GAME_curFrame += 1;
                audio[0].play();
                updateVolume();

                return;
            }
        }

        // Easteregg
        if(GAME_curFrame == 2 && GAME_fade == 0 && GAME_jasproseMessage == 0) {
            if(GAME_interaction_easteregg.check()) {
                gifEasteregg.reset();
                gifEasteregg.start();

                return;
            }
        }

        // Erisolsprite
        if(GAME_curFrame == 2 && GAME_fade == 0 && GAME_jasproseMessage == 0) {
            if(GAME_interaction_screen.check()) {
                GAME_messageFrame = 0;
                GAME_jasproseMessage = 1;

                return;
            }
        }

        // Continue jasprose message
        if(GAME_curFrame == 2 && GAME_jasproseMessage) {
            if(GAME_interaction_screen.check()) {
                GAME_messageFrame = 0;
                GAME_jasproseMessage++;

                if(GAME_jasproseMessage > 2) {
                    GAME_fadeOut = true;
                }

                return;
            }
        }

        // Fuck buttons
        if(GAME_curFrame == 3 && !GAME_fuckMessage && GAME_fade == 0) {
            if(GAME_interaction_fuckButtons.check()) {
                GAME_messageFrame = 0;
                GAME_fuckMessage = true;

                return;
            }
        }

        // Leave fuck message
        if(GAME_curFrame == 3 && GAME_fuckMessage) {
            if(GAME_interaction_screen.check()) {
                GAME_fuckMessage = false;

                return;
            }
        }
    });
});