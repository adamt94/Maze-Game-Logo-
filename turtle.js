//var temp = [];
var game;
var rand;
var multplayercheck = false;
$(document).ready(function(){

    //check the page is multiplayer to activate mazeclient
    var href = document.location.href;
    var lastPathSegment = href.substr(href.lastIndexOf('/') + 1);
    if(lastPathSegment == "tournemant.html#playGame"){
        multplayercheck = true;
    }


    //check if its the right answer when they submit
    $("#answer").click(function(){
        //check if ticker radio is right answer
        var radioValue = $('input:radio:checked').next('label:first').html()
        if(radioValue==myArray[rand].rAnswer){
            $('#questionWindow').modal('hide');
            
        }else{
            //display a different question
            var a = Math.seededRandom(2,0);
            rand = Math.round(a);
            $("#questiontitle").html(myArray[rand].Question);
            $('label[for=test1]').html(myArray[rand].fAnswer);
            $('label[for=test2]').html(myArray[rand].rAnswer);

        }

     });
    //$("#answer").click(function(){
    //    $('#questionWindow').modal('hide');
    //});


});
//opens a Question
function openQuestion(){
    var a =  Math.seededRandom(2,0);
    rand = Math.round(a);
    $("#questiontitle").html(myArray[rand].Question);
    $('label[for=test1]').html(myArray[rand].fAnswer);
    $('label[for=test2]').html(myArray[rand].rAnswer);
    //stops window being dismissed
    $('#questionWindow').modal({
        keyboard: false,
        backdrop: false,
    })

}




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
        var a =  Math.seededRandom(4,1);
        a = Math.round(a);
        var fileDom = getRemote("maze_levels//lvl"+a+".txt");
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

