class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }

    create() {
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;
    
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '16px' });
    
        this.hpBarBg = this.add.rectangle(screenWidth - 10, screenHeight - 10, 100, 16, 0x444444)
            .setOrigin(1, 1)
            .setScrollFactor(0);
    
        this.hpBar = this.add.rectangle(screenWidth - 10, screenHeight - 10, 100, 16, 0xffffff)
            .setOrigin(1, 1)
            .setScrollFactor(0);
    
        // Listen to all gameplay scenes
        ['GameScene', 'Level2Scene', 'Boss'].forEach(sceneKey => {
            this.scene.get(sceneKey)?.events.on('updateScore', (score) => {
                this.scoreText.setText('Score: ' + score);
            });
    
            this.scene.get(sceneKey)?.events.on('updateLives', (hp) => {
                const clamped = Phaser.Math.Clamp(hp, 0, 100);
                this.hpBar.width = clamped;
            });
        });
    }
    
}
