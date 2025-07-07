class Level2Scene extends Phaser.Scene {
    constructor() {
        super('Level2Scene');
    }

    preload() {
        this.load.audio('shoot', 'assets/shoot.ogg');
        this.load.audio('hit', 'assets/hit.ogg');
        this.load.audio('explode', 'assets/explode.ogg');
        
        this.load.image('wrench', 'assets/wrench.png');
        this.load.image('sky', 'assets/sky_bg.png');
        this.load.image('ship1', 'assets/player/ship1.png');
        this.load.image('ship2', 'assets/player/ship2.png');
        this.load.image('ship3', 'assets/player/ship3.png');
        this.load.image('ship4', 'assets/player/ship4.png');

        // player bullet
        this.load.spritesheet('playerBullet', 'assets/player/bullet.png', {
            frameWidth: 32,  
            frameHeight: 32, 
            endFrame: 9      
        });

        this.load.spritesheet('enemy1', 'assets/enemy1/enemy1.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemy1Destruction', 'assets/enemy1/enemy1destruction.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemy1bullet', 'assets/enemy1/enemy1bullet.png', { frameWidth: 4, frameHeight: 16 });

        this.load.spritesheet('enemy2', 'assets/enemy2/enemy2.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemy2Destruction', 'assets/enemy2/enemy2destruction.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemy2bullet', 'assets/enemy2/enemy2bullet.png', { frameWidth: 8, frameHeight: 16 });

        this.load.spritesheet('enemy3', 'assets/enemy3/enemy3.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemy3Destruction', 'assets/enemy3/enemy3destruction.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemy3bullet', 'assets/enemy3/enemy3bullet.png', { frameWidth: 11, frameHeight: 32 });

        this.load.spritesheet('enemy4', 'assets/enemy4/enemy4.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemy4Destruction', 'assets/enemy4/enemy4destruction.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemy4bullet', 'assets/enemy4/enemy4bullet.png', { frameWidth: 4, frameHeight: 16 });        
        this.load.spritesheet('enemy4shoot', 'assets/enemy4/enemy4shoot.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('enemy5', 'assets/enemy5/enemy5.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemy5Destruction', 'assets/enemy5/enemy5destruction.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemy5bullet', 'assets/enemy5/enemy5bullet.png', { frameWidth: 8, frameHeight: 16 });        
        this.load.spritesheet('enemy5shoot', 'assets/enemy5/enemy5shoot.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('enemy6', 'assets/enemy6/enemy6.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemy6Destruction', 'assets/enemy6/enemy6destruction.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemy6bullet', 'assets/enemy6/enemy6bullet.png', { frameWidth: 11, frameHeight: 32 });        
        this.load.spritesheet('enemy6shoot', 'assets/enemy6/enemy6shoot.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('enemy1shoot', 'assets/enemy1/enemy1shoot.png', { frameWidth: 64, frameHeight: 64 });
this.load.spritesheet('enemy2shoot', 'assets/enemy2/enemy2shoot.png', { frameWidth: 64, frameHeight: 64 });
this.load.spritesheet('enemy3shoot', 'assets/enemy3/enemy3shoot.png', { frameWidth: 64, frameHeight: 64 });
        

        this.load.image('bullet', 'assets/bullet.png');
    }

    create() {
        console.log(this.textures.get('enemy4bullet').frameTotal); // Should be 4
console.log(this.textures.get('enemy5bullet').frameTotal); // Should be 4
console.log(this.textures.get('enemy6bullet').frameTotal); // Should be 3   
        this.background = this.add.tileSprite(400, 300, 800, 600, 'sky');


        this.anims.create({
            key: 'playerBulletAnim',
            frames: this.anims.generateFrameNumbers('playerBullet', { start: 0, end: 9 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'explodeEnemy1',
            frames: this.anims.generateFrameNumbers('enemy1Destruction', { start: 0, end: 19 }),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key: 'explodeEnemy2',
            frames: this.anims.generateFrameNumbers('enemy2Destruction', { start: 0, end: 19 }),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key: 'explodeEnemy3',
            frames: this.anims.generateFrameNumbers('enemy3Destruction', { start: 0, end: 19 }),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: 'anim_enemy1bullet',
            frames: this.anims.generateFrameNumbers('enemy1bullet', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'anim_enemy2bullet',
            frames: this.anims.generateFrameNumbers('enemy2bullet', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'anim_enemy3bullet',
            frames: this.anims.generateFrameNumbers('enemy3bullet', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy1Shoot',
            frames: this.anims.generateFrameNumbers('enemy1shoot', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'enemy2Shoot',
            frames: this.anims.generateFrameNumbers('enemy2shoot', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'enemy3Shoot',
            frames: this.anims.generateFrameNumbers('enemy3shoot', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'explodeEnemy4',
            frames: this.anims.generateFrameNumbers('enemy4Destruction', { start: 0, end: 19 }),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key: 'anim_enemy4bullet',
            frames: this.anims.generateFrameNumbers('enemy4bullet', { start: 0, end: 4 }), // 5 frames
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'enemy4Shoot',
            frames: this.anims.generateFrameNumbers('enemy4shoot', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'explodeEnemy5',
            frames: this.anims.generateFrameNumbers('enemy5Destruction', { start: 0, end: 19 }),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key: 'anim_enemy5bullet',
            frames: this.anims.generateFrameNumbers('enemy5bullet', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'enemy5Shoot',
            frames: this.anims.generateFrameNumbers('enemy5shoot', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        
        this.anims.create({
            key: 'explodeEnemy6',
            frames: this.anims.generateFrameNumbers('enemy6Destruction', { start: 0, end: 19 }),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key: 'anim_enemy6bullet',
            frames: this.anims.generateFrameNumbers('enemy6bullet', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'enemy6Shoot',
            frames: this.anims.generateFrameNumbers('enemy6shoot', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });

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
    
        // Initialize player with 100 HP and starting sprite
        this.player = this.physics.add.sprite(400, 550, 'ship1').setCollideWorldBounds(true);
        this.player.setData('hp', 100);
    
        // Set up controls
        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S
        });
    
        // Create physics groups
        this.playerBullets = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.enemyBullets = this.physics.add.group();
    
        // Initialize score and wave
        this.score = 0;
        this.spawnWave();
    
        // Collision detection
        this.physics.add.overlap(this.playerBullets, this.enemies, this.handleEnemyHit, null, this);
        this.physics.add.overlap(this.enemyBullets, this.player, this.handlePlayerHit, null, this);
    }
    

    shoot() {
        if (!this.canShoot) return;
    
        const bullet = this.playerBullets.create(this.player.x, this.player.y - 20, 'playerBullet');
        bullet.setScale(0.7)
        bullet.play('playerBulletAnim');
        bullet.setVelocityY(-300);
        this.sfx.shoot.play();
    }

    spawnWave() {
        this.waveInProgress = true;
        this.canShoot = false;
    
        const enemyCount = Math.floor(10 + (this.waveNumber - 1) * ((30 - 10) / (this.maxWaves - 1)));
        const patternOptions = ['circle', 'pentagon', 'star', 'zigzag', 'arc', 'cross'];
        const pattern = Phaser.Utils.Array.GetRandom(patternOptions);
    
        const positions = this.getEnemyPattern(pattern, enemyCount);
        let arrivedCount = 0;
    
        positions.forEach(pos => {
            let stageRoll = Phaser.Math.Between(1, 100);
            let stage;

            if (this.waveNumber <= 2) {
                stage = 1;
            } else if (this.waveNumber <= 5) {
                if (stageRoll <= 70) stage = 1;
                else stage = 2;
            } else {
                if (stageRoll <= 70) stage = 1;
                else if (stageRoll <= 90) stage = 2;
                else stage = 3;
            }

            let enemyType;
            if (stage === 1) {
                enemyType = Phaser.Math.Between(0, 1) === 0 ? 'enemy1' : 'enemy4';
            } else if (stage === 2) {
                enemyType = Phaser.Math.Between(0, 1) === 0 ? 'enemy2' : 'enemy5';
            } else {
                enemyType = Phaser.Math.Between(0, 1) === 0 ? 'enemy3' : 'enemy6';
            }

    
            const enemy = this.enemies.create(pos.x, pos.y - 100, enemyType);
            const maxHitsMap = {
                enemy1: 1,
                enemy2: 2,
                enemy3: 4,
                enemy4: 2,
                enemy5: 3,
                enemy6: 5
            };
            let maxHits = maxHitsMap[enemyType] || 1;
    
            enemy.setData('hitCount', 0);
            enemy.setData('maxHits', maxHits);
            enemy.setData('enemyType', enemyType);
            enemy.setRotation(Math.PI);
            enemy.setSize(30, 40);
            enemy.setOffset(17, 12);
    
            this.tweens.add({
                targets: enemy,
                y: pos.y,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    arrivedCount++;
                    if (arrivedCount === enemyCount) {
                        this.canShoot = true;
    
                        this.enemies.getChildren().forEach(enemy => {
                            const offset = Phaser.Math.Between(30, 80);
    
                            this.tweens.add({
                                targets: enemy,
                                x: { from: enemy.x, to: enemy.x + offset },
                                duration: 2000,
                                yoyo: true,
                                repeat: -1
                            });
    
                            this.tweens.add({
                                targets: enemy,
                                y: { from: enemy.y, to: enemy.y + 10 },
                                duration: 1000,
                                yoyo: true,
                                repeat: -1,
                                ease: 'Sine.easeInOut'
                            });
    
                            this.time.addEvent({
                                delay: Phaser.Math.Between(1000, 2500), // faster fire delay
                                callback: () => {
                                    if (!enemy.active) return;
    
                                    const type = enemy.texture.key;
                                    let bullet;
    
                                    if (type === 'enemy1') {
                                        enemy.play('enemy1Shoot');
                                        enemy.once('animationcomplete', () => enemy.setTexture('enemy1'));
                                        bullet = this.enemyBullets.create(enemy.x, enemy.y, 'enemy1bullet');
                                        bullet.play('anim_enemy1bullet');
                                        bullet.setVelocityY(250);
                                    }
    
                                    if (type === 'enemy2') {
                                        enemy.play('enemy2Shoot');
                                        enemy.once('animationcomplete', () => enemy.setTexture('enemy2'));
                                        const speed = 250;
                                        const angles = [Phaser.Math.DegToRad(120), Phaser.Math.DegToRad(60)];
                                        angles.forEach(angle => {
                                            bullet = this.enemyBullets.create(enemy.x, enemy.y, 'enemy2bullet');
                                            bullet.play('anim_enemy2bullet');
                                            bullet.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
                                            bullet.setRotation(angle + Math.PI / 2);
                                        });
                                    }
    
                                    if (type === 'enemy3') {
                                        enemy.play('enemy3Shoot');
                                        enemy.once('animationcomplete', () => enemy.setTexture('enemy3'));
                                        bullet = this.enemyBullets.create(enemy.x, enemy.y, 'enemy3bullet');
                                        bullet.play('anim_enemy3bullet');
                                        bullet.setScale(1.5);
                                        bullet.setData('enemy3_bullet_state', 'homing');
                                        bullet.setData('createdAt', this.time.now);
                                    }
    
                                    if (type === 'enemy4') {
                                        enemy.play('enemy4Shoot');
                                        enemy.once('animationcomplete', () => enemy.setTexture('enemy4'));
                                        bullet = this.enemyBullets.create(enemy.x, enemy.y, 'enemy4bullet');
                                        bullet.setTint(0xff0000);
                                        bullet.setVelocityY(350);
                                    }
    
                                    if (type === 'enemy5') {
                                        enemy.play('enemy5Shoot');
                                        enemy.once('animationcomplete', () => enemy.setTexture('enemy5'));
                                        const bullet = this.enemyBullets.create(enemy.x, enemy.y, 'enemy5bullet');
                                        bullet.setData('createdAt', this.time.now);
                                        bullet.setTint(0x39FF14);
                                        bullet.play('anim_enemy5bullet');
                                    }
                                 
                                    if (type === 'enemy6') {
                                        enemy.play('enemy6Shoot');
                                        enemy.once('animationcomplete', () => enemy.setTexture('enemy6'));
                                        bullet = this.enemyBullets.create(enemy.x, enemy.y, 'enemy6bullet');
                                        bullet.setData('enemy6_state', 'homing');
                                        bullet.setTint(0xFFC0CB);
                                        bullet.setData('createdAt', this.time.now);
                                    }
                                },
                                loop: true
                            });
                        });
                    }
                }
            });
        });
    }
    
    handleEnemyHit(bullet, enemy) {
        bullet.destroy();
    
        const hitCount = enemy.getData('hitCount');
        const maxHits = enemy.getData('maxHits');
        const type = enemy.getData('enemyType');
    
        if (hitCount + 1 < maxHits) {
            enemy.setData('hitCount', hitCount + 1);
            enemy.setTintFill(0xffffff);
            this.time.delayedCall(100, () => enemy.clearTint());
            return;
        }
    
        // Explosion animation
        const animKeyMap = {
            enemy1: 'explodeEnemy1',
            enemy2: 'explodeEnemy2',
            enemy3: 'explodeEnemy3',
            enemy4: 'explodeEnemy4',
            enemy5: 'explodeEnemy5',
            enemy6: 'explodeEnemy6'
        };
    
        const textureKey = type + 'Destruction';
        const animKey = animKeyMap[type] || 'explodeEnemy1';
    
        const explosion = this.add.sprite(enemy.x, enemy.y, textureKey);
        explosion.setFlipY(true);
        explosion.play(animKey);
        enemy.disableBody(true, true);
    
        this.sfx.explode.play();
    
        // Score logic
        const scoreMap = {
            enemy1: 10,
            enemy2: 20,
            enemy3: 30,
            enemy4: 25,
            enemy5: 35,
            enemy6: 40
        };
    
        const scoreAdd = scoreMap[type] || 10;
        this.score += scoreAdd;
        this.events.emit('updateScore', this.score);
    
        // Wrench drop chance: 5%
        if (Phaser.Math.Between(1, 100) <= 5) {
            const wrench = this.physics.add.sprite(enemy.x, enemy.y, 'wrench');
            wrench.setVelocityY(100);
            wrench.setDepth(1);
            this.physics.add.overlap(this.player, wrench, () => {
                // Optional: Increase HP or do something here
                let hp = this.player.getData('hp');
                hp = Math.min(100, hp + 20);  // heal 20 HP maxing at 100
                this.player.setData('hp', hp);
                this.events.emit('updateLives', hp);
                wrench.destroy();
            });
        }
    }
    
    handlePlayerHit(player, bullet) {
        const bulletType = bullet.texture.key;
    
        if (bulletType === 'wrench') {
            // Heal +20 HP (max 100)
            let hp = this.player.getData('hp');
            hp = Math.min(100, hp + 20);
            this.player.setData('hp', hp);
            this.events.emit('updateLives', hp);
            bullet.destroy();
            return;
        }
    
        bullet.destroy();
        this.sfx.hit.play();
    
        const heavyHit = ['enemy3bullet', 'enemy6bullet'];
        const damage = heavyHit.includes(bulletType) ? 5 : 1;
    
        let hp = this.player.getData('hp') - damage;
        hp = Math.max(0, hp);
        this.player.setData('hp', hp);
        this.events.emit('updateLives', hp);
    
        // Flash white effect
        this.player.setTintFill(0xffffff);
        this.time.delayedCall(100, () => this.player.clearTint());
    
        // Update player sprite based on HP
        let newSpriteKey;
        if (hp > 75) newSpriteKey = 'ship1';
        else if (hp > 50) newSpriteKey = 'ship2';
        else if (hp > 25) newSpriteKey = 'ship3';
        else newSpriteKey = 'ship4';
    
        if (this.player.texture.key !== newSpriteKey) {
            const { x, y, body } = this.player;
            const velocity = { x: body.velocity.x, y: body.velocity.y };
    
            this.player.setTexture(newSpriteKey);
            this.player.setPosition(x, y);
            this.player.body.setVelocity(velocity.x, velocity.y);
        }
    
        if (hp <= 0) {
            this.scene.stop('UIScene');
            this.scene.start('GameOverScene', { score: this.score });
        }
    }
    

    getEnemyPattern(patternName, count) {
        const centerX = 400;
        const centerY = 150;
        const radius = 120;
        const spacing = 50;
        const positions = [];
        const maxBobbingOffset = 80;
    
        const screenLeft = 0 + 32 + maxBobbingOffset;
        const screenRight = 800 - 32 - maxBobbingOffset;
        const screenTop = 0 + 32;
        const screenBottom = 600 - 100;
    
        const enemyWidth = 64;
        const enemyHeight = 64;
        const safeW = enemyWidth + spacing;
        const safeH = enemyHeight + spacing;
    
        switch (patternName) {
            case 'circle':
            case 'pentagon':
            case 'star': {
                const angleStep = (2 * Math.PI) / count;
                for (let i = 0; i < count; i++) {
                    const angle = i * angleStep;
                    let jitter = Phaser.Math.Between(-10, 10); // random spread
                    positions.push({
                        x: centerX + (radius + jitter) * Math.cos(angle),
                        y: centerY + (radius + jitter) * Math.sin(angle)
                    });
                }
                break;
            }
    
            case 'arc': {
                const arcWidth = Math.PI;
                const angleStep = arcWidth / (count - 1);
                for (let i = 0; i < count; i++) {
                    const angle = angleStep * i - arcWidth / 2;
                    positions.push({
                        x: centerX + radius * Math.cos(angle),
                        y: centerY + radius * Math.sin(angle)
                    });
                }
                break;
            }
    
            case 'cross': {
                const half = Math.floor(count / 2);
                for (let i = 0; i < count; i++) {
                    if (i < half) {
                        positions.push({
                            x: centerX,
                            y: centerY + (i - half / 2) * spacing
                        });
                    } else {
                        positions.push({
                            x: centerX + ((i - half) - half / 2) * spacing,
                            y: centerY
                        });
                    }
                }
                break;
            }
    
            case 'zigzag': {
                const perRow = Math.floor((800 - 100) / 50); // enemies per zigzag row (50 = approx enemy+spacing)
                const rows = Math.ceil(count / perRow);
                for (let r = 0; r < rows; r++) {
                    for (let i = 0; i < perRow && (r * perRow + i) < count; i++) {
                        positions.push({
                            x: 100 + i * 50,
                            y: centerY + r * 70 + ((i % 2 === 0) ? -20 : 20)
                        });
                    }
                }
                break;
            }
    
            default:
                console.warn('Unknown pattern, using clean grid fallback');
                const maxCols = Math.floor((screenRight - screenLeft) / safeW);
                const startX = screenLeft + safeW / 2;
                const startY = screenTop + safeH / 2;
    
                for (let i = 0; i < count; i++) {
                    const col = i % maxCols;
                    const row = Math.floor(i / maxCols);
                    const x = startX + col * safeW;
                    const y = startY + row * safeH;
                    positions.push({ x, y });
                }
        }
    
        // Shuffle and jitter lightly
        const shuffled = Phaser.Utils.Array.Shuffle(positions);
    
        return shuffled.map(pos => ({
            x: Phaser.Math.Clamp(pos.x + Phaser.Math.Between(-8, 8), screenLeft, screenRight),
            y: Phaser.Math.Clamp(pos.y + Phaser.Math.Between(-8, 8), screenTop, screenBottom)
        }));
    }
    

    update() {
        const ACCEL = 50, MAX = 250, DRAG = 0.88;

        if (this.cursors.left.isDown) this.player.body.velocity.x -= ACCEL;
        else if (this.cursors.right.isDown) this.player.body.velocity.x += ACCEL;
        if (this.cursors.up.isDown && this.player.y > 400) this.player.body.velocity.y -= ACCEL;
        else if (this.cursors.down.isDown && this.player.y < 580) this.player.body.velocity.y += ACCEL;

        this.player.body.velocity.x *= DRAG;
        this.player.body.velocity.y *= DRAG;
        this.player.body.velocity.x = Phaser.Math.Clamp(this.player.body.velocity.x, -MAX, MAX);
        this.player.body.velocity.y = Phaser.Math.Clamp(this.player.body.velocity.y, -MAX, MAX);

        if (this.waveInProgress && this.enemies.countActive(true) === 0) {
            this.waveInProgress = false;
            this.canShoot = false;
            if (this.waveNumber >= this.maxWaves) {
                this.registry.set('unlockedLevel', 3);
                this.scene.start('LevelComplete');
                return;
            }
            this.time.delayedCall(2000, () => {
                this.waveNumber++;
                this.updateWaveText();
                this.spawnWave();
            });
        }

        this.background.tilePositionY -= 10;

        this.enemyBullets.getChildren().forEach(b => {
            if (!b.active) return;
        
            const texture = b.texture.key;
        
            // --- Enemy 3: Homing -> Spinning -> Launch ---
            if (texture === 'enemy3bullet') {
                const state = b.getData('enemy3_bullet_state');
        
                if (state === 'homing') {
                    const dx = this.player.x - b.x;
                    const dy = this.player.y - b.y;
                    const angle = Math.atan2(dy, dx);
                    const speed = 120;
                    b.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
                    b.setRotation(angle + Math.PI / 2);
        
                    if (this.time.now - b.getData('createdAt') > 800) {
                        b.setVelocity(0, 0);
                        b.setData('enemy3_bullet_state', 'spinning');
                        b.setData('spinStart', this.time.now);
                    }
        
                } else if (state === 'spinning') {
                    const dx = this.player.x - b.x;
                    const dy = this.player.y - b.y;
                    const angle = Math.atan2(dy, dx);
                    b.setRotation(angle + Math.PI / 2);
        
                    if (this.time.now - b.getData('spinStart') > 600) {
                        const fireAngle = Math.atan2(this.player.y - b.y, this.player.x - b.x);
                        const speed = 400;
                        b.setVelocity(Math.cos(fireAngle) * speed, Math.sin(fireAngle) * speed);
                        b.setRotation(fireAngle + Math.PI / 2);
                        b.setData('enemy3_bullet_state', 'launched');
                    }
                }
            }
        
            // --- Enemy 5: Berserk Spiral Missile ---
            else if (texture === 'enemy5bullet') {
                const t = (this.time.now - b.getData('createdAt')) / 1000;
            
                const zigzagDuration = 0.3; // seconds per segment
                const segment = Math.floor(t / zigzagDuration);
                const dir = segment % 2 === 0 ? 1 : -1; // alternate left and right
            
                const speed = 200; // diagonal speed
                const velocityX = dir * speed;
                const velocityY = speed;
            
                b.setVelocity(velocityX, velocityY);
                b.setRotation(Math.atan2(velocityY, velocityX) + Math.PI / 2);
            }
            // --- Enemy 6: Homing → Locked-In Trajectory ---
            else if (texture === 'enemy6bullet') {
                const state = b.getData('enemy6_state');
                const createdAt = b.getData('createdAt');
        
                if (state === 'homing') {
                    const elapsed = this.time.now - createdAt;
                    if (elapsed >= 1000) {
                        b.setData('enemy6_state', 'locked');
                        return;
                    }
        
                    const dx = this.player.x - b.x;
                    const dy = this.player.y - b.y;
                    const angle = Math.atan2(dy, dx);
                    const speed = 160;
                    b.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
                    b.setRotation(angle + Math.PI / 2);
                }
            }
        });
        
        
    }
}
