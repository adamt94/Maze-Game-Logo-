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
var player;
var x;
var walls = new wall(80, 80);


$(document).ready(function() {
    $('body').keydown(keyPressedHandler);
    console.log("banter");
});

function keyPressedHandler(e) {
    var code = (e.keyCode ? e.keyCode : e.which);

    switch (code) {
        case LEFT_ARROW:
            removeElement();// delete last move
            player.move("left");//move player in direction
       //     x = walls.collisionDetection(player.xpos, player.ypos);//check if theres a colision
     
            drawElement("player", player.xpos, player.ypos, player.angle); // draw the players new position
            break;
        case UP_ARROW:
            removeElement();
            player.move("up");
         //   x = walls.collisionDetection(player.xpos, player.ypos);
       
            drawElement("player", player.xpos, player.ypos, player.angle);
            break;
        case RIGHT_ARROW:
            removeElement();
            player.move("right");
        //    x = walls.collisionDetection(player.xpos, player.ypos);
            console.log(x);
          
            drawElement("player", player.xpos, player.ypos, player.angle);
            break;
        case DOWN_ARROW:
            removeElement();
            player.move("down");
        //    x = walls.collisionDetection(player.xpos, player.ypos);
          
            drawElement("player", player.xpos, player.ypos, player.angle);
            break;
        case SPACE:
            startGame();
            break;
        case ESC:
            endGame();
            break;
    }
}


function startGame() {
    player = new Player(8, 8);
    drawElement("player", player.xpos, player.ypos);

    drawElement("wall", walls.xpos, walls.ypos);



}
;
function Player(xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.angle = 0;

    this.move = function(direction) {
        switch (direction) {
            case 'right':
                this.xpos = this.xpos + 8;
                break;

            case 'left':
               //   var newx = this.xpos + 1 * Math.cos(this.radians());//calculates angle to move at
             //   var newy = this.ypos + 1 * Math.sin(this.radians());
                this.xpos = this.xpos - 8;
                break;
            case 'up':
                  //calculates angle to move at
           
                this.ypos =   (this.ypos /*+ 1 * Math.sin(this.radians())*/)-8;
                break;
            case 'down':
               //   var newx = this.xpos + 1 * Math.cos(this.radians());//calculates angle to move at
                this.angle = this.angle + 10;
                this.ypos = this.ypos + 8;

                break;

        }

    };
    this.radians = function () { //calculates angle to move at
    return this.angle / 180 * Math.PI;
}
}
;


function wall(xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;

    this.collisionDetection = function(Xpos, Ypos) {

        return (this.xpos <= Xpos + 0 &&
                Xpos <= this.xpos + 0 &&
                this.ypos <= Ypos + 0 &&
                Ypos <= this.ypos + 0);
    };

}

function drawElement(classname, xpos, ypos, angle) {
    var $element = $('<div/>').addClass(classname);
    $element.css('top', ypos + 'px').css('left', xpos + 'px').css('transform', 'rotate(' + angle + 'deg)');


    $('#game').append($element);

}
;
function removeElement() {
    $("div.player").remove();
}
;
