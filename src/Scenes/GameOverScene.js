class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.finalScore = data.score;
        this.won = data.win || false;
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        const titleText = this.add.text(centerX, centerY - 100, 'GAME OVER', {
            fontSize: '40px',
            color: '#ffffff',
        }).setOrigin(0.5);

        const message = this.won ? "You beat the game!" : "You lost!";
        this.add.text(centerX, centerY - 40, message, {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Button style config
        const buttonStyle = {
            fontSize: '20px',
            color: '#000',
            backgroundColor: '#dceeff',
            padding: { x: 30, y: 10 },
            fixedWidth: 140,
            align: 'center'
        };

        const menuBtn = this.add.text(centerX - 100, centerY + 40, 'MENU', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        
        const playAgainBtn = this.add.text(centerX + 100, centerY + 40, 'Again?', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        // Add rounded corners via graphics mask
        [menuBtn, playAgainBtn].forEach(btn => {
            const bg = this.add.graphics();
            bg.fillStyle(0xdceeff, 1);
            bg.fillRoundedRect(btn.x - 70, btn.y - 20, 140, 40, 10);
            bg.setDepth(-1);
        });

        menuBtn.on('pointerdown', () => this.scene.start('TitleScene'));
        playAgainBtn.on('pointerdown', () => this.scene.start('LevelSelect'));
    }
}
