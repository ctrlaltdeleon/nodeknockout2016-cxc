var Menu = function(game) {};

Menu.prototype = {
	preload : function(){
		game.load.image('menu','assets/menu_splash.png');
		game.load.image('button','assets/start_button_on.png');
	},

	create : function(){
		this.add.sprite(0,0,'menu');
		this.add.button(game.world.centerX-100, game.world.centerY, 'button', this.actionOnClick, this);
	},

	actionOnClick: function(){
		game.state.start('mainGame');
	}

};