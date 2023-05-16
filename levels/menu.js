export default class menu extends Phaser.Scene {
    constructor() {

        super("menu");
    }
    preload() {
        this.load.image('ecran', '../assets/ecran_titre.png');
     
        
    }
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        const startSpace = Phaser.Input.Keyboard.JustDown(this.cursors.space);
        this.add.image(640, 360, 'ecran'); 

   
        
    }
    
    update() {
        //LANCE PREMIERE SCENE QUAND ESPACE APPUYE
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){
            this.scene.start("lv_01", {
                x : 1200, 
                y : 1300,
            });
        }
    }
    
};