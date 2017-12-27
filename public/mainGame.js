var mainGame = function(game) {};
mainGame.prototype = {
	
	preload : function() {
		game.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
		game.load.audio('hurt','assets/audio/hurt.mp3')
		game.load.audio('sonic','assets/audio/NotSonicRingSoundEffect.mp3')

		game.load.image('ground', 'assets/concreteBlock.png');
	 	game.load.image('BG', 'assets/BG_expanded.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('enemy', 'assets/poopSprite.png');
		game.load.image('scoreBoard', 'assets/scoreBoard.png')
		game.load.image('theWall', 'assets/theWall.png')

		game.load.atlasJSONHash('characters', '/assets/spritesheets/characters.png', '/assets/spritesheets/characters.json');
		game.load.atlasJSONHash('characters_2', '/assets/spritesheets/characters_2.png', '/assets/spritesheets/characters_2.json');
	},

	create : function() {
		game.world.setBounds(0, 0, 2048, 1120);
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//Background Image
		var background = game.add.image(0,0,'BG');
		var theWall = game.add.image(1280,320,'theWall');
		
		//Player Controls
		wasd.up = game.input.keyboard.addKey(Phaser.Keyboard.W),
		wasd.down = game.input.keyboard.addKey(Phaser.Keyboard.S),
		wasd.left = game.input.keyboard.addKey(Phaser.Keyboard.A),
		wasd.right = game.input.keyboard.addKey(Phaser.Keyboard.D),
		wasd.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		//  Stop the following keys from propagating up to the browser
    	game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

		// Music and sounds
		music = playBackgroundMusic();
		hurt = game.add.audio('hurt');
		sonic = game.add.audio('sonic');
		music.volume = 0.1;
		music.play();

	    //Platforms and ground
	    //*Platforms are to be in increments of 32 to look neat (x-axis only)
	    //*Off x (going right), off y (going down), x, y
	    platforms = game.add.group();
	    platforms.enableBody = true;
		this.firstFloor1 = game.add.tileSprite(0,game.world.height-32,game.world.width-1120,game.world.height-32,'ground');
		var firstFloor2 = game.add.tileSprite(1856,game.world.height-32,192,game.world.height-32,'ground');
		var secondFloor = game.add.tileSprite(0,game.world.height-640,game.world.width-192,192,'ground');
		var bottomLedge1 = game.add.tileSprite(1024,game.world.height-128,128,32,'ground');
		this.ledge2 = game.add.tileSprite(32,288,192,32,'ground');
		this.topLedge3 = game.add.tileSprite(928,384,192,32,'ground');
		var topLedge4 = game.add.tileSprite(1024,288,96,32,'ground');
		var topLedge5 = game.add.tileSprite(1024,192,96,32,'ground');
		var wall1 = game.add.tileSprite(1184,160,32,320,'ground');
		var fallingLedge1 = game.add.tileSprite(1856,game.world.height-480,192,32,'ground');
		var fallingLedge2 = game.add.tileSprite(1632,game.world.height-64,64,32,'ground');
		var fallingLedge3 = game.add.tileSprite(1440,game.world.height-128,64,32,'ground');
		var fallingLedge4 = game.add.tileSprite(1632,game.world.height-192,64,32,'ground');
		var fallingLedge5 = game.add.tileSprite(1440,game.world.height-256,64,32,'ground');
		platforms.add(this.firstFloor1);
		platforms.add(firstFloor2);
		platforms.add(secondFloor);
		platforms.add(bottomLedge1);
		platforms.add(this.ledge2);
		platforms.add(this.topLedge3);
		platforms.add(topLedge4);
		platforms.add(topLedge5);
		platforms.add(wall1);
		platforms.add(fallingLedge1);
		platforms.add(fallingLedge2);
		platforms.add(fallingLedge3);
		platforms.add(fallingLedge4);
		platforms.add(fallingLedge5);
		this.firstFloor1.body.immovable = true;
		firstFloor2.body.immovable = true;
		secondFloor.body.immovable = true;
		this.ledge2.body.immovable = true;
		this.topLedge3.body.immovable = true;
		topLedge4.body.immovable = true;
		topLedge5.body.immovable = true;
		wall1.body.immovable = true;
		
		//Player Variables
		health = 150;
		
		//Sets controls
		cursors = game.input.keyboard.createCursorKeys();

		//Initializes player sprite
		this.player = new Player(game, 50, 100);

		game.camera.follow(this.player.sprite);

		//End Level Item
		items = game.add.group();
		items.enableBody = true;
		coin = items.create(100, game.world.height-160,'coin');
		coin.body.setSize(100,100,10,10);

		//enemies
		enemies = game.add.physicsGroup();
		this.enemy1 = new enemy(game,300,20, this.player);
		this.enemy2 = new enemy(game,500,380, this.player);
		this.enemy3 = new enemy(game,1050,180, this.player);
		this.enemy4 = new enemy(game,300,700, this.player);
		this.enemy5 = new enemy(game,400,700, this.player);
		this.enemy6 = new enemy(game,500,700, this.player);
		this.enemy7 = new enemy(game,600,700, this.player);
		this.enemy8 = new enemy(game,675,700, this.player);
		this.enemy9 = new enemy(game,900,700, this.player);

		//UI Elements (Added to end to have it displayed top over everything.)
		displayScore();
		createHealthBar(health);
	},

	update : function() {

		//kills player if player is touching floor of canvas
		if(this.player.sprite.body.onFloor()){
			this.player.playerIsDead();
		}

		//Collision with platforms
		var hitPlatform = game.physics.arcade.collide(this.player.sprite, platforms);
		var enemyHitPlatform = game.physics.arcade.collide(enemies, platforms);

		// Initializes player controls
		this.player.initControls(game, cursors, wasd);

		//enemy patrolling
		this.enemy1.platformPatrol(this.ledge2);
		this.enemy2.patrol(500, 200);
		this.enemy3.platformPatrol(this.topLedge3);
		this.enemy4.patrol(200, 300);
		this.enemy5.patrol(250, 300);
		this.enemy6.patrol(300, 300);
		this.enemy7.patrol(350, 300);
		this.enemy8.patrol(750, 1);
		this.enemy9.patrol(900, 1);

		//check for collision
		game.physics.arcade.overlap(this.player.sprite, coin, collectCoin, null, this);
		game.physics.arcade.overlap(this.player.sprite, enemies, playerTakeDamage, null, this);		
	},

}; 

function collectCoin(){
	sonic.play();
	coin.kill();

	//Victory
	var ending1 = game.add.image(288,224,'scoreBoard');
	ending1.fixedToCamera = true;

	var ending2 = game.add.text(330,228, 'YOU WON!', { font: 'Verdana', fontSize: '32px', fill: '#cdba52' });
	ending2.fixedToCamera = true;
};

function playerTakeDamage(){
	if(game.time.now - invul > 1500){
		//damages player
		this.player.health -= 1;
		//checks to see if player is dead via damage
		if(this.player.health <= 0){
			this.player.playerIsDead();
		}
		this.player.isHit = true;
		invul = game.time.now;
		hurt.play();
		this.player.health = updateHealthBar(this.player.health);
		game.time.events.add(Phaser.Timer.SECOND*.1, playerRecover,this);
		this.player.sprite.animations.play('take_damage');
	}
};

function playerRecover(){
	this.player.isHit = false;
	console.log("recovered");

};