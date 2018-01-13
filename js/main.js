
var refreshRequired;
var boardSprite = new Array();
var blockDrop = false;
var currentBlock = new Array();
var blockName;
var currentPos = new Array();
var landedBoard = new(Array);
var start;
var end;
var delta;
var canMove;
var canRotate;
var cursors;
var deltaSpace;

var main = {

	create: function(){
		game.add.image(32,0,'playArea');

		landedBoard = createBoard();

		launchBlock = true;

		deltaSpace = 500;

		//game.input.onDown.add(spawnBrick);

		start = new Date().getTime();
		end = new Date().getTime();

		cursors = game.input.keyboard.createCursorKeys();

		
	},

	update: function(){

		start = new Date().getTime();

		
		//console.log(landedBoard);
		if (!blockDrop){
			//game.input.onDown.addOnce(spawnBrick);
			deltaSpace = 500;
			testForLines();
		}

		if (launchBlock){
			launchBlock = false;
			spawnBrick();	
		}
		
		delta = start - end;
		
		manageInput();
		if (blockDrop){
			
			displayBoard(landedBoard,currentBlock);

			if (delta > deltaSpace){
				dropBrick(currentPos,currentBlock);
				end = new Date().getTime();
			}
			else{
				
			}	
		}
	}
}



function createBoard(){

	var board = new Array();

	for (i=0;i<20;i++){

		var row = new Array();
		var row2 = new Array();

		for (j=0;j<10;j++){
			row.push(0);
			row2.push(0);
			boardSprite.push();
		}

		
		board.push(row);
		currentBlock.push(row2);
	 
	}

	board[13] = [7,7,7,0,7,7,7,7,7,7];
	board[14] = [6,6,6,0,6,6,6,6,6,6];
	board[15] = [5,5,5,0,5,5,5,5,5,5];
	board[16] = [4,4,4,0,4,4,4,4,4,4];
	board[17] = [1,1,1,0,1,1,1,1,1,1];
	board[18] = [2,2,2,0,2,2,2,2,2,2];	
	board[19] = [3,3,3,0,3,3,3,3,3,3];
	return board;
}

function wipeBoard(board){
	for (i=0;i<20;i++){
		for (j=0;j<10;j++){
			index = 10*i+j;
			if(typeof board[index] != 'undefined'){
				board[10*i+j].kill();
			}
		}
	}
}

function displayBoard(board1,board2){

	wipeBoard(boardSprite);



	for (i=0;i<20;i++){
		for (j=0;j<10;j++){

			brickValue = board1[i][j] + board2[i][j];

			switch(brickValue) {
			    case 1:
			        boardSprite[10*i+j] = game.add.sprite(32+j*32,i*32,'O');
			        break;
			    case 2:
			        boardSprite[10*i+j] = game.add.sprite(32+j*32,i*32,'L');
			        break;
			    case 3:
			        boardSprite[10*i+j] = game.add.sprite(32+j*32,i*32,'R');
			        break;
			    case 4:
			        boardSprite[10*i+j] = game.add.sprite(32+j*32,i*32,'T');
			        break;
		        case 5:
			        boardSprite[10*i+j] = game.add.sprite(32+j*32,i*32,'Z');
			        break;
		        case 6:
			        boardSprite[10*i+j] = game.add.sprite(32+j*32,i*32,'S');
			        break;
			     case 7:
			        boardSprite[10*i+j] = game.add.sprite(32+j*32,i*32,'I');
			        break;    
			    default:
			        break
			}
		}
	}
}

function dropBrick(posArray,brickArray){
	
	xPos = posArray[0]
	yPos = posArray[1]
	xNew = xPos;
	yNew = yPos + 1;
	canMove = true;

	// test if the block can move down
	for (i=0;i<19;i++){
	 	for (j=0;j<10;j++){
	 		if(canMove){
	 			if ((brickArray[i][j] > 0 && landedBoard[i+1][j] > 0) || (brickArray[19][j]>0)){
	 				canMove = false;
	 			}
	 		}
	 	}
	}

	// move the block down
	if (canMove){
		for (i=19;i>0;i--){
			for (j=0;j<10;j++){
				if (brickArray[i-1][j] > 0){
					brickArray[i][j] = brickArray[i-1][j];
					brickArray[i-1][j] = 0;  
				}
			}
		}
		currentPos = [xNew,yNew];
	}
	else if (!canMove){
		for (i=0;i<20;i++){
			for (j=0;j<10;j++){
				landedBoard[i][j] = landedBoard[i][j] + brickArray[i][j];
				brickArray[i][j] = 0;
			}
		}
		blockDrop = false;
	}
}


function manageInput(){
	direction = 'none';

	if(cursors.up.downDuration(1)){
		direction = 'up';
		rotateBlock();
	}
	else if (cursors.down.downDuration(1)){
		//dropBrick(currentPos,currentBlock);
		deltaSpace = -100;
	}
	else if (cursors.left.downDuration(1)){
		direction = 'left';

	}
	else if (cursors.right.downDuration(1)){
		direction = 'right';
	}

	//return direction;
	moveLR(currentPos,currentBlock,direction);
}


