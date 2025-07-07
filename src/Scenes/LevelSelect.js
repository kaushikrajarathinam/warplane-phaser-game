class LevelSelect extends Phaser.Scene {
    constructor() {
        super('LevelSelect');
    }

    preload() {
        this.load.image('sky', 'assets/sky_bg.png'); // Background image
    }

    create() {
        // Set static background
        this.sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
        this.scrollSpeed = 0;
        this.maxScrollSpeed = -50;

        const titleText = this.add.text(400, 100, 'PICK LEVEL', { fontSize: '28px', fill: '#fff' }).setOrigin(0.5);
        const unlockedLevel = this.registry.get('unlockedLevel') || 1;

        const levels = [
            { label: '1', x: 200, target: 'GameScene', unlock: 1 },
            { label: '2', x: 400, target: 'Level2Scene', unlock: 2 },
            { label: '3', x: 600, target: 'Boss', unlock: 3 },
        ];

        const boxes = [];
        const texts = [];

        levels.forEach(({ label, x, target, unlock }) => {
            const isUnlocked = unlockedLevel >= unlock;
            const boxColor = isUnlocked ? 0xadd8e6 : 0x555555;

            const box = this.add.rectangle(x, 300, 100, 100, boxColor);
            const text = this.add.text(x, 300, label, { fontSize: '32px', color: '#000' }).setOrigin(0.5);
            boxes.push(box);
            texts.push(text);

            if (isUnlocked) {
                box.setInteractive();
                box.on('pointerover', () => box.setFillStyle(0x87cefa));
                box.on('pointerout', () => box.setFillStyle(boxColor));
                box.on('pointerdown', () => {
                    boxes.forEach(b => b.disableInteractive());

                    // Animate title, boxes, and all text (including locked)
                    this.tweens.add({
                        targets: [titleText, ...boxes, ...texts],
                        y: '+=600',
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2'
                    });

                    this.tweens.addCounter({
                        from: 0,
                        to: this.maxScrollSpeed,
                        duration: 2000,
                        ease: 'Sine.easeIn',
                        onUpdate: (tween) => {
                            this.scrollSpeed = tween.getValue();
                        }
                    });

                    this.time.delayedCall(1000, () => {
                        this.scene.start(target);
                        this.scene.launch('UIScene');
                    });
                });
            } else {
                const lockText = this.add.text(x, 340, 'Locked', {
                    fontSize: '16px',
                    color: '#ff0000'
                }).setOrigin(0.5);
                texts.push(lockText); // 🔹 Include locked text in animations
            }
        });

        const cheatBtn = this.add.rectangle(760, 30, 60, 24, 0x000000, 0).setInteractive();
        const cheatText = this.add.text(760, 30, 'CHEAT?', {
            fontSize: '14px',
            color: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(1, 0.5).setAlpha(0);

        cheatBtn.on('pointerover', () => {
            cheatBtn.setFillStyle(0xff0000, 0.4);
            cheatText.setAlpha(1);
        });

        cheatBtn.on('pointerout', () => {
            cheatBtn.setFillStyle(0x000000, 0);
            cheatText.setAlpha(0);
        });

        cheatBtn.on('pointerdown', () => {
            this.registry.set('unlockedLevel', 3);
            this.scene.restart();
        });
    }

    update() {
        if (this.sky) {
            this.sky.tilePositionY += this.scrollSpeed; 
        }
    }
}
