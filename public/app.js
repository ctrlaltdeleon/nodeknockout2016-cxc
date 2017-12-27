var game = new Phaser.Game(832, 480, Phaser.AUTO, 'gameContainer');
var music;
var cursors;
var invul = 50;

var space;
var wasd = {
	up: ' ',
	down: ' ',
	left: ' ',
	right: ' ',
	spacebar: ' '
};

//Menu state
game.state.add('mainGame', mainGame);
game.state.add('Menu', Menu);
game.state.start('Menu');