/*
*@param each section of the maze
* draws each wall to the canvas
*returns an array of all the walls
*
* */
Game.prototype.drawLevel = function(NE,NW,SE,SW){
     var tempwalls = [];

    for( var i = 0 ; i<NW.length; i++)
    {
        //  var length = this.level[i];

        for(var j = 0; j <NW[0].length; j++)
        {
            //check if int is 1 for a wall
            if(NW[i][j]>0) {
                //checks if wall is out of bounds
                if(((j*20)-20)>=0&&((i*20)-20)>=0) {
                    //creates a wall in x y position (-20 to adjust for padding)
                    tempwalls.push(new Wall((j * 20) - 20, (i * 20) - 20));

                    drawElement("wall", tempwalls[tempwalls.length - 1].x, tempwalls[tempwalls.length - 1].y, 0);
                }
            }
        }

    }
    if(NE != undefined) {
        for (var i = 0; i < NE.length; i++) {
            //  var length = this.level[i];

            for (var j = 0; j < NE[0].length; j++) {
                //check if int is 1 for a wall
                if (NE[i][j] == 1) {
                    //  console.log(NE.length);
                    var xbounds = (((NE.length - 1) * 20 + (j * 20)));
                    var ybounds = (i * 20) - 20;
                    if (xbounds >= 0 && xbounds < this.gameWidth && ybounds >= 0) {
                        //creates a wall in x y position (-20 to adjust for padding)
                        tempwalls.push(new Wall(xbounds, ybounds));

                        drawElement("wall", tempwalls[tempwalls.length - 1].x, tempwalls[tempwalls.length - 1].y, 0);
                    }
                }
                    else if(NE[i][j]==3){
                    var xbounds2 = (((NE.length - 1) * 20 + (j * 20)));
                    var ybounds2 = (i * 20) - 20;
                        this.endPoints.push(new Finish(xbounds2, ybounds2));
                        drawElement("finish",xbounds2,ybounds2,0);
                    }

            }

        }
    }
    if(SW != undefined) {
        for (var i = 0; i < SW.length; i++) {
            //  var length = this.level[i];

            for (var j = 0; j < SW[0].length; j++) {
                //check if int is 1 for a wall
                if (SW[i][j] == 1) {
                    var xbounds = (((j * 20)));
                    var ybounds = ((SW[0].length-1)*20 + (i * 20)) ;
                    if (xbounds >= 0 && ybounds < this.gameHeight) {
                        //creates a wall in x y position (-20 to adjust for padding)
                        tempwalls.push(new Wall(xbounds, ybounds));

                        drawElement("wall", tempwalls[tempwalls.length - 1].x, tempwalls[tempwalls.length - 1].y, 0);
                    }
                }
                else if(SW[i][j]==3){
                    var xbounds2 = (((j * 20)));
                    var ybounds2 = ((SW[0].length-1)*20 + (i * 20)) ;
                    this.endPoints.push(new Finish(xbounds2, ybounds2));
                    drawElement("finish",xbounds2,ybounds2,0);
                }
                }
            }

        }

    if(SE != undefined) {
        for (var i = 0; i < SE.length; i++) {
            //  var length = this.level[i];

            for (var j = 0; j < SE[0].length; j++) {
                //check if int is 1 for a wall
                if (SE[i][j]== 1) {
                    var xbounds = (((SE.length-1)*20 + (j * 20)) - 20);
                    var ybounds = ((SE[0].length-1)*20  + (i * 20)) - 20;
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

function Question(xpos,ypos){
    this.x = xpos;
    this.y = ypos;
    this.width = 20;
    this.height = 20;


}

function getQuestions(){
    var question= [];
    for(var i =0; i<6; i++) {
        var x,y;
        //only adds questions in random sections
        if(i%2==0) {
             x = Math.seededRandom(10, 0);
             y = Math.seededRandom(10, 0);
        }else{
            x = Math.seededRandom(20, 10);
            y = Math.seededRandom(20, 10);
        }
        x = Math.round(x);
        y =Math.round(y);

        question[i] = new Question(x*20,y*20);
        drawElement("Question",x*20,y*20,0);
    }
    return question;
}

//object that defines a finish line
function Finish(xpos, ypos, last){
    this.x = xpos;
    this.y = ypos;
    this.width = 20;
    this.height = 20;
    this.finalpoint = last;//is it the last finish point ie now sections left
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
function Player(height,width) {

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

    //    console.log(this.walled[0]);

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
Player.prototype.update = function (isopponent) {
 
  
    //check is its pratice mode as no walls (needs to be changed moving collision detection to game function soon)
	if(isopponent){
	  $("div.oponnent").remove();
		drawElement("oponnent",this.x,this.y,this.angle);
	
	}else{
	 $("div.player").remove();
       drawElement("player", this.x, this.y, this.angle);
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
    //move at 20 pixels at a time
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

};
Player.prototype.home = function(){
    this.setup();
};

//players starting position
Player.prototype.setup = function () {

    this.x = 0;
    this.y = 0;
    this.angle = 270;
	this.saveState(this.x,this.y,this.angle);
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



//This function contains all objects needed for the game
function Game(ispractice) {
     this.seed = 1;
    //boolean check for game has started for multiplayer
     this.gameOn = false;
    //check multiplayer
    if(multplayercheck == true) {
        MazeClient.newSession("multi", "test", this.seed, function (res) {
            if (res !== false) {
                if (res.result.ready !== false) {
                    this.seed = res.result.seed;
                }
				     if(multplayercheck == true) {
						this.pollStatus();
				}
            }
            
        }.bind(this));
    }

    //generate random maze
     var maze = new GenerateMaze(13,13,this.seed);
     
    this.gameHeight = 460;
    this.gameWidth= 460;
    
    if(!ispractice) {
        //reads in the data for level from file
        this.level = maze.data;
        //each maze section loadlevel is read in from text file
        this.NEmaze = this.loadlevel();
        this.NWmaze = maze.data;
        this.SWmaze = this.loadlevel();
        this.SEmaze = maze.data3;
        //finish points data
        this.endPoints = this.getFinishPoints();
        //   this.level = this.loadlevel();
        //  this.level = Generate(10,10);
        //array of all the maze walls
        //questions
        this.question = getQuestions();
        //draw the walls and store the walls in walls
        this.walls = this.drawLevel(this.NEmaze, this.NWmaze, this.SEmaze, this.SWmaze);
    }
    
    //create players
    this.turtle = new Player(this.gameHeight,this.gameWidth);
    this.opponent = new Player(this.gameHeight,this.gameWidth);
    //array for adding the commands giving to it by logo
    this.pipeline = null;
    this.active = false;
    this.halt = false;
    //speed which each command is called
    this.speed = 250;

    



        for(var i = 0; i < myArray.length; i++) {
            console.log(myArray[i].Question);

        }



    //setups the game, draws the level and player, board size.


}






//this method checks if player collided wit any of the tiles
Game.prototype.checkPlayerCollision = function(isopponent){
    for (var i = 0; i < this.walls.length; i++) {
        //    for (var j = 0; j < this.walled[i].length; j++) {


        if (!checkCollision(this.turtle.x, this.turtle.y, this.turtle.height, this.turtle.width, this.walls[i].x, this.walls[i].y, this.walls[i].height, this.walls[i].width)
        ) {
           // drawElement("player", this.x, this.y, this.angle);
           // console.log(this.turtle.x + "  "+ this.turtle.y+ "  "+ this.turtle.height+ "  "+this.turtle.width+ "  "+this.walls[0].x+ " "this.walls[0].y+ "  "+ this.walls.height);


        }
        //collided with wall
        else {
            console.log("COLLISON");
            //there was a collision reset player to previous position
           // $("div.player").remove();
           // drawElement("player", this.turtle.previousPosition[0], this.turtle.previousPosition[1], this.turtle.previousPosition[2]);
            this.turtle.x = this.turtle.previousPosition[0];
            this.turtle.y = this.turtle.previousPosition[1];
            this.turtle.angle = this.turtle.previousPosition[2];

            this.turtle.update();
            //  console.log(this.x + "  " + this.y + "   " + this.angle)
            //    console.log(this.walled[i].x+"  "+this.walled[i].y);

        }
        //   }
    }

    ///check is player is at a finish point

    for (var i = 0; i < this.endPoints.length; i++) {

        if (checkCollision(this.turtle.x, this.turtle.y, this.turtle.height, this.turtle.width, this.endPoints[i].x, this.endPoints[i].y, this.endPoints[i].height, this.endPoints[i].width)) {
            $("div.player").remove();
            //teleports plays to next starting point
            if (i == 0) {
                this.turtle.x = 240;
                this.turtle.y = 0;
            }
            if (i == 2) {
                this.turtle.x = 0;
                this.turtle.y = 240;
            }
            if (i == 3) {
                this.turtle.x = 240;
                this.turtle.y = 240;
            }
            this.turtle.update();
        }
    }

    //check questions collision
    for (var i = 0; i < this.question.length; i++) {

        if (checkCollision(this.turtle.x, this.turtle.y, this.turtle.height, this.turtle.width, this.question[i].x, this.question[i].y, this.question[i].height, this.question[i].width)) {
            //remove the question so it doesnt appear again
            this.question.splice(i, 1);
            openQuestion();

        }

    }


if(multplayercheck == true) {
    if (isopponent !== true) {
        MazeClient.makeMove({"x": this.turtle.x, "y": this.turtle.y, "d": this.turtle.angle}, "forward", function (x) {
            if (x['result']['success'] === false) {
               //   drawElement("player", this.previousPosition[0], this.previousPosition[1], this.previousPosition[2]);
            }
        });
    }

}

};













Game.prototype.getFinishPoints = function(){
    var finishs =[];
    finishs[0] = new Finish(200,200,false);
   // finishs[1] = new Finish(440,200,false);
   // finishs[2] = new Finish(200,440,false);
    finishs[1] = new Finish(440,440,true);
    drawElement('finish',finishs[0].x,finishs[0].y,0);
 //   drawElement('finish',finishs[1].x,finishs[1].y,0);
 //   drawElement('finish',finishs[2].x,finishs[2].y,0);
    drawElement('finish',finishs[1].x,finishs[1].y,0);
    return finishs;
};
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

                this.checkPlayerCollision(false);
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




Game.prototype.pollStatus = function() {
	var tId;
	var myVar;

	MazeClient.getState(MazeClient.sessionID, function (res) {
		console.log(res);
		if (!this.gameOn && res.result.state == 1) {
			console.log("game started!");


			this.gameOn = true;
		}
		if (res.result.opp !== null) {

                        this.opponent.x = res.result.opp.X;
                        this.opponent.y = res.result.opp.Y;
                        this.opponent.angle = res.result.opp.heading;

                        this.opponent.update(true);
			console.log("updated opponent");
		}
	}.bind(this));

	tId = setTimeout(function () {
		this.pollStatus();
	}.bind(this), 500);

};



/*QUESTIONS */



var myArray = [
    {
        "Question": "What is 2+2?",
        "fAnswer": "1",
        "rAnswer": "2"
    },
    {
        "Question": "What is 24+2?",
        "fAnswer": "1",
        "rAnswer": "26"
    },
    {
        "Question": "What is 2231+2?",
        "rAnswer": "2233",
        "fAnswer": "2"
    }
];
