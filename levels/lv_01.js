import Player from "../entities/player.js";
import Mobs from "../entities/mobs.js";

var keyA;
var keyE;

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
        { frameWidth: 32, frameHeight: 48 });

    this.load.image("snake", "assets/snake.png"); //Sprite mob

    this.load.image("sprite_tir", "assets/projectile.png"); //Sprite tir

    this.load.image("slash", "assets/slash.png"); //Sprite tir

    this.load.image("sprite_vortex", "assets/vortex.png"); //Sprite tir

    }

    


    create() {

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        //this.scene.start('salle_01', { hp: 3 })

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
        this.player = new Player(this, 50,50, 'perso');

        //Initialisation de la caméra et des limites de jeu
        this.cameras.main.setBounds(0, 0, 2048, 3584);
        this.cameras.main.zoom = 0.65;
        this.physics.world.setBounds(0, 0, 2048, 3584);

        //Mise en place de la caméra qui suit le joueur
        this.cameras.main.startFollow(this.player);

        //COLLIDER JOUEURS AVEC MAP
        this.physics.add.collider(this.player, mur);
        this.physics.add.collider(this.player, sol);

        //Collisions avec tileset
        mur.setCollisionByExclusion(-1, true);
        sol.setCollisionByExclusion(-1, true);

        /*sortie_layer.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, sortie_layer, () => {
        
            console.log ("test")
            this.scene.start("salle_01", {
                x : 1920,
                y : 3500,
            });
        }); */


        // Creation groupes
        this.groupe_ennemis = this.physics.add.group();

        this.groupe_bullets = this.physics.add.group();

        this.slash = this.physics.add.group();

        this.groupe_vortex = this.physics.add.group();

        //Creation des ennemis à partir du layer objet dans Tiled
        map.getObjectLayer('ennemis').objects.forEach((objet) => {
            this.groupe_ennemis.add(new Mobs (this,objet.x, objet.y, "snake"));
            
            this.physics.add.collider(this.groupe_ennemis,sol);
            this.physics.add.collider(this.groupe_ennemis,mur);
        });
        
        console.log(this.groupe_ennemis.children)

        // le groupe / les elements du groupe / un tableau qui contient 
        this.groupe_ennemis.children.entries.forEach(mob => {
            mob.body.setImmovable(true);
        });

        this.physics.add.collider(this.player, this.groupe_ennemis, this.player.recoit_degats);

        this.physics.add.collider(mur, this.groupe_bullets, this.player.annihilation);
        this.physics.add.collider(sol, this.groupe_bullets, this.player.annihilation);

        this.physics.add.collider(this.groupe_ennemis, this.slash, this.player.slash_mobs);

        this.physics.add.collider(this.player, this.groupe_bullets, (player, bullet) => {
            this.player.inflige_degats(player, bullet);
        });

        //this.physics.add.collider(this.slash, this.groupe_bullets, this.player.destruction_slash);

        this.physics.add.collider(this.groupe_bullets, this.slash, (bullet, slash) => {
            this.player.destruction_slash(bullet, slash);
        });

        this.physics.add.collider(this.groupe_vortex, this.groupe_bullets, (groupe_vortex, bullet) => {
            this.player.absorption_vortex(bullet ,groupe_vortex);
        });
    }


    update() {
        
        //Player
        this.player.deplacement();

        if (keyA.isDown) {

            console.log ("test A");
            this.player.attaque_slash(this, this.slash);
            console.log (this)
        }

        if (keyE.isDown) {

            console.log ("test E");
            this.player.attaque_vortex(this, this.sprite_vortex);
            console.log (this)
        }

        //Mobs
        this.groupe_ennemis.children.entries.forEach(mob => {
            mob.updateMob();
            mob.attaque(this, this.sprite_tir);
        });

        //console.log(this.player.elementPosition)
    }

};