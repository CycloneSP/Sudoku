

		var canvas = document.getElementById("myCanvas");		
		var ctx = canvas.getContext("2d");				

		//key codes for 1-9 are 49-57 and for numpad 97-105
		
		document.addEventListener("keypress", keyPressHandler, false);
		document.addEventListener("click", clickHandler, false);

		var canvasWidth = canvas.width;					
		var canvasHeight = canvas.height;

		var rowNum = 9;
		
		var puzGenSuccess;

		var matrix = [];
		var hideNum = [];
		var playerInput = [];
		var noteArray = [];
		
		var boxAlpha = .3;
		
		var posx = 0;
		var posy = 0;
		
		var coordX;
		var coordY;
		
		var notesON = false;
		
		var barNum = 10;
		var barOffset = 60;
		var bigBarWidth = 8;
		var barWidth = (bigBarWidth/2)+((bigBarWidth/2)%2);
		var widthOffset = 1;
		var barLength = (barOffset*rowNum)+barWidth;
		var gridVOffset = (canvasHeight/2)-(barLength/2);
		var gridHOffset = (canvasWidth/2)-(barLength/2);
		
		var global_Red = 0;
		var global_Green = 0;
		var global_Blue = 0;


		var countSecA = 0;
		var countSecB = 0;
		var countMinA = 0;
		var countMinB = 0;
		var countHour = 0;
		var tempHourA = 0;
		var tempHourB = 0;

		var penalty = 30;
		
//*****************************************************************

		function getMousePos(canvas, evt) {
			var rect = canvas.getBoundingClientRect();
			return {
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
			};
		}

//*****************************************************************

		function clickHandler(e) {
		
			var pos = getMousePos(canvas, e);
			posx = pos.x;
			posy = pos.y;
			
			detectNotesButton();
		
		}


//*****************************************************************

		function keyPressHandler(e) {
		
			for(keyNum=0; keyNum<10; keyNum++){
		//		if(e.keyCode != 48 && e.keyCode == (48+keyNum)) {
		//			storeInput(keyNum);
		//		}
				if(e.keyCode == (48+keyNum)) {
					storeInput(keyNum);
				}
			}
		
		}


//*****************************************************************

		function storeInput(number) {
		
			if(coordX < 10 && coordY < 10){
				if(notesON == false){
					playerInput[coordY][coordX] = number;
					if(playerInput[coordY][coordX] != matrix[coordY][coordX] && playerInput[coordY][coordX] != 0 && hideNum[coordY][coordX] != 0) {
						for(numI=0; numI<penalty; numI++){
							countClock();
						}
					}
				}
				else {
					if(number == 0){
						clearNotes(coordY, coordX);
					}
					else {
						var testX = findBox(number-1)*(1/3);
						var testY = number-findBox(number-1)-1;

						if(noteArray[coordY][coordX][testX][testY] == 0){
							noteArray[coordY][coordX][testX][testY] = 1;
						}
						else {
							noteArray[coordY][coordX][testX][testY] = 0;
						}
					}
				}
			}
			
		}


//*****************************************************************

		function getCoordX() {
		
			for(iii=0; iii<rowNum; iii++){
				if(posx > gridHOffset+(barOffset*iii) && posx < gridHOffset+(barOffset*(iii+1))){
					coordX = iii;
					return iii;
				}
			}
				return 2000;
		}


//*****************************************************************

		function getCoordY() {
		
			for(jjj=0; jjj<rowNum; jjj++){
				if(posy > gridVOffset+(barOffset*jjj) && posy < gridVOffset+(barOffset*(jjj+1))){
					coordY = jjj;
					return jjj;
				}
			}
				return 2000;
		}


//*****************************************************************

		function drawRect(axisX, axisY, sizeX, sizeY, r, g, b, a) {

			ctx.beginPath();
			ctx.rect(axisX, axisY, sizeX, sizeY);
			ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
			ctx.fill();
			ctx.closePath;

		}


//*****************************************************************

		function drawCircle(numX, numY, width, startArc, endArc, r, g, b, a) {
		
		ctx.beginPath();
			ctx.arc(numX, numY, width, startArc*Math.PI, endArc*Math.PI);
			ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
			ctx.fill();
			ctx.closePath();
		
		}


//*****************************************************************

		function setAlpha(numX, numY) {
		
			if(numX == getCoordX() && numY == getCoordY()){
				boxAlpha = .4;
			}
			else {
				boxAlpha = .07;
			}
		
		}


//*****************************************************************

		function countClock() {

			countSecB++;
			if(countSecB > 9){
				countSecB = 0;
				countSecA++;
			}
			if(countSecA > 5){
				countSecA = 0;
				countMinB++;
			}
			if(countMinB > 9){
				countMinB = 0;
				countMinA++;
			}
			if(countMinA > 5){
				countMinA = 0;
				countHour++;
				tempHourB++;
			}
			if(tempHourB > 9){
				tempHourB = 0;
				tempHourA++;
			}
			if(countHour > 11){
				tempHourB = 0;
				tempHourA = 0;
				countHour = 0;
			}

		}


