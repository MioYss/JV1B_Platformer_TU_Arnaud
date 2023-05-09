import menu from "./menu.js";


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