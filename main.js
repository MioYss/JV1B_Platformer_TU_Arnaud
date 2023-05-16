import lv_01 from "./levels/lv_01.js";
import menu from "/levels/menu.js";


var config = {
    type: Phaser.AUTO,
    width: 1280, height: 720, //W=896 H=448
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GRAVITY_GAME },
            debug: true,
        }
    },

    scene: [menu,lv_01]
};
var game = new Phaser.Game(config);