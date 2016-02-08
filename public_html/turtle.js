//var temp = [];
var game;
$(document).ready(function(){





});


//jquery get is asynchronous function to stop this when getting file
function getRemote(path) {
    return $.ajax({
        type: "GET",
        url: path,
        async: false
    }).responseText;
}



//method returns txt numbers into array
Game.prototype.loadlevel = function(){

        var fileDom = getRemote("lvl.txt");
        var temp =[];

        var lines = fileDom.split("\n");//split to each line

        for(var i =0; i<lines.length;i++) {
             temp[i] =[];//initialise 2d array
            var lvlArray = lines[i].split(" ");//split to each number
            for(var j = 0; j<lvlArray.length; j++)
            {

                temp[i][j] = lvlArray[j];


            }

        }


    return temp;



};

//atm return array of wall objects, draws each section to the maze passed through parameter
Game.prototype.drawLevel = function(NE,NW,SE,SW){
     var tempwalls = [];

    for( var i = 0 ; i<NE.length; i++)
    {
        //  var length = this.level[i];

        for(var j = 0; j <NE[0].length; j++)
        {
            //check if int is 1 for a wall
            if(NE[i][j]>0) {
                //checks if wall is out of bounds
                if(((j*20)-20)>=0&&((i*20)-20)>=0) {
                    //creates a wall in x y position (-20 to adjust for padding)
                    tempwalls.push(new Wall((j * 20) - 20, (i * 20) - 20));

                    drawElement("wall", tempwalls[tempwalls.length - 1].x, tempwalls[tempwalls.length - 1].y, 0);
                }
            }
        }

    }
    if(NW != undefined) {
        for (var i = 0; i < NW.length; i++) {
            //  var length = this.level[i];

            for (var j = 0; j < NW[0].length; j++) {
                //check if int is 1 for a wall
                if (NW[i][j] > 0) {
                            console.log(NW.length);
                    var xbounds = (((NW.length-1)*20 + (j * 20)) - 20);
                    var ybounds =  (i * 20) - 20;
                    if (xbounds >= 0&&xbounds <this.gameWidth && ybounds >= 0) {
                        //creates a wall in x y position (-20 to adjust for padding)
                        tempwalls.push(new Wall(xbounds, ybounds));

                        drawElement("wall", tempwalls[tempwalls.length - 1].x, tempwalls[tempwalls.length - 1].y, 0);
                    }
                }
            }

        }
    }
    if(SE != undefined) {
        for (var i = 0; i < SE.length; i++) {
            //  var length = this.level[i];

            for (var j = 0; j < SE[0].length; j++) {
                //check if int is 1 for a wall
                if (SE[i][j] > 0) {
                    var xbounds = (((j * 20)) - 20);
                    var ybounds = ((SE[0].length-1)*20 + (i * 20)) - 20;
                    if (xbounds >= 0 && ybounds < this.gameHeight) {
                        //creates a wall in x y position (-20 to adjust for padding)
                        tempwalls.push(new Wall(xbounds, ybounds));

                        drawElement("wall", tempwalls[tempwalls.length - 1].x, tempwalls[tempwalls.length - 1].y, 0);
                    }
                }
            }

        }
    }
    if(SW != undefined) {
        for (var i = 0; i < SW.length; i++) {
            //  var length = this.level[i];

            for (var j = 0; j < SW[0].length; j++) {
                //check if int is 1 for a wall
                if (SW[i][j]> 0) {
                    var xbounds = (((SW.length-1)*20 + (j * 20)) - 20);
                    var ybounds = ((SW[0].length-1)*20  + (i * 20)) - 20;
                    if (xbounds < this.gameWidth && ybounds < this.gameHeight) {

                    //creates a wall in x y position (-20 to adjust for padding)
                    tempwalls.push(new Wall(xbounds, ybounds));

                    drawElement("wall", tempwalls[tempwalls.length - 1].x, tempwalls[tempwalls.length - 1].y, 0);
                }
                }
            }

        }
    }


    return tempwalls;
};

