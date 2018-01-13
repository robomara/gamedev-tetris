function deleteBoard(){
	for (i=19;i>18;i--){
		for (j=0;j<10;j++){
			index = 10*i+j;
			if(typeof boardSprite[index] != 'undefined'){
				landedBoard[i][j] = 0;
			}
		}
	}
}



