import Player from "../entities/player.js";
import Mobs from "../entities/mobs.js";
import mobs_twin from "../entities/mobs_twin.js";
import mobs_statique from "../entities/mobs_statique.js";


var keyA;
var keyE;
var keyR;
let tween_mouvement

export default class lv_001 extends Phaser.Scene {
    constructor() {
        
        super("lv_001");
        this.swap = false

    }


    preload() {

    // chargement tuiles de jeu
    this.load.image("tile_set_tuto_01", "assets/tile_set_lab.png");

    // chargement de la carte
    this.load.tilemapTiledJSON("lv_001", "level/lv_001.json");

    this.load.spritesheet('perso','assets/perso_sheet.png',
        { frameWidth: 64, frameHeight: 64 });

    this.load.spritesheet('snake','assets/mob_sheet-Sheet.png',
        { frameWidth: 64, frameHeight: 64 });

    this.load.image("sprite_tir", "assets/projectile.png"); //Sprite tir

    this.load.image("slash", "assets/slash02.png");

    this.load.image("sprite_vortex", "assets/vortex.png"); 

    this.load.image("sprite_ball", "assets/ball_energie.png"); 

    this.load.audio("sword_song", ["son/sword.mp3"])


    }

    


    create() {

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //this.scene.start('salle_01', { hp: 3 })

        //creation des sons

        this.sword_song = this.sound.add("sword_song");

        // chargement de la carte
        const map = this.add.tilemap("lv_001");
    
        // chargement du jeu de tuiles
        const tileset = map.addTilesetImage(
          "tile_set_lab", // Nom du tiled dans dossier
          "tile_set_tuto_01" // Nom du tiled donner plus haut pour le rapel
        );

        const back_lv_001 = map.createLayer( 
            "back_lv_001", // Nom du calque tiled
            tileset
        ); 
    
        // chargement du calque background_01
        const sol = map.createLayer( //'imp" nom donner au calque si besoin de le rapeller dans le code
            "sol_lv_001", // Nom du calque tiled
            tileset
        ); 
    
        const mur = map.createLayer( 
            "mur_lv_001", // Nom du calque tiled
            tileset
        ); 

        const fin_lv_001 = map.createLayer( 
            "fin_lv_001", // Nom du calque tiled
            tileset
        ); 
    
        
        //CREATION JOUEUR ET PROPRIETES
        this.player = new Player(this, 47,923, 'perso');

        //Initialisation de la caméra et des limites de jeu
        this.cameras.main.setBounds(0, 0, 2048, 3584);
        this.cameras.main.zoom = 1;
        this.physics.world.setBounds(0, 0, 2048, 3584);

        //Mise en place de la caméra qui suit le joueur
        this.cameras.main.startFollow(this.player);

        //COLLIDER JOUEURS AVEC MAP
        this.physics.add.collider(this.player, mur);
        this.physics.add.collider(this.player, sol);

        //Collisions avec tileset
        mur.setCollisionByExclusion(-1, true);
        sol.setCollisionByExclusion(-1, true);

        //fin de niveau
        fin_lv_001.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, fin_lv_001, () => {
        
            console.log ("test")
            this.scene.start("tuto_02", {
                x : 1920,
                y : 3500,
            });
        });


        // Creation groupes
        this.groupe_ennemis = this.physics.add.group();

        this.groupe_ennemis02 = this.physics.add.group();

        this.groupe_ennemis03 = this.physics.add.group();

        this.groupe_bullets = this.physics.add.group();

        this.slash = this.physics.add.group();

        this.groupe_vortex = this.physics.add.group();

        this.groupe_ball_energie = this.physics.add.group();

        //Creation des ennemis à partir du layer objet dans Tiled
        map.getObjectLayer('ennemis_lv_001').objects.forEach((objet) => {
            this.groupe_ennemis.add(new Mobs (this,objet.x, objet.y, "snake"));
            
            this.physics.add.collider(this.groupe_ennemis,sol);
            this.physics.add.collider(this.groupe_ennemis,mur);
        });

        //Creation des ennemis à partir du layer objet dans Tiled
             map.getObjectLayer('ennemis_lv_001_twin').objects.forEach((objet) => {
            this.groupe_ennemis02.add(new mobs_twin (this,objet.x, objet.y, "snake"));

            this.groupe_ennemis02.children.each(function(child) {
            
                child.setScale(1);
    
                child.body.immovable = true; 
    
                child.hp = 3; 
            
                tween_mouvement = this.tweens.add({
                    targets: [child],  // on applique le tween sur
                    paused: false, // de base le tween est en pause
                    ease: "Linear",  // concerne la vitesse de mouvement : linéaire ici 
                    duration: 1000,  // durée de l'animation pour trajet
                    yoyo: true,   // mode yoyo : une fois terminé on "rembobine" le déplacement 
                    x: "-=100",   // on va déplacer la plateforme de 300 pixel vers le haut par rapport a sa position
                    delay: 0,     // délai avant le début du tween une fois ce dernier activé
                    hold: 1000,   // délai avant le yoyo
                    repeatDelay: 1000, // delay 
                    repeat: -1 // répétition infinie 
                });
    
              }, this);
            this.physics.add.collider(this.groupe_ennemis02,sol);
            this.physics.add.collider(this.groupe_ennemis02,mur);
        });
        
        //Creation des ennemis à partir du layer objet dans Tiled
        map.getObjectLayer('ennemis_lv_001_statique').objects.forEach((objet) => {
            this.groupe_ennemis03.add(new mobs_statique (this,objet.x, objet.y, "snake"));
            
            this.physics.add.collider(this.groupe_ennemis03,sol);
            this.physics.add.collider(this.groupe_ennemis03,mur);
        });
        
        console.log(this.groupe_ennemis.children)

        // le groupe / les elements du groupe / un tableau qui contient 
        this.groupe_ennemis.children.entries.forEach(mob => {
            mob.body.setImmovable(true);
        });

        this.physics.add.collider(this.player, this.groupe_ennemis, this.player.recoit_degats);

        this.physics.add.collider(mur, this.groupe_bullets, this.player.annihilation);
        this.physics.add.collider(sol, this.groupe_bullets, this.player.annihilation);

        this.physics.add.collider(mur, this.groupe_ball_energie, this.player.annihilation);

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

        //ennemies twin

        this.physics.add.collider(this.player, this.groupe_ennemis02, this.player.recoit_degats);

        this.physics.add.collider(this.groupe_ennemis02, this.slash, this.player.slash_mobs);

        //ennemies statique
        
        this.physics.add.collider(this.player, this.groupe_ennemis03, this.player.recoit_degats);

        this.physics.add.collider(this.groupe_ennemis03, this.slash, this.player.slash_mobs);
    }


    update() {
        
        //Player
        this.player.deplacement();

        if (keyA.isDown) {

            console.log ("test A");
            this.player.attaque_slash(this);
            console.log (this);
            this.sword_song.play();
        }

        /*if (keyE.isDown) {

            console.log ("test E");
            this.player.attaque_vortex(this, this.sprite_vortex);
        }*/

        if (keyR.isDown) {
            console.log ("test R");
            this.player.attaque_vortex2(this, this.sprite_ball);
        }

        //Mobs
        this.groupe_ennemis.children.entries.forEach(mob => {
            mob.updateMob();
            mob.attaque(this, this.sprite_tir);
        });

        //console.log(this.player.elementPosition)
    }

};