//object that defines a wall
function Wall(xpos,ypos){
    this.x = xpos;
    this.y = ypos;
    this.width = 20;
    this.height = 20;

}
//check if two objects collide
function checkCollision(objectx,objecty, objectHeight,objectWidth, object2x,object2y,object2Height,object2Width){
    if (objectx < object2x + object2Width &&
        objectx + objectWidth > object2x &&
        objecty < object2y + object2Height &&
        objectHeight + objecty > object2y) {
        // collision detected!
        this.turtle.stop();
        return true;
    }
    return false;


}


//fuction that draws a given css class name to screen
function drawElement(classname, xpos, ypos, angle) {
    var $element = $('<div/>').addClass(classname);

    $element.css('top', ypos + 'px').css('left', xpos + 'px').css('transform', 'rotate(' + angle + 'deg)');
    $('#gamearea').append($element);
};



//functions that creates a player which setup its starting position
function Player(walls,height,width) {

        //height and length of the area
        this.max_x = height;
        this.max_y = width;
        //center of canvas
        this.x = this.max_x / 2;
        this.y = this.max_y / 2;
        this.width = 19;
        this.height = 19;
        //players previous position 
        this.previousPosition =[this.x,this.y,this.angle];
        this.walled = walls;
        console.log(this.walled[0]);

        this.setup();
    
}

//returns the players previous position
Player.prototype.saveState = function(x, y,angle){
    this.previousPosition[0] =x;
    this.previousPosition[1]=y;
    this.previousPosition[2]=angle;
    
};
Player.prototype.getState = function(){
    
    return  this.previousPosition;
};



//removes previously drawn object and draws the new player position
Player.prototype.update = function () {

        $("div.player").remove();
   for(var i =0; i< this.walled.length; i++) {
    //    for (var j = 0; j < this.walled[i].length; j++) {


            if (!checkCollision(this.x, this.y, this.height, this.width, this.walled[i].x, this.walled[i].y, this.walled[i].height,this.walled[i].width)
                ) {
                drawElement("player", this.x, this.y, this.angle);

            } else {
                //there was a collision reset player to previous position
                $("div.player").remove();
                drawElement("player", this.previousPosition[0], this.previousPosition[1], this.previousPosition[2]);
                this.x = this.previousPosition[0];
                this.y = this.previousPosition[1];
                this.angle = this.previousPosition[2];
                console.log(this.x + "  " + this.y + "   " + this.angle)
                console.log(this.walled[i].x+"  "+this.walled[i].y);

            }
     //   }
    }




       // this.sprite.setAttribute('transform', 'rotate(' + (this.angle) + ' 10 10)');
  
};


//set the players x and y position
Player.prototype.setxy = function (x, y) {
   
    this.x = x;
    this.y = y;
    this.update();
};
//set the players x position
Player.prototype.setx = function (x) {

    this.x = x;
    this.update();
};
//set the player y position
Player.prototype.sety = function (x, y) {

    this.x = x;
    this.update();
};



//method for moving the player foward
Player.prototype.forward = function (d) {
    
    this.saveState(this.x,this.y,this.angle);
    
    this.crawl(d);
};

//method moves a player foward accounting for angle its facing
Player.prototype.crawl = function (d) {
    //move at 10 pixels at a time
    d = d*20;

    var newx = this.x + d * Math.cos(this.radians());
    var newy = this.y + d * Math.sin(this.radians());

 


    this.x = newx;
    this.y = newy;
    this.update();
};
//method to move player backwards
Player.prototype.backward = function (d) {
    this.saveState(this.x,this.y, this.angle);
    this.forward(-d);
};

//method for rotating the player clockwise by a given angle
Player.prototype.right = function (angle) {
    this.saveState(this.x,this.y,this.angle);
    this.angle = (this.angle + angle) % 360;
    this.update();
};

