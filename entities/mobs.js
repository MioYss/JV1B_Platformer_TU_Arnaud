
export default class Mobs extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);

        this.updateMob();

    }


    updateMob() {

        //this.scene.physics.add.collider(this.scene.player, this, this.scene.player.recoit_degats);

    }


    

}