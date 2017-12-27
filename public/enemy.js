enemy = function(game,x,y, player){

	//initialize variables for enemy
	this.player = player;
	this.game = game;
	this.health = 2;
	this.enableBody = true;
	this.ishit = false;

	// Add sprite to game set rotation point
	this.sprite = game.add.sprite(x,y,'characters', 'enemies/poop/0001.png');
	this.sprite.anchor.setTo(.5, .5);

	// Add sprite to enemies group
	enemies.add(this.sprite);

	// Enable phsyics on enemy
	game.physics.arcade.enable(this.sprite);
	this.sprite.body.immovable = false;
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.gravity.y = 500;
	this.sprite.body.velocity.x = 80;
	this.sprite.body.setSize(35,40,4,5);
	
	// Create animations for enemy sprite
	this.sprite.animations.add('move', Phaser.Animation.generateFrameNames('enemies/poop/', 1, 2, '.png', 4), 3, true);
	this.sprite.animations.play('move');

};

enemy.prototype.platformPatrol = function(platform){

	if(!this.isHit){

	// if sprite is moving to the right, 
    // check if its position greater than the width of the platform minus its width
    // if sprite is moving to the left, 
    // check if its position exceeds the left-most point of the platform
	    if (this.sprite.body.velocity.x > 0 && this.sprite.x > platform.x + (platform.width) ||
	            this.sprite.body.velocity.x < 0 && this.sprite.x < platform.x+5) {
	        this.sprite.body.velocity.x *= -1; 
	    }
    }
};

enemy.prototype.patrol = function(stagePosition, patrolWidth){

	if(!this.isHit){

	// if sprite is moving to the right, 
    // check if its position greater than the width of the patrol
    // if sprite is moving to the left, 
    // check if its position exceeds the left-most point of the patrol width
	    if (this.sprite.body.velocity.x > 0 && this.sprite.x > stagePosition + patrolWidth ||
	            this.sprite.body.velocity.x < 0 && this.sprite.x < stagePosition) {
	        this.sprite.body.velocity.x *= -1; 
	    }
    }
};