//*****************************************************************

		function initializeClock() {

			countSecA = 0;
			countSecB = 0;
			countMinA = 0;
			countMinB = 0;
			countHour = 0;
			tempHourA = 0;
			tempHourB = 0;

		}

//*****************************************************************

		function initializePlayerInput() {
		
			for(iRow=0; iRow<rowNum; iRow++){
				playerInput[iRow] = [];
				for(jCol=0; jCol<rowNum; jCol++){
					playerInput[iRow][jCol] = -1;
				}
			}
		
		}


//*****************************************************************

		function initializeNotes() {
		
			for(iRow=0; iRow<rowNum; iRow++){
				noteArray[iRow] = [];
				for(jCol=0; jCol<rowNum; jCol++){
					noteArray[iRow][jCol] = [];
					for(iiRow=0; iiRow<3; iiRow++){
						noteArray[iRow][jCol][iiRow] = [];
						for(jjCol=0; jjCol<3; jjCol++){
							noteArray[iRow][jCol][iiRow][jjCol] = 0;
						}
					}
				}
			}
		
		}


//*****************************************************************

		function initializeHiddenNumbers() {
		
			var easy = 35;
			var medium = 45;
			var hard = 55;
			
			var xx = 0;
			var yy = 0;
		
			for(i=0; i<rowNum; i++){
				hideNum[i] = [];
				for(j=0; j<rowNum; j++){
					hideNum[i][j] = 0;
				}
			}
			
			for(z=0; z<medium; z++){
				xx = generateNumber()-1;
				yy = generateNumber()-1;
				
				if(hideNum[xx][yy] == 1){
					z--;
				}
				
				hideNum[xx][yy] = 1;
			}

		}
		
//*****************************************************************

		function initializeMatrix(){

			for(i=0; i<rowNum; i++){
				matrix[i] = [];
				for(j=0; j<rowNum; j++){
					matrix[i][j] = 0;
				}
			}
			
		}


//*****************************************************************

		function rowCheck(num, indexA) {
		
			for(c=0; c<rowNum; c++){
				if(matrix[indexA][c] == num){
					return false;
				}
			}
			return true;
		}


//*****************************************************************

		function columnCheck(num, indexB) {
		
			for(r=0; r<rowNum; r++){
				if(matrix[r][indexB] == num){
					return false;
				}
			}
			return true;
		}


//*****************************************************************

		function boxCheck(num, indexA, indexB) {
		
			var a = findBox(indexA);
			var b = findBox(indexB);
		
			for(r=a; r<a+3; r++) {
				for(c=b; c<b+3; c++) {
					if(matrix[r][c] == num){
						return false;
					}
				}
			}
			
			return true;
		
		}


//*****************************************************************

		function findBox(num) {
		
			if(num >= 0 && num <= 2){
				return 0;
			}
			else if(num >= 3 && num <= 5){
				return 3;
			}
			else if(num >= 6 && num <= 8){
				return 6;
			}
		
		}


//*****************************************************************

		function generateNumber() {
		
			var x = Math.floor((Math.random() * 100) + 1);
			x = (x%9)+1;
			
			return x;
		
		}


//*****************************************************************

		function generatePuzzle() {
		
			var aa = true;
			var bb = true;
			var cc = true;
			
			var escapeNum;
			var escapeLimit = 10000;
			
			var num = 0;
		
			for(i=0; i<rowNum; i++){
				for(j=0; j<rowNum; j++){
				
					escapeNum = 0;
					
					do {
			
						num = generateNumber();
						
						aa = rowCheck(num, i);
						bb = columnCheck(num, j);
						cc = boxCheck(num, i, j);
					
						
						escapeNum++;
						if(escapeNum > escapeLimit){ break;}
			
					}
					while(aa == false || bb == false || cc == false);
					
					if(escapeNum > escapeLimit){ break; }
					
					matrix[i][j] = num;
				
				}
				if(escapeNum > escapeLimit){ break; }
			}
			
			if(escapeNum > escapeLimit) {
				puzGenSuccess = false;
			}
			else{
				puzGenSuccess = true;
			}
		
		}


//*****************************************************************

		function drawGrid() {

			for(i=0; i<barNum; i++){

				if(i == 3 || i == 6){

					drawRect((gridHOffset+(barOffset*i)-widthOffset), gridVOffset, bigBarWidth, barLength, 0,0, 0, 1);
					drawRect(gridHOffset, (gridVOffset+(barOffset*i)-widthOffset), barLength, bigBarWidth, 0,0, 0, 1);

				}
				else{
					drawRect((gridHOffset+(barOffset*i)), gridVOffset, barWidth, barLength, 0, 0, 0, 1);
					drawRect(gridHOffset, (gridVOffset+(barOffset*i)), barLength, barWidth, 0, 0, 0, 1);
				}

			}
			
		}

