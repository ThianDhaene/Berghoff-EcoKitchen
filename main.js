
"use strict";
(function () {
    // if komt van chat gpt
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        alert("Deze website kan niet gebruikt worden op een mobiel apparaat.");
    }

    let currentXp = 300;

    const deductXp = function (amount) {
        currentXp -= amount;
        updateXpBar(currentXp);
    };
    function addItemToFridge(itemName) {
        const fridgeItemsList = document.getElementById('fridge-items');
        const newItem = document.createElement('li');

        const addButton = document.createElement('button');
        addButton.textContent = `${itemName}`;
        addButton.addEventListener('click', function () {
            addOvenItem(itemName);
            fridgeItemsList.removeChild(newItem);
        });

        newItem.appendChild(addButton);
        fridgeItemsList.appendChild(newItem);
    }
    const fridgeButtons = document.querySelectorAll('#fridge-items button');

    fridgeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = button.textContent;
            addOvenItem(itemName);
        });
    });
    const itemsInHand = [];
    function addOvenItem(itemName) {
        console.log(`Item added to oven: ${itemName}`);
        alert(`Item "${itemName}" toegevoegd aan de oven!`);

        const ovenList = document.getElementById('ovenModal').querySelector('.oven');
        const newItem = document.createElement('li');
        const newButton = document.createElement('button');
        newButton.textContent = itemName;
        newButton.addEventListener('click', function() {
            itemsInHand.push(itemName);
            console.log(`Item "${itemName}" added to your hand!`);
        });
        newItem.appendChild(newButton);
        ovenList.appendChild(newItem);
    }
    

    const maxItems = {
        '🧀 Gruyère kaas': 3, 
        '🍶 Alfredo saus': 2,
        '🐟 Ansjovis': 1
    };
    
    const purchasedItems = {
        '🧀 Gruyère kaas': 0,
        '🍶 Alfredo saus': 0,
        '🐟 Ansjovis': 0
    };
    
    const buyItem = function (xpCost, itemName) {
        if (currentXp >= xpCost) {
            if (purchasedItems[itemName] < maxItems[itemName]) {
                deductXp(xpCost);
                addItemToFridge(itemName); // Add item to fridge
                purchasedItems[itemName]++; // Increment purchased count
                alert(`Item "${itemName}" gekocht! XP is nu: ${currentXp}`);
            } else {
                alert(`Je kunt niet meer van "${itemName}" kopen.`);
            }
        } else {
            alert("Je hebt niet genoeg XP om dit item te kopen!");
        }
    };

    document.getElementById('buyItem1').addEventListener('click', function () {
        const itemXpCost = 10;
        const itemName = '🧀 Gruyère kaas'; // Naam van het gekochte item
        buyItem(itemXpCost, itemName);
    });

    document.getElementById('buyItem2').addEventListener('click', function () {
        const itemXpCost = 20;
        const itemName = '🍶 Alfredo saus';
        buyItem(itemXpCost, itemName);
    });

    document.getElementById('buyItem3').addEventListener('click', function () {
        const itemXpCost = 30;
        const itemName = '🐟 Ansjovis';
        buyItem(itemXpCost, itemName);
    });


    function updateXpBar(xp) {
        const maxXp = 1000;
        let progress = (xp / maxXp) * 100;
        document.getElementById('xp-progress').style.width = progress + '%';
        document.getElementById('xp-tooltip').textContent = 'XP: ' + xp + ' / ' + maxXp;
        return progress;
    }

    function addXP(amount) {
        currentXp += amount;
        updateXpBar(currentXp);
    }
    function clearOvenItems() {
        const ovenList = document.getElementById('ovenModal').querySelector('.oven');
        ovenList.innerHTML = '';
    }

    const makeButton = document.querySelector('#ovenModal button');
    makeButton.addEventListener('click', function () {
        const selectedFood1 = JSON.parse(document.querySelectorAll('.dropdown')[0].dataset.selectedFood);
        const selectedFood2 = JSON.parse(document.querySelectorAll('.dropdown')[1].dataset.selectedFood);
        if (selectedFood1 && selectedFood2) {
            const selectedFoodIngredients1 = selectedFood1.ingredients;
            const selectedFoodIngredients2 = selectedFood2.ingredients;
    
            const ingredientsMatch1 = selectedFoodIngredients1.every(ingredient => itemsInHand.includes(ingredient));
            const ingredientsMatch2 = selectedFoodIngredients2.every(ingredient => itemsInHand.includes(ingredient));
    
            if (ingredientsMatch1 || ingredientsMatch2) {
                alert('Gerechten zijn klaar!');
                addXP(50);
                clearOvenItems();
                createDropdownMenu();
            } else {
                alert('De ingrediënten komen niet overeen. Je kunt de gerechten niet maken.');

            }
            console.log(selectedFoodIngredients1);
            console.log(selectedFoodIngredients2);
            console.log(itemsInHand);
        } else {
            alert('Er is geen gerecht geselecteerd.');
        }

    });

    function addXP(amount) {
        currentXp += amount;
        updateXpBar(currentXp);
    }
    function clearOvenItems() {
        const ovenList = document.getElementById('ovenModal').querySelector('.oven');
        const ovenItems = ovenList.querySelectorAll('li');
    
        ovenItems.forEach(item => {
            const itemName = item.querySelector('button').textContent;
            if (itemsInHand.includes(itemName)) {
                ovenList.removeChild(item);
            }
        });
    }


    const xp = 300;
    updateXpBar(xp);
    // dropdown van de navbar
    function createDropdownMenu() {
        const dropdowns = document.querySelectorAll('.dropdown');
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

        dropdownToggles.forEach((dropdownToggle, index) => {
            let isDropdownOpen = false;
            const dropdown = dropdowns[index];

            const foodDataArray = [
                {
                    title: "Spaghetti Carbonara",
                    description: "Spaghetti Carbonara wordt gemaakt met spaghetti, eieren, kaas en pancetta.",
                    ingredients: ["🍝 Spaghetti", "🥚 Eieren", "🧀 Kaas", "🥓 Pancetta"]
                },
                {
                    title: "Margherita Pizza",
                    description: "Margherita Pizza bevat tomaten, mozzarella kaas en verse basilicum.",
                    ingredients: ["🍅 Tomaat", "🧀 Mozzarella", "🌿 Basilicum"]
                },
                {
                    title: "Caesar Salad",
                    description: "Caesar Salad wordt gemaakt met romaine sla, croutons, citroensap, olijfolie, ei, ansjovis, knoflook, Dijon mosterd en Parmezaanse kaas.",
                    ingredients: ["🥬 Sla", "🍞 Croutons", "🍋 Citroensap", "🫒 Olijfolie", "🥚 Eieren", "🐟 Ansjovis", "🧄 Knoflook", "🍯Mosterd", "🧀 Parmezaanse kaas"]
                },
                {
                    title: "Chicken Alfredo",
                    description: "Chicken Alfredo wordt gemaakt met fettuccine noedels, Alfredo saus en kip.",
                    ingredients: ["🍜 Noedels", "🍶 Alfredo saus", "🍗 Kip"]
                },
                {
                    title: "Beef Tacos",
                    description: "Beef Tacos bevatten gekruid rundergehakt, geraspte sla, gesneden tomaten en cheddar kaas, in een taco-schelp.",
                    ingredients: ["🥩 Rundergehakt", "🥬 Sla", "🍅 Tomaat", "🧀 Cheddar kaas", "🌮 Taco"]
                },
                {
                    title: "Griekse Salade",
                    description: "Griekse Salade wordt gemaakt met komkommers, tomaten, rode uien, Kalamata olijven, feta kaas, olijfolie, citroensap en oregano.",
                    ingredients: ["🥒 Komkommers", "🍅 Tomaat", "🧅 Rode_ui", "🫒 Olijven", "🧀 Feta kaas", "🫒 Olijfolie", "🍋 Citroensap", "🌿 Oregano"]
                },
                {
                    title: "Chicken Tikka Masala",
                    description: "Chicken Tikka Masala bestaat uit gemarineerde kipstukken gekookt in een romige en gekruide tomatensaus.",
                    ingredients: ["🍗 Kip", "🥛 Room", "🍅 Tomatensaus"]
                },
                {
                    title: "Sushi Rolls",
                    description: "Sushi Rolls worden gemaakt met azijnrijst, zeevruchten en groenten, gerold in zeewier.",
                    ingredients: ["🍚 Rijst", "🦐 Zeevruchten", "🌿 Zeewier"]
                },
                {
                    title: "Caprese Salade",
                    description: "Caprese Salade wordt gemaakt met plakjes verse mozzarella, tomaten en zoete basilicum, gekruid met olijfolie.",
                    ingredients: ["🥬 Sla", "🧀 Mozzarella", "🍅 Tomaat", "🌿 Basilicum", "🫒 Olijfolie"]
                },
                {
                    title: "BBQ Ribs",
                    description: "BBQ Ribs worden gemaakt met varkensribben die langzaam worden gekookt en bedekt met barbecuesaus.",
                    ingredients: ["🍖 Varkensribben", "🍛 Barbecuesaus"]
                },
                {
                    title: "Franse Uiensoep",
                    description: "Franse Uiensoep wordt gemaakt met gekarameliseerde uien in runderbouillon, gegarneerd met geroosterd brood en gesmolten Gruyère kaas.",
                    ingredients: ["🧅 Ui", "🍲 Runderbouillon", "🧀 Gruyère kaas"]
                }
            ];
            const randomIndex = Math.floor(Math.random() * foodDataArray.length);
            const createDropdownMenu = (foodDataArray) => {
                const menu = document.createElement('div');
                menu.className = 'dropdown-menu';

                const data = foodDataArray[randomIndex];
                const foodItem = document.createElement('div');
                foodItem.className = 'food-item';

                const title = document.createElement('h3');
                title.textContent = data.title;

                const description = document.createElement('p');
                description.textContent = data.description;

                foodItem.appendChild(title);
                foodItem.appendChild(description);
                menu.appendChild(foodItem);

                dropdown.dataset.selectedFood = JSON.stringify(data);

                return menu;
            };

            const dropdownMenu = createDropdownMenu(foodDataArray, index);
            dropdown.appendChild(dropdownMenu);

            dropdown.addEventListener('mouseenter', function () {
                if (!isDropdownOpen) {
                    dropdownMenu.style.display = 'block';
                }
            });

            dropdown.addEventListener('mouseleave', function () {
                if (!isDropdownOpen) {
                    dropdownMenu.style.display = 'none';
                }
            });

            dropdownToggle.addEventListener('click', function (event) {
                event.preventDefault();
                isDropdownOpen = !isDropdownOpen;
                if (isDropdownOpen) {
                    dropdownMenu.style.display = 'block';
                } else {
                    dropdownMenu.style.display = 'none';
                }
            });

            document.addEventListener('click', function (event) {
                if (!dropdown.contains(event.target) && isDropdownOpen) {
                    dropdownMenu.style.display = 'none';
                    isDropdownOpen = false;
                }
            });
        });
    };
    createDropdownMenu();
    //left widget energie level
    const energie = document.querySelector('.duurzaamheid');
    const percentage = 100;

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = `efficiëntie: ${percentage}%`;

    energie.appendChild(tooltip);

    energie.addEventListener('mouseenter', function () {
        tooltip.style.display = 'block';
    });

    energie.addEventListener('mouseleave', function () {
        tooltip.style.display = 'none';
    });
    document.getElementById('shopButton').addEventListener('click', function () {
        document.getElementById('shopOverlay').style.display = 'flex';
    });

    document.getElementById('closeOverlay').addEventListener('click', function () {
        document.getElementById('shopOverlay').style.display = 'none';
    });

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

        moveUp() {
            if (isAnyModalVisible()) return;
            for (const item of collisionItems) {
                if (detectCollision(this, item)) {
                    if (this.y + this.height > item.y + item.height) {
                        return;
                    }
                }
            }
            if (this.y > 0) {
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
    const detectCollision = function (character, item) {
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
        createWall(300, canvas.height - 10, canvas.width, 10);
        createWall(canvas.width - 10, 0, 10, canvas.height);
        createWall(300, 0, 10, canvas.height / 2.5);
        createWall(300, canvas.height - canvas.height / 2.5, 10, canvas.height / 2.5);

        //Inladen van de objecten die specifiek zijn voor het level
        switch (Level) {
            case 1:
                loadTable(750, 350, 300, 150);
                loadChair1(775, 510, 50, 50);
                loadChair1(875, 510, 50, 50);
                loadChair1(975, 510, 50, 50);
                loadChair2(775, 290, 50, 50);
                loadChair2(875, 290, 50, 50);
                loadChair2(975, 290, 50, 50);
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
    const drawCharacter = function () {
        ctx.drawImage(characterImage, character1.x, character1.y, character1.width, character1.height);
    };
    //Inladen van kip
    const loadChicken = function (x, y, width, height) {
        ctx.drawImage(images.chicken, x, y, width, height);
    };

    //Inladen van tuin
    const loadGarden = function (x, y, width, height) {
        ctx.drawImage(images.garden, x, y, width, height);
    };

    //Inladen van hek
    const loadFence = function (x, y, width, height) {
        ctx.drawImage(images.fence, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };

    //Inladen van keukenvloer
    const loadKitchen = function (x, y, width, height) {
        ctx.drawImage(images.floor, x, y, width, height);
    };

    //Inladen van tafel
    const loadTable = function (x, y, width, height) {
        ctx.drawImage(images.table, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };

    //Inladen van stoelen
    const loadChair1 = function (x, y, width, height) {
        ctx.drawImage(images.chair1, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };

    const loadChair2 = function (x, y, width, height) {
        ctx.drawImage(images.chair2, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };

    //Inladen van oven
    const loadOven = function (x, y, width, height) {
        ctx.drawImage(images.oven, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };

    //Inladen van plant
    const loadPlant = function (x, y, width, height) {
        ctx.drawImage(images.plant, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };

    //Inladen van gootsteen
    const loadSink = function (x, y, width, height) {
        ctx.drawImage(images.sink, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    }

    //Inladen van koelkast
    const loadFridge = function (x, y, width, height) {
        ctx.drawImage(images.fridge, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    }

    //Aanmaken van muur
    const createWall = function (x, y, width, height) {
        ctx.drawImage(images.wall, x, y, width, height);
        collisionItems.push({ x: x, y: y, width: width, height: height });
    };

    //Inladen van interactieve zones voor de verschillende levels
    switch (Level) {
        case 1:
            //Inladen van interactieve zone voor de oven
            interactiveZones.push({ x: 480, y: 120, width: 20, height: 5, message: 'E', action: () => { showModal("ovenModal") } });
            interactiveZones.push({ x: 610, y: 120, width: 20, height: 5, message: 'E', action: () => { showModal("sinkModal") } });
            interactiveZones.push({ x: 310, y: 120, width: 80, height: 5, message: 'E', action: () => { showModal("fridgeModal") } });
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
        if (keysPressed['ArrowUp']) { character1.moveUp(); }
        if (keysPressed['ArrowDown']) { character1.moveDown(); }
        if (keysPressed['ArrowLeft']) { character1.moveLeft(); }
        if (keysPressed['ArrowRight']) { character1.moveRight(); }
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
        modal.querySelector('.close').addEventListener('click', function () {
            hideModal(modalId);
        });
    }

    //Event listener om de modal te sluiten wanneer er buiten de modal geklikt wordt
    function addOutsideClickListener(modalId) {
        window.addEventListener('click', function (event) {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                hideModal(modalId);
            }
        });
    }

    //Event listener om de modal te sluiten wanneer de escape toets ingedrukt wordt
    function addEscapeKeyListener(modalId) {
        window.addEventListener('keydown', function (event) {
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
    initializeModal('fridgeModal');

})();
