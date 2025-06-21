class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }

    create() {
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '16px' });
        this.livesText = this.add.text(700, 10, 'Lives: 3', { fontSize: '16px' });

        const gameScene = this.scene.get('GameScene');
        gameScene.events.on('updateScore', (score) => this.scoreText.setText('Score: ' + score));
        gameScene.events.on('updateLives', (lives) => this.livesText.setText('Lives: ' + lives));
    }
}
