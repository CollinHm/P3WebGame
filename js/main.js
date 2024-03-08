document.getElementById("title").innerText = "Point and Click Adventure game";

//Game state
let gameState = {
    "door1locked": true,
    "inventory": [],
    "KeyPickedUp": false
}
//localStorage.removeItem("gameState");
// Handle browser storage
//if (typeof (Storage) !== "undefined") {
//check if gamestate already exists
//if (localStorage.gameState) {
//Load savegame into local variable
//gameState = JSON.parse(localStorage.gameState);

//} else {
//save local gamestate into browser storage
// localStorage.setItem("gameState", JSON.stringify(gameState))
// }
//}
//else {
//sorry! no web storage support..
//alert('Web storage not supported!')

//}

//game window reference
const gameWindow = document.getElementById("gameWindow");

if (gameState.KeyPickedUp) {
    document.getElementById("key1").remove();
}

const sec = 1000;

//Main Character
const mainCharacter = document.getElementById("mainCharacter");
const offsetCharacter = 16;

//speech bubbles
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");
const counterSpeech = document.getElementById("counterSpeech");
const counterAvatarImg = document.getElementById("counterAvatarImg");
const mcAudio = document.getElementById("mcAudio");
const counterAudio = document.getElementById("counterAudio");

//Inventory
const inventoryBox = document.getElementById("inventoryBox")
const inventoryList = document.getElementById("inventoryList")

//Foreground items
const door1 = document.getElementById("door1");

updateInventory(gameState.inventory, inventoryList);

//update inventory with gameState items
updateInventory(gameState.inventory, inventoryList);


gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    if (e.target.id !== "mcImage") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }


    console.log(e.target.id);
    switch (e.target.id) {
        case "keyInPool":

            door1.style.opacity = 0.5;
            sign.style.opacity = 1;

            if (document.getElementById("key1") !== null) {
                console.log("Found Key!");
                document.getElementById("key1").remove();
                changeInventory('Key', 'add');
                gameState.KeyPickedUp = true;



            } break;

        case "door1":
            if (gameState.door1locked == true) {
                //check wether we have key
                if (document.getElementById("inv-Key") !== null) {
                    //yes -> unlock door?
                    gameState.door2locked = false;
                    changeInventory('Key', 'delete');
                    console.log("Door is now open.");

                } else {
                    //no -> alert 'door locked'
                    alert('Door is locked');
                }
            } else {
                console.log('Enter building');

            }

            break;


        case "ghost":
            showMessage(counterSpeech, mcAudio, "Hello, Human.");
            setTimeout(function () { counterAvatarImg.style.opacity = 1 }, 2 * sec);
            setTimeout(showMessage, 4 * sec, mainCharacterSpeech, counterAudio, "WOAH! A GHOST");
            setTimeout(showMessage, 8 * sec, counterSpeech, mcAudio, "Yes, a ghost indeed");
            setTimeout(showMessage, 12 * sec, mainCharacterSpeech, counterAudio, "I would've never expected this to happen");
            setTimeout(showMessage, 16 * sec, counterSpeech, mcAudio, "So why are you here.. human?");
            setTimeout(showMessage, 20 * sec, mainCharacterSpeech, counterAudio, "I am searching for a key, which leads to the exit of this place");
            setTimeout(showMessage, 24 * sec, counterSpeech, mcAudio, "A key you say.. there was a key in the water a long time ago, you should check there");
            setTimeout(showMessage, 28 * sec, mainCharacterSpeech, counterAudio, "Wow! i definitely will, thank you!");
            setTimeout(showMessage, 32 * sec, counterSpeech, mcAudio, "No problem human.. Good luck.");

            setTimeout(function () { counterAvatarImg.style.opacity = 0 }, 36 * sec);
            break;

        default:
            //explode
            door1.style.opacity = 1;
            sign.style.opacity = 1;
            break;

    }

    updateInventory(gameState.inventory, inventoryList);


}

/**
 * function to change inventory
 * @param {string} itemName 
 * @param {string} action 
 * @returns 
 */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.log("Wrong parameters given to changeInventory");
        return
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);

            break;

        case 'delete':
            gameState.inventory.find(function (item, index) {
                if (item == itemName) {
                    var index = gameState.inventory.indexOf(item);
                    if (index !== -1) {
                        gameState.inventory.splice(index, 1);
                    }

                }
            })
            break;

        default:
            break;
    }
    updateInventory(gameState.inventory, inventoryList);
}
/**
 * update inventoryList
 * @param {Array} inventory array of items
 * @param {HTMLElement} inventoryList html <ul> element
 */
function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = "inv-" + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);

    })



}

/**
 * Shows a message in the speech bubble
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound 
 * @param {string} message 
 */
function showMessage(targetBalloon, targetSound, message) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBalloon.style.opacity = "1";
    targetBalloon.innerText = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon, targetSound);
}

/**
 * Sets the opacity to 0 so you don't see it anymore
 * @param {getElementById} targetBalloon
 * @param {getElementById} targetSound
 */
function hideMessage(targetBalloon, targetSound) {
    targetSound.pause();
    targetBalloon.style.opacity = "0";
}

//showMessage("mainCharacterSpeech");
//showMessage("counterSpeech");
//setTimeout(showMessage, 1 * sec, mainCharacterSpeech, "hey what's up");
//setTimeout(showMessage, 2 * sec, counterSpeech, "Yo buddy");

showMessage()

/**
 * store gameState into localStorage.gameState
 * @param {Object} gameState our gameState object
 */
//function saveToBrowser(gameState) {
// localStorage.gameState = JSON.stringify(gameState);
//}