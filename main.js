import lv_01 from "./levels/lv_01.js";
import menu from "/levels/menu.js";
import tuto_01 from "../levels/tuto_01.js";
import tuto_02 from "../levels/tuto_02.js";
import lv_001 from "../levels/lv_001.js";
import lv_02 from "../levels/lv_02.js";
import lv_03 from "../levels/lv_03.js";


var config = {
    type: Phaser.AUTO,
    width: 896, height: 448, //W=896 H=448
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GRAVITY_GAME },
            debug: true,
        }
    },

    scene: [menu,lv_01,tuto_01,lv_001,lv_02,lv_03,tuto_02]
};
var game = new Phaser.Game(config);