import Player from "./player.js";

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

        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        console.log(this)
        // chargement de la carte
        const map = this.add.tilemap("lv_01");
    
        // chargement du jeu de tuiles
        const tileset = map.addTilesetImage(
          "tile_set", // Nom du tiled dans dossier
          "tile_set01" // Nom du tiled donner plus haut pour le rapel
        );
    
        // chargement du calque background_01
        const bg01 = map.createLayer( //'imp" nom donner au calque si besoin de le rapeller dans le code
            "bg01", // Nom du calque tiled
            tileset
        ); 
    
        const mur = map.createLayer( 
            "mur", // Nom du calque tiled
            tileset
        ); 
            // chargement du changement de zone
        const sortie_layer = map.createLayer(
            "sortie_layer",
            tileset
        ); 
    


        
        //CREATION JOUEUR ET PROPRIETES
        this.player = new Player(this, 1000,3200, 'perso');
        this.player.setSize(150, 230, true);

        //CREATION BATON
        this.baton01 = this.physics.add.sprite(1000, 2900, 'baton01');

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

        sortie_layer.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, sortie_layer, () => {
        
            console.log ("test")
            this.scene.start("salle_01", {
                x : 1920,
                y : 3500,
            });
        });


        //Creation tir 
        this.groupe_bullets = this.physics.add.group();

        this.groupe_ennemis = this.physics.add.group();

        this.groupe_soins = this.physics.add.group();

        //Creation des ennemis à partir du layer objet dans Tiled
        map.getObjectLayer('ennemis').objects.forEach((objet) => {

            this.groupe_ennemis.create(objet.x, objet.y, 'book'); 

        });



        // pour chaque enfant ennemi du calque
        this.groupe_ennemis.children.each(function(child) {
            
            child.setScale(0.6);

            child.body.allowGravity = false;
            child.body.immovable = true; 

            child.hp = 3; 
        
            tween_mouvement = this.tweens.add({
                targets: [child],  // on applique le tween sur platefprme_mobile
                paused: false, // de base le tween est en pause
                ease: "Linear",  // concerne la vitesse de mouvement : linéaire ici 
                duration: 2000,  // durée de l'animation pour trajet
                yoyo: true,   // mode yoyo : une fois terminé on "rembobine" le déplacement 
                x: "-=300",   // on va déplacer la plateforme de 300 pixel vers le haut par rapport a sa position
                delay: 0,     // délai avant le début du tween une fois ce dernier activé
                hold: 1000,   // délai avant le yoyo
                repeatDelay: 1000, // delay 
                repeat: -1 // répétition infinie 
            });

          }, this);


        // Collider / Overlap
        this.physics.add.collider(this.player, this.groupe_ennemis, this.player.recoit_degats);

        this.physics.add.collider(this.groupe_ennemis, this.groupe_bullets, this.player.inflige_degats);

        this.physics.add.collider(mur, this.groupe_bullets, this.player.annihilation); // destrction tir quand touche mur

        this.physics.add.overlap(this.player, this.baton01 , this.player.obtain_baton);

        this.physics.add.overlap(this.player, this.groupe_soins , this.player.soigne);

        // Placement UI
        this.ui_hp = this.add.image(-290, -140, "hp3").setOrigin(0,0).setScale(1.4);
        this.ui_hp.setScrollFactor(0);
        this.ui_hp.setDepth(10);
    }


    
    



    update() {

        this.player.deplacement ();

        if (keyE.isDown) {

            console.log ("test E");
        }

        if (keyA.isDown) {

            console.log ("test A");
            this.player.attaque(this, this.sprite_tir);
            console.log (this)
        }

        //HP player UI
        if(this.player.hp == 3){
            this.ui_hp.setTexture("hp3");
        }
        if(this.player.hp == 2){
            this.ui_hp.setTexture("hp2");
        }
        if(this.player.hp == 1){
            this.ui_hp.setTexture("hp1");
        }
    }

};