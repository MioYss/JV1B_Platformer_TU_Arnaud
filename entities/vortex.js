
export default class Vortex extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture); 
        this.keyboard = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

    }
    
    //fonction tirer( ), prenant comme paramètre l'auteur du tir
        activer(direction) {
            
            // mesasge d'alerte affichant les attributs de player
            console.log ("joueur en position"+" "+ window.dataPlayer.x + ","+ window.dataPlayer.y + ", direction du tir: "
            +direction) ; 

            var coefDirX;
            var coefDirY;
            
            console.log ("tir direction: "+ direction)

            if (direction === 'left') { coefDirX = -1; coefDirY = 0} 

                else if (direction === 'right') { coefDirX = 1; coefDirY = 0}

                else if (direction === 'up') { coefDirY = 1; coefDirX = 0}

                else if (direction === 'down') { coefDirY = -1; coefDirX = 0}


            // on crée le vortex a coté du joueur
            var sprite_vortex = this.scene.groupe_vortex.create(this.x + (25 * coefDirX), this.y -4, 'sprite_vortex');

            // parametres physiques de la balle.
            
            sprite_vortex.body.allowGravity =false;

            // faire un var = true
            // une autre false
            // fais 2 temps sur le E du vortex
            // SI true, vortex qui arrete les balle, et si il y a eu colision var : nombre de balle arretrer +1
            // Si fasle, vortex renvoie et crée des balles ?
            

        } 
}