"use strict";
(function () {
    function updateXpBar(xp) {
        const maxXp = 1000;

        let progress = (xp / maxXp) * 100;

        document.getElementById('xp-progress').style.width = progress + '%';
    }

    updateXpBar(100);
})();
=======

(function (){
    //Maken van canvas
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    //Character properties
    const character = {
        x: 50,
        y: 50,
        width: 50,
        height: 50,
        speed: 10,
        rotation: 0
    };


    // Define the character image
    const characterImage = new Image();
    characterImage.src = 'img/character.png'; // Replace 'character.png' with the path to your character image

    // Function to draw the character
    function drawCharacter() {
        // Draw the character image at the character's position
        ctx.drawImage(characterImage, character.x, character.y, character.width, character.height);
    }


    // Define the background image
    const backgroundImage = new Image();
    backgroundImage.src = 'img/floor.png'; // Replace 'background.jpg' with the path to your background image

    // Load the background image
    backgroundImage.onload = function() {
        // Draw the background image on the canvas
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Call the update function to draw the rest of the game elements
        update();
    };

    // Function to update the game state
    function update() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the character
        drawCharacter();

        // Draw the appliance
        drawAppliance();
    }

    // Define a variable to keep track of pressed keys
    const keysPressed = {};

    // Function to handle keydown event
    function handleKeyDown(event) {
        // Set the corresponding key in the keysPressed object to true
        keysPressed[event.key] = true;

        // Move the character based on keyboard input
        moveCharacter();
    }

    // Function to handle keyup event
    function handleKeyUp(event) {
        // Set the corresponding key in the keysPressed object to false
        keysPressed[event.key] = false;
    }

    // Add event listeners for keydown and keyup events
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Function to continuously move the character while a key is held down
    function moveCharacter() {
        // Reset character's movement
        let dx = 0;
        let dy = 0;

        // Check which keys are pressed and update character's movement
        if (keysPressed['ArrowUp']) {
            dy -= character.speed;
        }
        if (keysPressed['ArrowDown']) {
            dy += character.speed;
        }
        if (keysPressed['ArrowLeft']) {
            dx -= character.speed;
        }
        if (keysPressed['ArrowRight']) {
            dx += character.speed;
        }

        // Move the character
        character.x += dx;
        character.y += dy;

        // Update the game
        update();

        // Continue moving the character
        requestAnimationFrame(moveCharacter);
    }

    // Initial call to moveCharacter to start the continuous movement
    moveCharacter();


    // Add event listener for keyboard input
    document.addEventListener('keydown', handleKeyPress);

    // Initial update to draw the game
    update();
})();