//*****************************************************************

		function drawPuzzle() {
			
			var red = 250;
			var green = 250;
			var blue = 0;
		
			for(i=0; i<rowNum; i++){
				for(j=0; j<rowNum; j++){
					if(hideNum[i][j] == 0){
						drawRect(gridHOffset+(barOffset*j), gridVOffset+(barOffset*i), barOffset, barOffset, 235, 235, 255, .4);
						drawNumber(matrix[i][j], gridHOffset+20+(barOffset*j), gridVOffset+13+(barOffset*i), global_Red, global_Green, global_Blue);
					}
					else {
						setAlpha(j, i);
						drawRect(gridHOffset+(barOffset*j), gridVOffset+(barOffset*i), barOffset, barOffset, red, green, blue, boxAlpha);
					}
				}
			}
		
		}


//*****************************************************************

		function drawInput() {
		
			var Red = 0;
		
			for(i=0; i<rowNum; i++){
				for(j=0; j<rowNum; j++){
					if(hideNum[i][j] != 0){
						if(playerInput[i][j] > 0){
							if(playerInput[i][j] != matrix[i][j]) {
								Red = 250;
							}
							else {
								Red = 0;
							}
						
							clearNotes(i, j);
							drawNumber(playerInput[i][j], gridHOffset+20+(barOffset*j), gridVOffset+13+(barOffset*i), Red, global_Green, global_Blue);
						}
						else if(playerInput[i][j] == 0){
							clearNotes(i, j);
							hideNum[i][j] = 1;
							playerInput[i][j] = -1;
						}
					}
				}
			}
		
		}


//*****************************************************************

		function drawNotes() {
		
			var Blue = 250;
			var Red = 80;
			var Green = 80;
			
			for(i=0; i<rowNum; i++){
				for(j=0; j<rowNum; j++){
					for(k=0; k<3; k++){
						for(l=0; l<3; l++){
							if (noteArray[i][j][k][l] == 1 && hideNum[i][j] != 0){
								drawCircle(gridHOffset+(barOffset*j)+((barOffset/3)*(l+1))-7, gridVOffset+(barOffset*i)+((barOffset/3)*(k+1))-7, barOffset/10, 0, 2, Red, Green, Blue, 1)
							}
						}
					}
				}
			}
		
		}


//*****************************************************************

		function drawClock() {

			 var slightOffset = 8;

			drawNumber(":", gridHOffset+(barOffset*10.35), (canvasHeight/2)-(barOffset/2)+slightOffset, global_Red, global_Green, global_Blue, 1);

			drawNumber(countSecA, gridHOffset+(barOffset*10.7), (canvasHeight/2)-(barOffset/2)+slightOffset, global_Red, global_Green, global_Blue, 1);
			drawNumber(countSecB, gridHOffset+(barOffset*11.2), (canvasHeight/2)-(barOffset/2)+slightOffset, global_Red, global_Green, global_Blue, 1);

			drawNumber(countMinA, gridHOffset+(barOffset*9.5), (canvasHeight/2)-(barOffset/2)+slightOffset, global_Red, global_Green, global_Blue, 1);
			drawNumber(countMinB, gridHOffset+(barOffset*10), (canvasHeight/2)-(barOffset/2)+slightOffset, global_Red, global_Green, global_Blue, 1);

		}


//*****************************************************************

		function drawButton() {
		
			var Red = global_Red;
			var Green = global_Green;
			var Blue = global_Blue
			
			if(notesON == true) {
				Green = 100;
				Red = 100;
				Blue = 250;
			}
			else {
				Red = 250;
				Green = 150;
				Blue = 100;
			}
			
			drawRect( gridHOffset-(barOffset*2.5)-5, (canvasHeight/2)-(barOffset/2)-5, (barOffset*2)+10, barOffset+10, global_Red, global_Green, global_Blue, 1);
			drawRect( gridHOffset-(barOffset*2.5), (canvasHeight/2)-(barOffset/2), (barOffset*2), barOffset, Red, Green, Blue, 1);

		}


//*****************************************************************

		function detectNotesButton() {
		
			for(i=gridHOffset-(barOffset*2.5); i<(gridHOffset-(barOffset*2.5)+(barOffset*2)); i++){
				for(j=(canvasHeight/2)-(barOffset/2); j<((canvasHeight/2)-(barOffset/2)+barOffset); j++){
					if(Math.floor(posx) == i && Math.floor(posy) == j){
						if(notesON == true){
							notesON = false;
						}
						else {
							notesON = true;
						}
					}
				}
			}
		
		}