//method for rotating the player anti-clockwise by a given angle
Player.prototype.left = function (angle) {
    this.saveState(this.x,this.y,this.angle);
    this.right(-angle);
};





//converts angle into radians
Player.prototype.radians = function () {
    return this.angle / 180 * Math.PI;
}

//reset the player to starting position
Player.prototype.reset = function () {

    this.setup();

}

//players starting position
Player.prototype.setup = function () {
   
    this.x = 0;
    this.y = 0;
    this.angle = 270;
    this.update();

};

//function that makes up a Command for the player
function DelayCommand(that, fun, args) {
    this.that = that;
    this.fun = fun;
    this.args = args;
}

//
DelayCommand.prototype.call = function (that) {

    return this.fun.apply(this.that, this.args);
};

//This method creates the player and uses pipeline which contains all the player movement commands
function Game() {
     var gasd = new GenerateMaze(13,13);
    this.gameHeight = 460;
    this.gameWidth= 460;
    //reads in the data for level from file
    this.level =  gasd.data;
    //each maze section
    this.NEmaze = gasd.data;
    this.NWmaze = this.loadlevel();
    this.SWmaze = gasd.data3;
    this.SEmaze = gasd.data4;
 //   this.level = this.loadlevel();
  //  this.level = Generate(10,10);
    //array of all the maze walls
    this.walls = this.drawLevel(this.NEmaze,this.NWmaze,this.SEmaze,this.SWmaze);

    this.turtle = new Player(this.walls,this.gameHeight,this.gameWidth);
    //array for adding the commands giving to it by logo
    this.pipeline = null;
    this.active = false;
    this.halt = false;
    this.speed = 250;

    //setups the game, draws the level and player, board size.


}
//starts the player when a logo command is send to logo
Game.prototype.start = function () {
    this.active = true;
    this.halt = false;
    this.pipeline = new Array();

    this.paint();
};
//once has added command logo calls finish.
Game.prototype.finish = function () {
    this.active = false;
};
//stop
Game.prototype.stop = function () {
    this.halt = true;
};
//method get the command from the pipeline and calls the method
Game.prototype.paint = function () {

    if (!this.halt) {
        var redraw = this.active;

        if (this.pipeline.length > 0) {

            do {
                var fun = this.pipeline.shift();


                //call the method
                fun.call();

                redraw = true;

            } while (this.speed <= 1 && this.pipeline.length > 0)
        }
        if (redraw) {
            var that = this;

            //animation
            setTimeout(function () {

                that.paint.call(that);
            }, this.speed);
        }
    }
};


/*=========================================================
        All the methods that can be added to the pipeline
=============================================================
 */


Game.prototype.addCommand = function (fun, args) {
    
    this.pipeline.push(new DelayCommand(this.turtle, fun, args));
};



Game.prototype.forward = function (d) {
        this.turtle.saveState(this.turtle.x,this.turtle.y,this.turtle.angle);
        var l = Math.abs(d);
        
        var s = l / d;
      
        //moves the player foward 1 bit at a time
        for (var i = 0; i < l; i++) {
            this.addCommand(this.turtle.crawl, [s]);
        }
       // this.addCommand(this.turtle.forward,arguments);
     
};
Game.prototype.backward = function (d) {
    this.forward(-d);
};

Game.prototype.right = function () {
    this.addCommand(this.turtle.right, arguments);
};
Game.prototype.left = function () {
    this.addCommand(this.turtle.left, arguments);
};
Game.prototype.reset = function () {
    this.addCommand(this.turtle.reset, arguments);
};

Game.prototype.setxy = function () {
    this.addCommand(this.turtle.setxy, arguments);
};
Game.prototype.setx = function () {
    this.addCommand(this.turtle.setx, arguments);
};
Game.prototype.sety = function () {
    this.addCommand(this.turtle.sety, arguments);
};


Game.prototype.home = function () {
    this.addCommand(this.turtle.home, arguments);
};