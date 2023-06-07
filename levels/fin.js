export default class fin extends Phaser.Scene {
    constructor() {

        super("fin");
    }
    preload() {
        this.load.image('fin', '../assets/ecran_titre_03.png');
     
        
    }
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        const startSpace = Phaser.Input.Keyboard.JustDown(this.cursors.space);
        this.add.image(448, 224, 'fin'); 

   
        
    }
    
    update() {
        //LANCE PREMIERE SCENE QUAND ESPACE APPUYE
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){
            this.scene.start("tuto_01", {
                x : 1200, 
                y : 1300,
            });
        }
    }
    
};