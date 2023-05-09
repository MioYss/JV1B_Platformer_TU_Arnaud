import lv_01 from "./lv_01.js";
import menu from "./menu.js";


var config = {
    type: Phaser.AUTO,
    width: 1280, height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: gravity_game },
            debug: true
        }
    },

    scene: [menu,lv_01]
};
var game = new Phaser.Game(config);