"use strict";
(function (){
    function updateXpBar(xp) {
        const maxXp = 1000;
        let progress = (xp / maxXp) * 100;
        document.getElementById('xp-progress').style.width = progress + '%';
    }

    updateXpBar(1);

    //Aanmaken van canvas
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let Level = 1;

    const detectCollision = function(character, item) {
        return (
            character.x < item.x + item.width &&
            character.x + character.width > item.x &&
            character.y < item.y + item.height &&
            character.y + character.height > item.y
        );
    };

    //Character properties
    class Character {
        constructor(x, y, width, height, speed) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.speed = speed;
        }

        moveUp(){
            for (const item of collisionItems) {
                if (detectCollision(this, item)) {
                    if (this.y + this.height > item.y + item.height) {
                        return;
                    }
                }
            }
            if(this.y > 0){
                this.y -= this.speed;
            }
        }

        moveDown() {
            for (const item of collisionItems) {
                if (detectCollision(this, item)) { 
                    if (this.y < item.y) {
                        return; 
                    }
                }
            }
            if (this.y < canvas.height - this.height) {
                this.y += this.speed;
            }
        }

        moveLeft() {
            for (const item of collisionItems) {
                if (detectCollision(this, item)) { 
                    if (this.x + this.width > item.x + item.width) {
                        return; 
                    }
                }
            }
            if (this.x > 0) {
                this.x -= this.speed;
            }
        }
        
        moveRight() {
            for (const item of collisionItems) {
                if (detectCollision(this, item)) { 
                    if (this.x < item.x) {
                        return;
                    }
                }
            }
            if (this.x < canvas.width - this.width) {
                this.x += this.speed;
            }
        }
    }

    function update() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        loadKitchen(300, 0, canvas.width, canvas.height);
        loadGarden(0, 0, 300, canvas.height);
        loadFence(0, 150, 300, 50);
        createWall(300, 0, canvas.width, 10);
        createWall(300, canvas.height-10, canvas.width, 10);
        createWall(canvas.width-10, 0, 10, canvas.height);
        createWall(300, 0, 10, canvas.height/2.5);
        createWall(300, canvas.height - canvas.height/2.5, 10, canvas.height/2.5);

        switch(Level){
            case 1:
                loadTable(750, 350 , 300, 150);
                loadChair1(775, 510 , 50, 50);
                loadChair1(875, 510 , 50, 50);
                loadChair1(975, 510 , 50, 50);
                loadChair2(775, 290 , 50, 50);
                loadChair2(875, 290 , 50, 50);
                loadChair2(975, 290 , 50, 50);
                loadOven(500, 10, 120, 80);
                loadChicken(170, 90, 90, 90);
                loadPlant(1100, 10, 100, 80);
                loadChicken(100, 30, 90, 90);
                break;
        }

        // Draw the character
        drawCharacter();

        // Check for proximity to interactive zones
        for (const zone of interactiveZones) {
            if (detectProximity(character1, zone)) {
                const messageWidth = ctx.measureText(zone.message).width + 20;
                const messageHeight = 30;
                const rectX = zone.x;
                const rectY = zone.y - messageHeight - 10;
    

                ctx.fillStyle = 'white';
                ctx.fillRect(rectX, rectY, messageWidth, messageHeight);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.strokeRect(rectX, rectY, messageWidth, messageHeight);
    
                ctx.fillStyle = 'black';
                ctx.font = '16px Arial';
                ctx.fillText(zone.message, rectX + 10, rectY + messageHeight / 2 + 5);
            }
        }
        

        console.log("[" + character1.x + "," + character1.y + "]");
    }

    // Define the character image
    const characterImage = new Image();
    characterImage.src = 'img/character.png'; // Replace 'character.png' with the path to your character image
    const character1 = new Character(550, 170, 70, 70, 5);

    // Function to draw the character
    const drawCharacter = function(){
        // Draw the character image at the character's position
        ctx.drawImage(characterImage, character1.x, character1.y, character1.width, character1.height);
    };

    const images = {
        chicken: new Image(),
        garden: new Image(),
        fence: new Image(),
        floor: new Image(),
        table: new Image(),
        chair1: new Image(),
        chair2: new Image(),
        oven: new Image(),
        plant: new Image(),
    };
    
    images.chicken.src = 'img/chicken1.png';
    images.garden.src = 'img/garden.png';
    images.fence.src = 'img/fence.png';
    images.floor.src = 'img/floor.png';
    images.table.src = 'img/table1.png';
    images.chair1.src = 'img/chair1.png';
    images.chair2.src = 'img/chair2.png';
    images.oven.src = 'img/oven.png';
    images.plant.src = 'img/plant.png';

    //Items voor Tuin
    const loadChicken = function(x, y, width, height){
        ctx.drawImage(images.chicken, x, y, width, height);
    };
    
    const loadGarden = function(x, y, width, height){
        ctx.drawImage(images.garden, x, y, width, height);
    };
    
    const loadFence = function(x, y, width, height){
        ctx.drawImage(images.fence, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };
    
    // Instellen van keukenvloer
    const loadKitchen = function(x, y, width, height){
        ctx.drawImage(images.floor, x, y, width, height);
    };
    
    const loadTable = function(x, y, width, height){
        ctx.drawImage(images.table, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };
    
    const loadChair1 = function(x, y, width, height){
        ctx.drawImage(images.chair1, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };
    
    const loadChair2 = function(x, y, width, height){
        ctx.drawImage(images.chair2, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };
    
    const loadOven = function(x, y, width, height){
        ctx.drawImage(images.oven, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };
    
    const loadPlant = function(x, y, width, height){
        ctx.drawImage(images.plant, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };
    

    const collisionItems = []; // Array to store wall positions
    //Aanmaken van muur
    const createWall = function(x,y, width, height){
        const wallName = new Image();
        wallName.src = 'img/wall1.png';
        ctx.drawImage(wallName, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };

    let interactiveZones = [];
    switch(Level){
        case 1:
            interactiveZones = [
                { x: 540, y: 100, width: 20, height: 5, message: 'E', action: () => { console.log('Interacted with zone 1'); } },
                // { x: 700, y: 200, width: 100, height: 100, message: 'E', action: () => { console.log('Interacted with zone 2'); } },
            ];
    }

    function detectProximity(character, zone, distance = 10) {
        return (
            character.x < zone.x + zone.width + distance &&
            character.x + character.width > zone.x - distance &&
            character.y < zone.y + zone.height + distance &&
            character.y + character.height > zone.y - distance
        );
    }


    document.addEventListener('keydown', handleInteraction);

    function handleInteraction(event) {
        if (event.key === 'e' || event.key === 'E') {
            for (const zone of interactiveZones) {
                if (detectProximity(character1, zone)) {
                    zone.action();
                }
            }
        }
    }

    //Input Handling
    const keysPressed = {};

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    function handleKeyDown(event) {
        keysPressed[event.key] = true;
    }
    
    function handleKeyUp(event) {
        delete keysPressed[event.key];
    }
    
    function moveCharacter() {
        if (keysPressed['ArrowUp']) {
            character1.moveUp();
        }
        if (keysPressed['ArrowDown']) {
            character1.moveDown();
        }
        if (keysPressed['ArrowLeft']) {
            character1.moveLeft();
        }
        if (keysPressed['ArrowRight']) {
            character1.moveRight();
        }
        // Update the game
        update();
    
        // Continue moving the character
        requestAnimationFrame(moveCharacter);
    }

    moveCharacter();
    update();
})();
