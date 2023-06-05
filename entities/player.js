import Slash from "./slash.js";
import Vortex from "./vortex.js";
import tir_vortex from "./tir_vortex.js";

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

        this.time_from_last_vortex = 0
        this.vortex_cooldown = 200

        this.swap = false

        this.create_animation();
        this.is_not_atk = true;

        this.setOrigin(0.5, 1);
        this.setSize(24, 50, true);
        this.setOffset(20 ,14)
        console.log(this)
    }

    blocage_touche () {
        offTouche = false
    }

    cd_wall_jump () {
        wall_jump = true
    }

    deplacement() {
        if(!this.body) return;

        if (this.keyboard.left.isDown && this.is_not_atk) { //si la touche gauche est appuyée
            this.setVelocityX(-300); //alors vitesse négative en X
            window.dataPlayer.direction = "left"
            this.setFlipX(true);
            this.setVelocityX(-160);
            this.anims.play('run', true);

        }

        else if (this.keyboard.right.isDown && this.is_not_atk) { //sinon si la touche droite est appuyée
            this.setVelocityX(300); //alors vitesse positive en X
            window.dataPlayer.direction = "right"
            this.setFlipX(false);
            this.setVelocityX(160);
            this.anims.play('run', true);
        }
        
        else {
            this.setVelocityX(0)
            if (this.body.onFloor() && this.is_not_atk) {
                this.anims.play('idle', true);
            }
        }

        if (this.keyboard.up.isDown && this.body.blocked.down && this.is_not_atk) { // si touche bas appuyée 
            this.setVelocityY(-300); //vitesse 
            window.dataPlayer.direction = "up"
            
        }


         // Creation  du Wall Jump 
        if (this.keyboard.up.isDown && this.body.blocked.right || this.keySPACE.isDown && this.body.blocked.right) {
        if (this.wall_jump == true) {
            this.wall_jump = false;
            this.offTouche = true;
            this.scene.time.delayedCall(200, ()=>{
                this.wall_jump = true
            });
            this.scene.time.delayedCall(200, ()=>{
                this.offTouche = false
            });

            this.setVelocityY(-p_deplacementY - 100);
            this.setVelocityX(-500);
                            
            }
        }
    
        if (this.keyboard.up.isDown && this.body.blocked.left || this.keySPACE.isDown && this.body.blocked.left) {
            if (this.wall_jump == true) {
                this.wall_jump = false;
                this.offTouche = true;
                this.scene.time.delayedCall(200, ()=>{
                    this.wall_jump = true
                });
                this.scene.time.delayedCall(200, ()=>{
                    this.offTouche = false
                });
                //setTimeout(this.wall_jump = true, 500);
                //setTimeout(this.offTouche = false, 200);
                this.setVelocityY(-p_deplacementY - 100);
                this.setVelocityX(500);
                            
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
            this.is_not_atk = false;
            this.anims.play('attaque', true);
            this.slash = new Slash (scene, this.x, this.y, sprite);
            this.slash.tirer(window.dataPlayer.direction);
            this.time_from_last_slash = new Date().getTime(); // on donne une nouvelle valeur a timefrom, on l'actualise pour avoir un delai
            this.scene.time.delayedCall(330, ()=>{
                this.is_not_atk = true
            });
        } 

    }

    fin_attaque(){

        this.is_not_atk = true

    }

    destruction_slash(bullet, slash) {

        bullet.destroy();
        slash.destroy();

    }

    slash_mobs(ennemi, slash) {

        slash.destroy();
        ennemi.destroy(); 

    }

    attaque_vortex(scene,sprite){

        if (this.swap == false) {
            //timer cree par phaser - valaeur donner et on regarde la différence
            console.log("01" + this.swap)
            if(new Date().getTime() - this.time_from_last_vortex < this.vortex_cooldown){
                return; 
            } 
            
            else{
                this.sprite_vortex = new Vortex (scene, this.x, this.y, sprite);
                console.log("02" + this.swap)
                this.sprite_vortex.activer(window.dataPlayer.direction);
                console.log("03" + this.swap)
                this.time_from_last_vortex = new Date().getTime(); // on donne une nouvelle valeur a timefrom, on l'actualise pour avoir un delai
                console.log("04" + this.swap)
                this.swap = true;
                console.log("05" + this.swap)
            } 
        }
    }

    attaque_vortex2(scene,sprite){

        if (this.swap == true) {
            console.log("06" + this.swap)
            this.sprite_ball = new tir_vortex (scene, this.x, this.y, sprite);
            this.sprite_ball.activer2(this.direction);
            this.time_from_last_vortex = new Date().getTime(); // on donne une nouvelle valeur a timefrom, on l'actualise pour avoir un delai
            this.swap = false; 
        }

    }

    absorption_vortex(bullet, vortex) {

        bullet.destroy();
        vortex.destroy();

    }

    create_animation() {

        this.scene.anims.create({
			key: 'idle',
			frames: this.scene.anims.generateFrameNumbers('perso', { start: 24, end: 28 }),
			frameRate: 5,
			repeat: -1
		}); 

        this.scene.anims.create({
			key: 'run',
			frames: this.scene.anims.generateFrameNumbers('perso', { start: 9, end: 15 }),
			frameRate: 12,
			repeat: -1
		}); 

        this.scene.anims.create({
			key: 'attaque',
			frames: this.scene.anims.generateFrameNumbers('perso', { start: 15, end: 21 }),
			frameRate: 30,
			repeat: 0
		}); 

    }
}
