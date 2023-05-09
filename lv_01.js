//import Player from "./player.js";

export default class lv_01 extends Phaser.Scene {
    constructor() {
        
        super("lv_01");

    }


    preload() {

    // chargement tuiles de jeu
    this.load.image("tile_set01", "assets/tile_set.png");

    // chargement de la carte
    this.load.tilemapTiledJSON("lv_01", "level/lv_01.json");

    this.load.spritesheet('perso','assets/perso.png',
        { frameWidth: 256, frameHeight: 256 })
        ;

    }


    create() {

        //this.scene.start('salle_01', { hp: 3 })

        console.log(this)
        // chargement de la carte
        const map = this.add.tilemap("lv_01");
    
        // chargement du jeu de tuiles
        const tileset = map.addTilesetImage(
          "tile_set", // Nom du tiled dans dossier
          "tile_set01" // Nom du tiled donner plus haut pour le rapel
        );
    
        // chargement du calque background_01
        const sol = map.createLayer( //'imp" nom donner au calque si besoin de le rapeller dans le code
            "sol", // Nom du calque tiled
            tileset
        ); 
    
        const mur = map.createLayer( 
            "mur", // Nom du calque tiled
            tileset
        ); 
    
        
        //CREATION JOUEUR ET PROPRIETES

        //Initialisation de la caméra et des limites de jeu
        this.cameras.main.setBounds(0, 0, 2048, 3584);
        this.cameras.main.zoom = 0.65;
        this.physics.world.setBounds(0, 0, 2048, 3584);

        //Mise en place de la caméra qui suit le joueur
        this.cameras.main.startFollow(this.player);

        //COLLIDER JOUEURS AVEC MAP
        this.physics.add.collider(this.player, mur);

        //Collisions avec tileset
        mur.setCollisionByExclusion(-1, true);

        /*sortie_layer.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, sortie_layer, () => {
        
            console.log ("test")
            this.scene.start("salle_01", {
                x : 1920,
                y : 3500,
            });
        }); */
    }


    
    



    update() {


    }

};