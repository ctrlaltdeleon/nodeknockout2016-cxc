
// Methods related to the Player will go here

var Player = function(game, x, y) {
    this.jumpTimer = 0;
    this.isHit = false;
    this.health = 5;
    // Add sprite to game
    this.sprite = game.add.sprite(x, y, 'characters_2', 'player/samurai/idle/0001.png');
    this.sprite.anchor.setTo(.5, 0);
    this.flipSpriteHorizontally(this.sprite);

    // Enable physics on Player
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.checkCollision.up = false;
    this.sprite.body.gravity.y = 500;

    // Create animation for the Player
	this.sprite.animations.add('idle', Phaser.Animation.generateFrameNames('player/samurai/idle/', 1, 7, '.png', 4), 10, true);
	this.sprite.animations.add('dash', Phaser.Animation.generateFrameNames('player/samurai/dash/', 1, 3, '.png', 4), 10, false);
	this.sprite.animations.add('jump', Phaser.Animation.generateFrameNames('player/samurai/jump/', 1, 3, '.png', 4), 10, false);
	this.sprite.animations.add('fall', Phaser.Animation.generateFrameNames('player/samurai/fall/', 1, 3, '.png', 4), 10, false);
	this.sprite.animations.add('land', Phaser.Animation.generateFrameNames('player/samurai/land/', 1, 4, '.png', 4), 10, false);
	this.sprite.animations.add('slash_01', Phaser.Animation.generateFrameNames('player/samurai/slash/01/', 1, 2, '.png', 4), 5, false);
	this.sprite.animations.add('slash_02', Phaser.Animation.generateFrameNames('player/samurai/slash/02/', 1, 5, '.png', 4), 5, false);
	this.sprite.animations.add('slash_03', Phaser.Animation.generateFrameNames('player/samurai/slash/03/', 1, 6, '.png', 4), 5, false);
	this.sprite.animations.add('take_damage', Phaser.Animation.generateFrameNames('player/samurai/take_damage/', 1, 2, '.png', 4), 10, false);
}

// Initializes sprite controls
// Initialize function in the update method
Player.prototype.initControls = function(game, cursors, wasd) {
    // Reset player's velocity'
    this.sprite.body.velocity.x = 0;


    // Listen for movement controls
    this.initMovementControls(game, cursors, wasd);

    // Resets player's x position if body leaves map'
    if (this.sprite.body.x > game.world.width) {
        this.sprite.body.x = this.sprite.width;
    }
}

Player.prototype.initMovementControls = function(game, cursors, wasd) {
    var moveRight = cursors.right.isDown || wasd.right.isDown;
    var moveLeft = cursors.left.isDown|| wasd.left.isDown;
    var jumpUp = (cursors.up.isDown || wasd.up.isDown) && game.time.now > this.jumpTimer && this.sprite.body.touching.down;
    var attack = wasd.spacebar.isDown;

    // Attacking controls
    if (attack) {
        // Randomly generates one of the slashing motions from idle motion
        if (this.sprite.animations.currentAnim.name == 'idle') {
            var slashAnimationName = 'slash_0' + Math.round(Math.random() * 3 + 1);
            this.sprite.animations.play(slashAnimationName);
        }
    } 
    // Movement Controls
    else {
        // Move right
        if (moveRight) {
            if (this.sprite.scale.x > 0) {
                this.flipSpriteHorizontally(this.sprite);
            } else {
                if(!this.isHit){
                    this.sprite.body.x += 3;
                    this.playAnimation('dash');
                }
            }
        } 

        // Move left
        else if (moveLeft) {
            if (this.sprite.scale.x < 0) {
                this.flipSpriteHorizontally(this.sprite);
            } else {
                if(!this.isHit){
                    this.sprite.body.x -= 3;
                    this.playAnimation('dash');
                }
            }
        }

        // No button pressed
        else {
            if (this.sprite.body.touching.down) {
                this.playAnimation('idle');
                this.sprite.body.velocity.x = 0;
            }
        }

        // Jump up
        if(jumpUp){
            this.sprite.body.velocity.y = -350;
            this.playAnimation('jump');
        }
        
        // Sprite fall animation
        if(this.sprite.body.velocity.y > 10 && !this.sprite.body.touching.down) {
            this.sprite.animations.play('fall');
        }
    }   
}

Player.prototype.flipSpriteHorizontally = function(sprite) {
    sprite.scale.x = sprite.scale.x * -1;
}

Player.prototype.playAnimation = function(animationName) {
    if (this.sprite.body.touching.down) {
        this.sprite.animations.play(animationName);
    }
}

Player.prototype.playerIsDead = function(player){
    game.state.start('mainGame');
    music.stop();
}