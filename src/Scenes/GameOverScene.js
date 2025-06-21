class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.finalScore = data.score;
        this.won = data.win || false;
    }
    
    create() {
        const title = this.won ? "YOU WIN!" : "GAME OVER";
    
        this.add.text(300, 250, title, { fontSize: '32px' });
        this.add.text(300, 300, 'Score: ' + this.finalScore, { fontSize: '20px' });
        this.add.text(280, 350, 'Press SPACE to Restart', { fontSize: '16px' });
    
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
            this.scene.start('UIScene');
        });
    }
    
}