function moveLR(posArray,brickArray,direction){
	
	switch(direction){
		case 'left':
			xNew = xPos - 1;
			indexMod = -1;
			break;
		case 'right':
			xNew = xPos + 1;
			indexMod = 1;
			break;
		default:
			return;
	    	break;
	}

	xPos = posArray[0]
	yPos = posArray[1]
	yNew = yPos;
	canMove = true;

	// test if the block can move down
	for (i=0;i<19;i++){
	 	for (j=0;j<10;j++){
	 		if(canMove){
	 			if ((brickArray[i][j] > 0 && landedBoard[i][j + indexMod] > 0) || (brickArray[i][j] > 0 && (j+indexMod>9 || j+indexMod<0))){
	 				canMove = false;
	 			}
	 		}
	 	}
	}

	// move the block down
	if (canMove && direction == 'left'){
		for (i=0;i<20;i++){
			for (j=0;j<10;j++){
				if (brickArray[i][j] > 0){
					brickArray[i][j - 1] = brickArray[i][j];
					brickArray[i][j] = 0;  
				}
			}
		}
		currentPos = [xNew,yNew];
	}

	else if (canMove && direction == 'right'){
		for (i=0;i<20;i++){
			for (j=9;j>=0;j--){
				if (brickArray[i][j] > 0){
					brickArray[i][j+1] = brickArray[i][j];
					brickArray[i][j] = 0;  
				}
			}
		}
		currentPos = [xNew,yNew];
	}

	else if (!canMove){
	}
}


function rotateBlock(){
	temp1 = new Array();
	temp2 = new Array();
	temp3 = new Array();
	temp4 = new Array();

	canRotate = true;

	for (i=0;i<4;i++){
		temp1.push(blockName[i][3]); 
		temp2.push(blockName[i][2]);
		temp3.push(blockName[i][1]);
		temp4.push(blockName[i][0]);
	}

	temp = [temp1,temp2,temp3,temp4]

	for (i=0;i<4;i++){
		for (j=0;j<4;j++){
			if ((landedBoard[currentPos[1]+i][currentPos[0]+j] > 0 &&  temp[i][j] >0) || (temp[i][j] > 0 && (currentPos[0]+j<0 || currentPos[0]+j>9))){
				canRotate = false
				break;
			} 
		}
	}


	



	if (canRotate){

		blockName[0] = temp1;
		blockName[1] = temp2;
		blockName[2] = temp3;
		blockName[3] = temp4;

		for (i=0;i<20;i++){
			for (j=0;j<10;j++){
				currentBlock[i][j] = 0;
			}
		}
		for (i=0;i<4;i++){
			for (j=0;j<4;j++){
				currentBlock[currentPos[1]+i][currentPos[0]+j] = blockName[i][j]; 
			}
		}
	}
}


var brickO = [[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]; //
var brickL = [[0,0,2,0],[2,2,2,0],[0,0,0,0],[0,0,0,0]];
var brickR = [[0,3,0,0],[0,3,3,3],[0,0,0,0],[0,0,0,0]]; //
var brickT = [[0,0,4,0],[0,4,4,4],[0,0,0,0],[0,0,0,0]]; //
var brickZ = [[0,5,5,0],[0,0,5,5],[0,0,0,0],[0,0,0,0]]; //
var brickS = [[0,0,6,6],[0,6,6,0],[0,0,0,0],[0,0,0,0]]; //
var brickI = [[0,0,0,0],[7,7,7,7],[0,0,0,0],[0,0,0,0]];
var brickTest = [[7,7,7,7],[7,7,7,7],[7,7,7,7],[7,7,7,7]];

var allBricks = [brickO,brickL,brickR,brickT,brickZ,brickS,brickI];

function spawnBrick(){
	pick = Math.floor(Math.random() * 7);
	thisBrick = allBricks[pick];
	yPos = 0;
	xPos = 3;
	blockDrop = true;

	currentPos = [xPos,yPos];

	for (i=0;i<4;i++){
		for (j=0;j<4;j++){
			if (landedBoard[i+yPos][j+xPos] > 0 && thisBrick[i][j] > 0){
				game.state.start('boot');
			} else{
				currentBlock[i+yPos][j+xPos] = thisBrick[i][j];
			}
			
		}
	}
	blockName = thisBrick;
	start = new Date().getTime();
}


function testForLines(){
	for (i=1;i<20;i++){
		
		sum = 10;
		point = 0;	
		counter = 0
		
		for (j=0;j<10;j++){
			if (landedBoard[i][j] > 0){
				point = 1
			}else{point = 0}

			sum = sum - point;
		}

		if (sum == 0){
			console.log(landedBoard);
			console.log('remove ' + i);
			console.log(landedBoard);
			landedBoard.splice(i,1);
			console.log('splice');
			console.log(landedBoard);
			landedBoard.unshift([0,0,0,0,0,0,0,0,0,0]);
			console.log('addedzeros');
			console.log(landedBoard);
			counter = counter + 1;
			//for (j=0;j<10;j++){
			//	landedBoard[i][j] = 0;
			//}
		}
	}
	launchBlock = true;	
}

function gameOver(){
	game.state.start('boot');
}