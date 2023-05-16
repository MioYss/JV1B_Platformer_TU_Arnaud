var groupe_bullets;

export default class Tir extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture); 
        this.keyboard = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

    }
    
    //fonction tirer( ), prenant comme paramètre l'auteur du tir
        tirer( direction) {
            
            // mesasge d'alerte affichant les attributs de player
            console.log ("joueur en position"+" "+ window.dataPlayer.x + ","+ window.dataPlayer.y + ", direction du tir: "
            +direction) ; 

            var coefDirX;
            var coefDirY;
            
            console.log ("tir direction: "+ direction)

           /* if (direction === 'left') { coefDirX = -1; coefDirY = 0} 

                else if (direction === 'right') { coefDirX = 1; coefDirY = 0}

                else if (direction === 'up') { coefDirY = 1; coefDirX = 0}

                else if (direction === 'down') { coefDirY = -1; coefDirX = 0}*/

            // on crée la balle a coté du joueur
            var sprite_tir = this.scene.groupe_bullets.create(this.x + (25 * direction.x), this.y -4, 'sprite_tir');

            // parametres physiques de la balle.
            
            sprite_tir.setCollideWorldBounds(true);
            sprite_tir.body.allowGravity =false;
            sprite_tir.setVelocity(500 * direction.x, 500 * direction.y); // vitesse en x et en y

        } 
}