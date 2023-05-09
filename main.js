import entre_manoir from "./entre_manoir.js";
import menu from "./menu.js";
import manoir from "./manoir.js";
import salle_01 from "./salle_01.js";



var config = {
    type: Phaser.AUTO,
    width: 1280, height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },

    scene: [menu,manoir,entre_manoir,salle_01]
};
var game = new Phaser.Game(config);