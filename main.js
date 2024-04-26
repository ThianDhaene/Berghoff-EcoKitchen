"use strict";

(function (){
    //Aanmaken van canvas
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let Level = 1;

    const detectCollision = function(character, item) {
        return (
            character.x < item.x + item.width &&
            character.x + character.width > item.x &&
            character.y < item.y + item.height &&
            character.y + character.height > item.y
        );
    }
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
                if (
                    this.x < item.x + item.width &&
                    this.x + this.width > item.x &&
                    this.y < item.y + item.height &&
                    this.y + this.height > item.y
                ) {
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
                if (
                    this.x < item.x + item.width &&
                    this.x + this.width > item.x &&
                    this.y < item.y + item.height &&
                    this.y + this.height > item.y
                ) {if (this.x + this.width > item.x + item.width) {
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
                if (
                    this.x < item.x + item.width &&
                    this.x + this.width > item.x &&
                    this.y < item.y + item.height &&
                    this.y + this.height > item.y
                ) {
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

    let chickens = [];

    class Chicken{
        constructor (x, y, width, height, speed, age, pregnant){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.speed = speed;
            this.age = age;
            this.pregnant = pregnant;

            this.createChicken();
        }

        ageUp(){
            this.age++;
            if(this.age == 3){
                this.height+=10;
                this.width+=10;
            }
        }

        makeBaby(){
            this.pregnant = true;
            chickens.push(new Chicken(this.x, this.y, this.width, this.height, this.speed, 0, false));
        }

        createChicken(){
            const chicken = new Image();
            chicken.src = 'img/chicken1.png';
            ctx.drawImage(chicken, this.x, this.y, this.width, this.height);
        }
    }

    // Define the character image
    const characterImage = new Image();
    characterImage.src = 'img/character.png'; // Replace 'character.png' with the path to your character image
    const character1 = new Character(550, 170, 70, 70, 5);

    // Function to draw the character
    const drawCharacter = function(){
        // Draw the character image at the character's position
        ctx.drawImage(characterImage, character1.x, character1.y, character1.width, character1.height);
    }

    const loadLevel1 = function(){
        loadDefaults();
        
        //Aanmaken van tafels en stoelen
        loadTable(750, 350 , 300, 150);
        loadChair1(775, 510 , 50, 50);
        loadChair1(875, 510 , 50, 50);
        loadChair1(975, 510 , 50, 50);
        loadChair2(775, 290 , 50, 50);
        loadChair2(875, 290 , 50, 50);
        loadChair2(975, 290 , 50, 50);

        loadCicken(170, 90, 90, 90);
        loadCicken(100, 30, 90, 90);
    }
    
    const loadDefaults = function(){
        loadKitchen(300, 0, canvas.width, canvas.height);

        //Aanmaken tuin
        loadGarden(0, 0, 300, canvas.height);
        loadFence(0, 150, 300, 50);

        //Aanmaken van muren
        createWall(300, 0, canvas.width, 10);
        createWall(300, canvas.height-10, canvas.width, 10);
        createWall(canvas.width-10, 0, 10, canvas.height);
        createWall(300, 0, 10, canvas.height/2.5);
        createWall(300, canvas.height - canvas.height/2.5, 10, canvas.height/2.5);
    }

    // Instellen van keukenvloer
    const loadKitchen = function(x, y, width, height){
        const kitchenFloor = new Image();
        kitchenFloor.src = 'img/floor.png';
        ctx.drawImage(kitchenFloor, x, y, width, height);
    }

    const loadCicken = function(x, y, width, height){
        const chicken = new Image();
        chicken.src = 'img/chicken1.png';
        ctx.drawImage(chicken, x, y, width, height);
    }

    //Instellen tuin
    const loadGarden = function(x, y, width, height){
        const garden = new Image();
        garden.src = 'img/garden.png';
        ctx.drawImage(garden, x, y, width, height);
    }

    const loadTable = function(x,y, width, height){
        const table = new Image();
        table.src = 'img/table1.png';
        ctx.drawImage(table, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    }

    const loadChair1 = function(x,y, width, height){
        const chair = new Image();
        chair.src = 'img/chair1.png';
        ctx.drawImage(chair, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    }

    const loadChair2 = function(x,y, width, height){
        const chair = new Image();
        chair.src = 'img/chair2.png';
        ctx.drawImage(chair, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    }

    const loadFence = function(x,y, width, height){
        const fence = new Image();
        fence.src = 'img/fence.png';
        ctx.drawImage(fence, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    }

    const collisionItems = []; // Array to store wall positions
    //Aanmaken van muur
    const createWall = function(x,y, width, height){
        const wallName = new Image();
        wallName.src = 'img/wall1.png';
        ctx.drawImage(wallName, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    }

    

    // Function to update the game state
    const update = function(){
        // Leegmaken canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        switch(Level){
            case 1:
                loadLevel1();
                break;
        }
        
        // Draw the character
        drawCharacter();

        console.log("["+character1.x+","+character1.y+"]")
    }


    //Input Handling
    //Deel input handling met behulp van ChatGPT
    //Functies voor movement zelf geschreven
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

