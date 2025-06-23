class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // audios
        this.load.audio('shoot', 'assets/shoot.ogg');
        this.load.audio('hit', 'assets/hit.ogg');
        this.load.audio('explode', 'assets/explode.ogg');


        this.load.image('sky', 'assets/sky_bg.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy1', 'assets/enemy1.png');
        this.load.image('enemy2', 'assets/enemy2.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('enemy_bullet', 'assets/enemy_bullet.png');
        this.load.image('enemy_bullet_special', 'assets/enemy_bullet_special.png');
        this.load.image('enemy_bullet_track', 'assets/enemy_bullet_track.png');
        this.load.image('enemy3', 'assets/enemy3.png');
        
    }

    create() {
        this.background = this.add.tileSprite(400, 300, 800, 600, 'sky');
        this.initGame();
        this.sfx = {
            shoot: this.sound.add('shoot'),
            hit: this.sound.add('hit'),
            explode: this.sound.add('explode'),
        };        
        this.input.keyboard.on('keydown-SPACE', this.shoot, this);
        this.waveText = this.add.text(10, 570, '', {
            fontSize: '18px',
            fill: '#ffffff'
        }).setScrollFactor(0);
            this.updateWaveText();
        
    }
    updateWaveText() {
        const wavesLeft = this.maxWaves - this.waveNumber + 1;
        this.waveText.setText(`Waves Left: ${wavesLeft}`);
    }

    initGame() {
        this.waveNumber = 1;
        this.waveInProgress = true;
        this.maxWaves = 10;
        this.player = this.physics.add.sprite(400, 550, 'player').setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S
        });

        this.playerBullets = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.enemyBullets = this.physics.add.group();

        this.lives = 3;
        this.score = 0;
        this.spawnWave();

        this.physics.add.overlap(this.playerBullets, this.enemies, this.handleEnemyHit, null, this);
        this.physics.add.overlap(this.enemyBullets, this.player, this.handlePlayerHit, null, this);
    }

    shoot() {
        if (!this.canShoot) return;
    
        const bullet = this.playerBullets.create(this.player.x, this.player.y - 20, 'bullet');
        bullet.setVelocityY(-300);
        this.sfx.shoot.play();
    }

    spawnWave() {
        this.waveInProgress = true;
        this.canShoot = false;
    
        const enemyCount = 5 + (this.waveNumber - 1);
        const minDistance = 50;
        const spawnPositions = [];
        let arrivedCount = 0;
    
        for (let i = 0; i < enemyCount; i++) {
            let x, targetY;
            let attempts = 0;
            let validPosition = false;
    
            while (!validPosition && attempts < 100) {
                x = Phaser.Math.Between(50, 750);
                targetY = Phaser.Math.Between(50, 250);
                validPosition = true;
    
                for (let pos of spawnPositions) {
                    const dx = pos.x - x;
                    const dy = pos.y - targetY;
                    if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
                        validPosition = false;
                        break;
                    }
                }
    
                attempts++;
            }
    
            if (validPosition) {
                spawnPositions.push({ x, y: targetY });
                let enemyType = 'enemy1';
                if (this.waveNumber >= 6) {
                    const roll = Phaser.Math.Between(0, 2);
                    enemyType = roll === 0 ? 'enemy1' : roll === 1 ? 'enemy2' : 'enemy3';
                } else if (this.waveNumber >= 4) {
                    enemyType = Phaser.Math.Between(0, 1) === 0 ? 'enemy1' : 'enemy2';
                }
    
                const enemy = this.enemies.create(x, -50, enemyType);
                enemy.setRotation(Math.PI);
    
                this.tweens.add({
                    targets: enemy,
                    y: targetY,
                    duration: 1000,
                    ease: 'Power2',
                    onComplete: () => {
                        arrivedCount++;
                        if (arrivedCount === enemyCount) {
                            this.canShoot = true;
    
                            this.enemies.getChildren().forEach(enemy => {
                                const offset = Phaser.Math.Between(30, 80);
    
                                // Side-to-side tween
                                this.tweens.add({
                                    targets: enemy,
                                    x: { from: enemy.x, to: enemy.x + offset },
                                    duration: 2000,
                                    yoyo: true,
                                    repeat: -1
                                });
    
                                // Bobbing tween
                                this.tweens.add({
                                    targets: enemy,
                                    y: { from: enemy.y, to: enemy.y + 10 },
                                    duration: 1000,
                                    yoyo: true,
                                    repeat: -1,
                                    ease: 'Sine.easeInOut'
                                });
    
                                // Shooting logic
                                this.time.addEvent({
                                    delay: Phaser.Math.Between(1500, 3500),
                                    callback: () => {
                                        if (!enemy.active) return;
                                    
                                        const type = enemy.texture.key;
                                    
                                        if (type === 'enemy3') {
                                            const trackBullet = this.enemyBullets.create(enemy.x, enemy.y, 'enemy_bullet_track');
                                            trackBullet.setData('isTracking', true);
                                            trackBullet.setData('createdAt', this.time.now);
                                            trackBullet.setScale(1.2);
                                            return;
                                        }
                                    
                                        if (type === 'enemy1') {
                                            const bullet = this.enemyBullets.create(enemy.x, enemy.y, 'enemy_bullet');
                                            bullet.setVelocityY(250);
                                        }
                                    
                                        if (type === 'enemy2') {
                                            const px = this.player.x;
                                            const py = this.player.y;
                                        
                                            const special = this.enemyBullets.create(enemy.x, enemy.y, 'enemy_bullet_special');
                                        
                                            const dx = px - enemy.x;
                                            const dy = py - enemy.y;
                                            const magnitude = Math.sqrt(dx * dx + dy * dy);
                                            const speed = 250;
                                        
                                            special.setVelocity((dx / magnitude) * speed, (dy / magnitude) * speed);
                                            special.setRotation(Math.atan2(dy, dx));
                                        
                                            this.tweens.add({
                                                targets: special,
                                                scaleX: 1.5,
                                                scaleY: 1.5,
                                                duration: 500,
                                                yoyo: true,
                                                repeat: -1,
                                                ease: 'Sine.easeInOut'
                                            });
                                        }
                                    },
                                    loop: true
                                });
                            });
                        }
                    }
                });
            }
        }
    }
    

    
    
    
    

    handleEnemyHit(bullet, enemy) {
        bullet.destroy();
        enemy.destroy();
        this.sfx.explode.play();
    
        let points = 10; 
        if (enemy.texture.key === 'enemy2') {
            points = 20;
        } else if (enemy.texture.key === 'enemy3') {
            points = 30;
        }
    
        this.score += points;
        this.events.emit('updateScore', this.score);
    }

    handlePlayerHit(player, bullet) {
        bullet.destroy();
    
        if (this.player.getData('invulnerable')) return;
    
        this.sfx.hit.play();
        this.lives -= 1;
        this.events.emit('updateLives', this.lives);

        this.player.setData('invulnerable', true);
        this.player.setAlpha(0.5);

        this.tweens.add({
            targets: this.player,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true,
            duration: 150,
            repeat: 4
        });
    
        this.time.delayedCall(1500, () => {
            this.player.setAlpha(1);
            this.player.setScale(1);
            this.player.setData('invulnerable', false);
        });
    
        if (this.lives <= 0) {
            this.scene.stop('UIScene');
            this.scene.start('GameOverScene', { score: this.score });
        }
    }

    update() {
        // Constants
        const ACCEL = 50;
        const MAX_SPEED = 250;
        const DRAG = 0.88; 

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= ACCEL;
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += ACCEL;
        }

        if (this.cursors.up.isDown && this.player.y > 400) {
            this.player.body.velocity.y -= ACCEL;
        } else if (this.cursors.down.isDown && this.player.y < 580) {
            this.player.body.velocity.y += ACCEL;
        }
        this.player.body.velocity.x *= DRAG;
        this.player.body.velocity.y *= DRAG;

        this.player.body.velocity.x = Phaser.Math.Clamp(this.player.body.velocity.x, -MAX_SPEED, MAX_SPEED);
        this.player.body.velocity.y = Phaser.Math.Clamp(this.player.body.velocity.y, -MAX_SPEED, MAX_SPEED);
    
        // Check for wave clear
        if (this.waveInProgress && this.enemies.countActive(true) === 0) {
            this.waveInProgress = false;
            this.canShoot = false;
    
            if (this.waveNumber >= this.maxWaves) {
                this.scene.stop('UIScene');
                this.scene.start('GameOverScene', { score: this.score, win: true });
                return;
            }
    
            this.time.delayedCall(2000, () => {
                this.waveNumber++;
                this.updateWaveText(); 
                this.spawnWave();
            });
        }
    
        // 🔁 Background scroll
        this.background.tilePositionY -= 10;
    
        // 🧠 Tracking bullet updates
        this.enemyBullets.getChildren().forEach(bullet => {
            if (bullet.getData('isTracking')) {
                const created = bullet.getData('createdAt');
                const elapsed = this.time.now - created;
    
                if (elapsed < 2000) {
                    const dx = this.player.x - bullet.x;
                    const dy = this.player.y - bullet.y;
                    const mag = Math.sqrt(dx * dx + dy * dy);
                    const speed = 220;
    
                    bullet.setVelocity((dx / mag) * speed, (dy / mag) * speed);
                    bullet.setRotation(Math.atan2(dy, dx) + Math.PI / 2);
                } else {
                    bullet.setData('isTracking', false);
                }
            }
        });
    }

    
    
}
