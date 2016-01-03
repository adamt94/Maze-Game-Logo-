/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//game keys
var ESC = 27;
var SPACE = 32;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;

var gamewidth = 500;
var gameheight = 500;


$(document).ready(function() {
    $('body').keydown(keyPressedHandler);
});

function keyPressedHandler(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	
	switch(code) {
		case LEFT_ARROW:
			moveDirection = 'left';
			break;
		case UP_ARROW:
			moveDirection = 'up';
			break;
		case RIGHT_ARROW:
			moveDirection = 'right';
			break;
		case DOWN_ARROW:
			moveDirection = 'down';
			break;
		case SPACE:
			startGame();
			break;
		case ESC:
			endGame();
			break;
	}
 }


function startGame(){
    
};
function player(xpos,ypos){
    this.xpos = xpos;
    this.ypos = ypos;
};
