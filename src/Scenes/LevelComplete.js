class LevelComplete extends Phaser.Scene {
    constructor() {
        super('LevelComplete');
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        // Background (optional: solid color or tileSprite)
        this.add.rectangle(centerX, centerY, 800, 600, 0x000000).setAlpha(0.2);

        // Title text
        this.add.text(centerX, centerY - 100, 'LEVEL COMPLETE', {
            fontSize: '48px',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Button config
        const buttonStyle = {
            fontSize: '20px',
            backgroundColor: '#add8e6',
            color: '#ffffff',
            padding: { x: 20, y: 10 },
            align: 'center',
            fixedWidth: 150,
            fixedHeight: 50
        };

        // Menu Button
        const menuButton = this.add.text(centerX - 120, centerY + 20, 'MENU', buttonStyle)
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => menuButton.setStyle({ backgroundColor: '#87cefa' }))
            .on('pointerout', () => menuButton.setStyle({ backgroundColor: '#add8e6' }))
            .on('pointerdown', () => {
                this.scene.start('TitleScene');
            });

        // Continue Button
        const continueButton = this.add.text(centerX + 120, centerY + 20, 'CONTINUE', buttonStyle)
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => continueButton.setStyle({ backgroundColor: '#87cefa' }))
            .on('pointerout', () => continueButton.setStyle({ backgroundColor: '#add8e6' }))
            .on('pointerdown', () => {
                this.scene.start('LevelSelect');
            });
    }
}
