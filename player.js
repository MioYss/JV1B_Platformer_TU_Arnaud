
export default class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture); 
        this.keyboard = scene.input.keyboard.createCursorKeys(); // up, down, right, left, space, shift
        this.keyE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // ajout E

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);

        this.direction = 'left';  

    }



    deplacement() {
        if (this.keyboard.left.isDown){ //si la touche gauche est appuyée
            this.setVelocityX(-300); //alors vitesse négative en X
            this.direction = "left"
            
        }
    
        else if (this.keyboard.right.isDown){ //sinon si la touche droite est appuyée
            this.setVelocityX(300); //alors vitesse positive en X
            this.direction = "right"
        }
    
        else if (this.keyboard.up.isDown && this.body.blocked.down){ // si touche bas appuyée 
            this.setVelocityY(-300); //vitesse 
            this.direction = "down"
        }
        else {
            this.setVelocityX(0) & this.setVelocityY (0)
        }
        console.log (this.direction)
    }
}