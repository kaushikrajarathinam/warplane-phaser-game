const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    fps: { forceSetTimeOut: true, target: 30 },
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: [TitleScene, GameScene, UIScene, GameOverScene]
};

const game = new Phaser.Game(config);
