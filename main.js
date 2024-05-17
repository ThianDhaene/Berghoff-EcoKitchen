"use strict";
(function (){
    //Work in progress
    // function updateXpBar(xp) {
    //     const maxXp = 1000;
    //     let progress = (xp / maxXp) * 100;
    //     document.getElementById('xp-progress').style.width = progress + '%';
    // }

    // updateXpBar(1);

    //Aanmaken van canvas
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //Instellen startlevel
    let Level = 1;

    //Character class met movement functies
    class Character {
        constructor(x, y, width, height, speed) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.speed = speed;
        }

        moveUp(){
            if (isAnyModalVisible()) return;
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
            if (isAnyModalVisible()) return;
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
            if (isAnyModalVisible()) return;
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
            if (isAnyModalVisible()) return;
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
    //Functie die door de character class gebruikt wordt om te checken of er een collision is
    const detectCollision = function(character, item) {
        return (
            character.x < item.x + item.width &&
            character.x + character.width > item.x &&
            character.y < item.y + item.height &&
            character.y + character.height > item.y
        );
    };

    //Functie die de game ieder frame update
    function update() {
        //Canvas volledig leegmaken
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Inladen van de verschillende objecten die standaard aanwezig zijn
        loadKitchen(300, 0, canvas.width, canvas.height);
        loadGarden(0, 0, 300, canvas.height);
        loadFence(0, 150, 300, 50);
        createWall(300, 0, canvas.width, 10);
        createWall(300, canvas.height-10, canvas.width, 10);
        createWall(canvas.width-10, 0, 10, canvas.height);
        createWall(300, 0, 10, canvas.height/2.5);
        createWall(300, canvas.height - canvas.height/2.5, 10, canvas.height/2.5);

        //Inladen van de objecten die specifiek zijn voor het level
        switch(Level){
            case 1:
                loadTable(750, 350 , 300, 150);
                loadChair1(775, 510 , 50, 50);
                loadChair1(875, 510 , 50, 50);
                loadChair1(975, 510 , 50, 50);
                loadChair2(775, 290 , 50, 50);
                loadChair2(875, 290 , 50, 50);
                loadChair2(975, 290 , 50, 50);
                loadFridge(310, 10, 120, 120);
                loadOven(430, 10, 130, 90);
                loadSink(560, 10, 130, 90);
                loadPlant(1100, 10, 100, 80);
                loadChicken(170, 90, 90, 90);
                loadChicken(100, 30, 90, 90);
                break;
        }

        //Inladen van character op de corecte positie
        drawCharacter();

        //Controleren of de character in een interactieve zone is
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
                ctx.font = '20px Poetsen One';
                ctx.fillText(zone.message, rectX + 10, rectY + messageHeight / 2 + 5);
            }
        }
        //X & Y positie van de character loggen voor debug doeleinden
        console.log("[" + character1.x + "," + character1.y + "]");
    }
    

    //Afbeelding voor character instellen
    const characterImage = new Image();
    characterImage.src = 'img/character.png'; 
    const character1 = new Character(550, 170, 70, 70, 5);

    //Array voor objecten waarbij een collision gecheckt moet worden
    const collisionItems = []; 
    //Array voor objecten waarbij een interactie gecheckt moet worden
    const interactiveZones = [];

    //Alle afbeeldingen aamaken voor de verschillende objecten
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
        wall: new Image(),
        sink: new Image(),
        fridge: new Image(),
    };

    //Afbeelding locatie toekennen voor de verschillende objecten
    images.chicken.src = 'img/chicken1.png';
    images.garden.src = 'img/garden.png';
    images.fence.src = 'img/fence.png';
    images.floor.src = 'img/floor.png';
    images.table.src = 'img/table1.png';
    images.chair1.src = 'img/chair1.png';
    images.chair2.src = 'img/chair2.png';
    images.oven.src = 'img/oven.png';
    images.plant.src = 'img/plant.png';
    images.wall.src = 'img/wall1.png';
    images.sink.src = 'img/sink.png';
    images.fridge.src = 'img/fridge1.png';


    //Functies voor het inladen van de verschillende objecten
    //Objecten waarbij een collision gecheckt moet worden worden in een array gestopt
    //Inladen van character
    const drawCharacter = function(){
        ctx.drawImage(characterImage, character1.x, character1.y, character1.width, character1.height);
    };
    //Inladen van kip
    const loadChicken = function(x, y, width, height){
        ctx.drawImage(images.chicken, x, y, width, height);
    };

    //Inladen van tuin
    const loadGarden = function(x, y, width, height){
        ctx.drawImage(images.garden, x, y, width, height);
    };

    //Inladen van hek
    const loadFence = function(x, y, width, height){
        ctx.drawImage(images.fence, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };
    
    //Inladen van keukenvloer
    const loadKitchen = function(x, y, width, height){
        ctx.drawImage(images.floor, x, y, width, height);
    };
    
    //Inladen van tafel
    const loadTable = function(x, y, width, height){
        ctx.drawImage(images.table, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };
    
    //Inladen van stoelen
    const loadChair1 = function(x, y, width, height){
        ctx.drawImage(images.chair1, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };
    
    const loadChair2 = function(x, y, width, height){
        ctx.drawImage(images.chair2, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };
    
    //Inladen van oven
    const loadOven = function(x, y, width, height){
        ctx.drawImage(images.oven, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };
    
    //Inladen van plant
    const loadPlant = function(x, y, width, height){
        ctx.drawImage(images.plant, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };

    //Inladen van gootsteen
    const loadSink = function(x, y, width, height){
        ctx.drawImage(images.sink, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    }

    //Inladen van koelkast
    const loadFridge = function(x, y, width, height){
        ctx.drawImage(images.fridge, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    }
    
    //Aanmaken van muur
    const createWall = function(x,y, width, height){
        ctx.drawImage(images.wall, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };

    //Inladen van interactieve zones voor de verschillende levels
    switch(Level){
        case 1:
            //Inladen van interactieve zone voor de oven
            interactiveZones.push({ x: 480, y: 120, width: 20, height: 5, message: 'E', action: () => { showModal("ovenModal") } });
            interactiveZones.push({ x: 610, y: 120, width: 20, height: 5, message: 'E', action: () => { showModal("sinkModal") } });
        case 2:
    }

    //Functie om te checken of de character in de buurt van een interactieve zone is
    function detectProximity(character, zone, distance = 10) {
        return (
            character.x < zone.x + zone.width + distance &&
            character.x + character.width > zone.x - distance &&
            character.y < zone.y + zone.height + distance &&
            character.y + character.height > zone.y - distance
        );
    }

    //Input Handling
    //Functie om interactie met interactieve zones te checken
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

    //Movement van character
    //Deels geschreven door ChatGPT behalve functies voor het bewegen zelf
    const keysPressed = {};

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    function handleKeyDown(event) {
        keysPressed[event.key] = true;
    }
    function handleKeyUp(event) {
        delete keysPressed[event.key];
    }
    
    moveCharacter();

    function moveCharacter() {
        if (keysPressed['ArrowUp']) {character1.moveUp();}
        if (keysPressed['ArrowDown']) {character1.moveDown();}
        if (keysPressed['ArrowLeft']) {character1.moveLeft();}
        if (keysPressed['ArrowRight']) {character1.moveRight();}
        update();
        requestAnimationFrame(moveCharacter);
    }


    //Functie om een modal te tonen
    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    //Function om een modal te verbergen
    function hideModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }

    //Event listener om de close button van de modal te sluiten
    function addCloseButtonListener(modalId) {
        const modal = document.getElementById(modalId);
        modal.querySelector('.close').addEventListener('click', function() {
            hideModal(modalId);
        });
    }

    //Event listener om de modal te sluiten wanneer er buiten de modal geklikt wordt
    function addOutsideClickListener(modalId) {
        window.addEventListener('click', function(event) {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                hideModal(modalId);
            }
        });
    }

    //Event listener om de modal te sluiten wanneer de escape toets ingedrukt wordt
    function addEscapeKeyListener(modalId) {
        window.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                hideModal(modalId);
            }
        });
    }

    //Functie voor initialisatie van de modal
    function initializeModal(modalId) {
        addCloseButtonListener(modalId);
        addOutsideClickListener(modalId);
        addEscapeKeyListener(modalId);
    }

    //Controlefunctie om te checken of er een modal open is
    function isAnyModalVisible() {
        const modals = ['ovenModal', 'sinkModal'];
        return modals.some(modalId => {
            return document.getElementById(modalId).style.display === 'block';
        });
    }

    //Alle modals initialiseren
    initializeModal('ovenModal');
    initializeModal('sinkModal');

    
})();
