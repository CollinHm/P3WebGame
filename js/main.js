document.getElementById("title").innerText = "Point and Click Adventure game";
//game window reference
const gameWindow = document.getElementById("gameWindow");

//Game state
gameState = {
    "door2locked": true,

}

//Main Character
const mainCharacter = document.getElementById("mainCharacter");
const offsetCharacter = 16;

//Inventory
const inventoryBox = document.getElementById("inventoryBox")
const inventoryList = document.getElementById("inventoryList")

//Foreground items
const door1 = document.getElementById("door1");
const sign = document.getElementById("sign");

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    console.log(e.target.id);
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";


    switch (e.target.id) {
        case "door1":

            mainCharacter.style.backgroundColor = "#FFFF00";
            door1.style.opacity = 0.5;
            sign.style.opacity = 1;

            if (document.getElementById("key1") !== null) {
                console.log("Found Key!");
                document.getElementById("key1").remove();
                const keyElement = document.createElement("li");
                keyElement.id = "inv-key";
                keyElement.innerText = "Key";
                inventoryList.appendChild(keyElement);


            } break;

        case "door2":
            if (gameState.door2locked == true) {
                //check wether we have key
                if (document.getElementById("inv-key") !== null) {
                    //yes -> unlock door?
                    gameState.door2locked = false;
                } else {
                    //no -> alert 'door locked'
                    alert('Door is locked');
                }
            } else {
                console.log('Enter building');
            }



            break;



        case "sign":

            mainCharacter.style.backgroundColor = "#00FF00";
            sign.style.opacity = 0.5;
            door1.style.opacity = 1;

            break;

        default:
            //explode
            mainCharacter.style.backgroundColor = "#7FFFD4"
            door1.style.opacity = 1;
            sign.style.opacity = 1;
            break;

    }




}