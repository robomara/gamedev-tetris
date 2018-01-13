
var boot = {
	preload: function(){

		game.load.image('playArea','assets/playArea.png');
		game.load.image('I','assets/I.png');
		game.load.image('O','assets/O.png');
		game.load.image('L','assets/L.png');
		game.load.image('R','assets/R.png');
		game.load.image('S','assets/S.png');
		game.load.image('Z','assets/Z.png');
		game.load.image('T','assets/T.png');

		
	},

	create: function(){
		game.input.onDown.add(startGame);
	}
}

function startGame(){
	game.state.start('main');
}