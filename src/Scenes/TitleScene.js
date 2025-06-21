class TitleScene extends Phaser.Scene {
    constructor() { super('TitleScene'); }

    create() {
        this.add.text(300, 250, "GALLERY SHOOTER", { fontSize: '32px' });
        this.add.text(290, 300, "Press SPACE to Start", { fontSize: '16px' });
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
            this.scene.start('UIScene');
        });
    }
}
