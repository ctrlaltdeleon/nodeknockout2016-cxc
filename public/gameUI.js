var score = 0;
var scoreText;
var scoreBoard;

function displayScore(){
	scoreBoard = game.add.image(16,16,'scoreBoard');
	scoreBoard.fixedToCamera = true;

	scoreString = 'Score: Nice'
	scoreText = game.add.text(48, 21, scoreString, { font: 'Verdana', fontSize: '32px', fill: '#cdba52' });
	scoreText.fixedToCamera = true;
}

var graphics;

function createHealthBar(health){
	scoreBoard = game.add.image(562,16,'scoreBoard');
	scoreBoard.fixedToCamera = true;

	scoreText = game.add.text(590, 21, 'HP', { font: 'Verdana', fontSize: '32px', fill: '#cdba52' });
	scoreText.fixedToCamera = true;

	//618 = game width 832 - health bar 150 - spacing 32
	graphics = game.add.graphics(610,0);

	graphics.beginFill(0xC00000, 1);
	graphics.lineStyle(2, 0x000000, 1);
    graphics.drawRect(32, 25, 150, 30);
	graphics.endFill();
	
	graphics.beginFill(0x00C000, 1);
	graphics.lineStyle(2, 0x000000, 1);
    graphics.drawRect(32, 25, health, 30);
	graphics.endFill();
	
	graphics.fixedToCamera = true;
}

function updateHealthBar(health)
{
	graphics.clear();
	graphics.beginFill(0xC00000, 1);
	graphics.lineStyle(2, 0x000000, 1);
    graphics.drawRect(32, 25, 150, 30);
	graphics.endFill();
	
	graphics.beginFill(0x00C000, 1);
	graphics.lineStyle(2, 0x000000, 1);
    graphics.drawRect(32, 25, health*30, 30);
	graphics.endFill();
	
	return health;
}