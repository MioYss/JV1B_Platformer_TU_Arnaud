import Tir from "./tir.js";


export default class mobs_statique extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);

        this.time_from_last_shot = 0; 
        this.fire_cooldown = 1000; 

        this.hp = 1
        
        this.setOrigin(0, 2);
        this.setSize(30, 55, true);
        this.setOffset(0.5 ,10)
    }

}