import Slash from "./slash.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.keyboard = scene.input.keyboard.createCursorKeys(); // up, down, right, left, space, shift
        this.keyE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // ajout E
        this.keySPACE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // ajout space

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);

        this.direction;

        // declaration variable
        this.wall_jump = true;
        this.offTouche = true;

        this.invulnerable = false;
        this.hp = 1
        this.duree_invulnerable = 1000

        this.time_from_last_slash = 0
        this.slash_cooldown = 200

    }

    blocage_touche () {
        offTouche = false
    }

    cd_wall_jump () {
        wall_jump = true
    }

    deplacement() {
        if(!this.body) return;

        if (this.keyboard.left.isDown) { //si la touche gauche est appuyée
            this.setVelocityX(-300); //alors vitesse négative en X
            window.dataPlayer.direction = "left"

        }

        else if (this.keyboard.right.isDown) { //sinon si la touche droite est appuyée
            this.setVelocityX(300); //alors vitesse positive en X
            window.dataPlayer.direction = "right"
        }
        
        else {
            this.setVelocityX(0)
        }

        if (this.keyboard.up.isDown && this.body.blocked.down) { // si touche bas appuyée 
            this.setVelocityY(-300); //vitesse 
            window.dataPlayer.direction = "up"
        }


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

        window.dataPlayer.x = this.x;
        window.dataPlayer.y = this.y;
    }

    recoit_degats(player, ennemi){

        player.hp -= 1;
            
        if(player.hp <= 0) {
            player.mort_player()
        }
    }

    annihilation(mur, bullet){

        // destruction tir quand touche mur
        mur.destroy();

    }

    inflige_degats(player, bullet){

        bullet.destroy();

        player.hp -= 1; 
        if(player.hp <= 0) {
            this.mort_player()
        }
    }

    mort_player(){

        this.scene.scene.restart()
    }

    attaque_slash(scene,sprite) {

        //timer cree par phaser - valaeur donner et on regarde la différence
        if(new Date().getTime() - this.time_from_last_slash < this.slash_cooldown){
            return; 
        } 

        else{
           this.slash = new Slash (scene, this.x, this.y, sprite);
           this.slash.tirer(window.dataPlayer.direction);
           this.time_from_last_slash = new Date().getTime(); // on donne une nouvelle valauer a timefrom, on l'actualise pour avoir un delai

        } 

    }

    destruction_slash(bullet, slash) {

        bullet.destroy();
        slash.destroy();

    }

    slash_mobs(ennemi, slash) {

        slash.destroy();
        ennemi.destroy(); 

    }


}
