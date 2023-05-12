import Tir from "./tir.js";


export default class Mobs extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);

        this.time_from_last_shot = 0; 
        this.fire_cooldown = 1000; 

        this.hp = 1
        
    }


    updateMob() {

        this.direction = "left"
        //this.scene.physics.add.collider(this.scene.player, this, this.scene.player.recoit_degats);

    }

    attaque(scene,sprite) {   

        if(!this.body) return;
        //timer cree par phaser - valaeur donner et on regarde la différence
        if(new Date().getTime() - this.time_from_last_shot < this.fire_cooldown){
             return; 
        } 

        else {
            this.tir = new Tir (scene, this.x, this.y, sprite);
            this.tir.tirer(this.direction);
            this.time_from_last_shot = new Date().getTime(); // on donne une nouvelle valauer a timefrom, on l'actualise pour avoir un delai
        }
    }
}