//*****************************************************************

		function drawNumber(num, numX, numY, red, green, blue) {

			var size = 5;
			var width = 25;
			var height = 40;
			var vOffset = height-size;
			var hOffset = width-size;

			var r = red;
			var g = green;
			var b = blue;
			var a = 1;

			if(num == 0){
				drawRect(numX, numY, size, height, r, g, b, a);
				drawRect(numX, numY, width, size, r, g, b, a);
				drawRect(numX+hOffset, numY, size, height, r, g, b, a);
				drawRect(numX, numY+vOffset, width, size, r, g, b, a);
			}
			else if(num == 1){
				drawRect(numX+(hOffset/2), numY, size, height, r, g, b, a);
				drawRect(numX+(hOffset/4), numY+(hOffset/4), height/4, size, r, g, b, a);
				drawRect(numX, numY+vOffset, width, size, r, g, b, a);
			}
			else if(num == 2){
				drawRect(numX+hOffset, numY, size, height/2, r, g, b, a);
				drawRect(numX, numY+hOffset, size, height/2, r, g, b, a);
				drawRect(numX, numY, width, size, r, g, b, a);
				drawRect(numX, numY+(vOffset/2), width, size, r, g, b, a);
				drawRect(numX, numY+vOffset, width, size, r, g, b, a);
			}
			else if(num == 3){
				drawRect(numX, numY, width, size, r, g, b, a);
				drawRect(numX+(hOffset/4), numY+(vOffset/2), height/2, size, r, g, b, a);
				drawRect(numX, numY+vOffset, width, size, r, g, b, a);
				drawRect(numX+hOffset, numY, size, height, r, g, b, a);
			}
			else if(num == 4){
				drawRect(numX, numY, size, height/2, r, g, b, a);
				drawRect(numX, numY+(vOffset/2), width, size, r, g, b, a);
				drawRect(numX+hOffset, numY, size, height, r, g, b, a);
			}
			else if(num == 5){
				drawRect(numX, numY, size, height/2, r, g, b, a);
				drawRect(numX+hOffset, numY+hOffset, size, height/2, r, g, b, a);
				drawRect(numX, numY, width, size, r, g, b, a);
				drawRect(numX, numY+(vOffset/2), width, size, r, g, b, a);
				drawRect(numX, numY+vOffset, width, size, r, g, b, a);
			}
			else if(num == 6){
				drawRect(numX, numY, size, height, r, g, b, a);
				drawRect(numX+hOffset, numY+hOffset, size, height/2, r, g, b, a);
				drawRect(numX, numY, width, size, r, g, b, a);
				drawRect(numX, numY+(vOffset/2), width, size, r, g, b, a);
				drawRect(numX, numY+vOffset, width, size, r, g, b, a);
			}
			else if(num == 7){
				drawRect(numX, numY, width, size, r, g, b, a);
				drawRect(numX+hOffset, numY, size, height, r, g, b, a);
			}
			else if(num == 8){
				drawRect(numX, numY, width, size, r, g, b, a);
				drawRect(numX+(hOffset/4), numY+(vOffset/2), height/2, size, r, g, b, a);
				drawRect(numX, numY+vOffset, width, size, r, g, b, a);
				drawRect(numX, numY, size, height, r, g, b, a);
				drawRect(numX+hOffset, numY, size, height, r, g, b, a);
			}
			else if(num == 9){
				drawRect(numX, numY, size, height/2, r, g, b, a);
				drawRect(numX, numY, width, size, r, g, b, a);
				drawRect(numX, numY+(vOffset/2), width, size, r, g, b, a);
				drawRect(numX+hOffset, numY, size, height, r, g, b, a);
			}
			else if(num == ":"){
				drawRect(numX+(hOffset/2), numY+(vOffset/4), size, size, r, g, b, a);
				drawRect(numX+(hOffset/2), numY+(vOffset*3/4), size, size, r, g, b, a);
			}

		}

//*****************************************************************

		function clearScreen() {

			ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		}
		
		
//*****************************************************************
		
		function clearNotes(iRow, jCol) {
		
			for(iiRow=0; iiRow<3; iiRow++){
				for(jjCol=0; jjCol<3; jjCol++){
					noteArray[iRow][jCol][iiRow][jjCol] = 0;
				}
			}
		
		}

//*****************************************************************

		function draw() {
		
			clearScreen();
			drawPuzzle();
			drawInput();
			drawNotes();
			drawButton();
			drawClock();
			drawGrid();
		
		}


//*****************************************************************

	initializeHiddenNumbers();
	initializePlayerInput();
	initializeNotes();
	initializeClock();
	do {
		initializeMatrix();
		generatePuzzle();
	}
	while(puzGenSuccess == false);
	
	setInterval(function(){draw()}, 10);
	setInterval(function(){countClock()}, 1000);
	
