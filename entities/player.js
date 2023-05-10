
export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.keyboard = scene.input.keyboard.createCursorKeys(); // up, down, right, left, space, shift
        this.keyE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // ajout E
        this.keySPACE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // ajout space

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);

        this.direction = 'left';

        // declaration variable
        this.wall_jump = true;
        this.offTouche = true;

        this.invulnerable = false;



    }

    blocage_touche () {
        offTouche = false
    }

    cd_wall_jump () {
        wall_jump = true
    }

    deplacement() {
        if (this.keyboard.left.isDown) { //si la touche gauche est appuyée
            this.setVelocityX(-300); //alors vitesse négative en X
            this.direction = "left"

        }

        else if (this.keyboard.right.isDown) { //sinon si la touche droite est appuyée
            this.setVelocityX(300); //alors vitesse positive en X
            this.direction = "right"
        }
        
        else {
            this.setVelocityX(0)
        }

        if (this.keyboard.up.isDown && this.body.blocked.down) { // si touche bas appuyée 
            this.setVelocityY(-300); //vitesse 
            this.direction = "down"
        }
        console.log(this.direction)


         // Creation  du Wall Jump 
        if (this.keyboard.up.isDown && this.body.blocked.right || this.keySPACE.isDown && this.body.blocked.right) {
        if (this.wall_jump == true) {
            this.wall_jump = false;
            this.offTouche = true;
            setTimeout(this.wall_jump = true, 500);
            setTimeout(this.offTouche = false, 200);
            this.setVelocityY(-p_deplacementY);
            this.setVelocityX(-50);
                            
            }
        }
    
        if (this.keyboard.up.isDown && this.body.blocked.left || this.keySPACE.isDown && this.body.blocked.left) {
            if (this.wall_jump == true) {
                this.wall_jump = false;
                this.offTouche = true;
                setTimeout(this.wall_jump = true, 500);
                setTimeout(this.offTouche = false, 200);
                this.setVelocityY(-p_deplacementY);
                this.setVelocityX(50);
                            
            }
        }
    }

    recoit_degats(player, ennemi){

        if(player.invulnerable == false){
            player.invulnerable = true;

            player.hp -= 1;
            
            if(player.hp <= 0) {
                player.scene.scene.start("menu");
            }


            player.setTint(0xff0000);  // met le player rouge
            player.scene.cameras.main.shake(200, 0.01); // shake de cam
            console.log(player.hp); 

            setTimeout(() => {
                player.invulnerable = false;
                player.setTint(0xffffff); // met le player normal
    
            }, player.duree_invulnerable);
            
        }
    }
}