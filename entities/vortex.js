var groupe_vortex;

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
            this.sprite_vortex = this.scene.groupe_vortex.create(this.x + (25 * coefDirX), this.y -4, 'sprite_vortex');

            // parametres physiques de la balle.
            
            this.sprite_vortex.body.allowGravity =false;
            
        } 

        /*activer2(direction) {
            
            var coefDirX;
            var coefDirY;

            if (direction == 'left') { coefDirX = -1; coefDirY = 0} 

                else if (direction == 'right') { coefDirX = 1; coefDirY = 0}

                else if (direction == 'up') { coefDirY = 1; coefDirX = 0}

                else if (direction == 'down') { coefDirY = -1; coefDirX = 0}


            // on crée a coté du joueur
            this.sprite_ball = this.scene.groupe_ball_energie.create(this.x + (25 * coefDirX), this.y -4, 'sprite_ball');

            // parametres physiques de la balle.
            this.sprite_ball.setVelocity(500 * coefDirX, 500 * coefDirY); // vitesse en x et en y
            this.sprite_ball.body.allowGravity =false;

        }*/
}