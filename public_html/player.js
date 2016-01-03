/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Player(sprite) {
    this.turtle = sprite;
    
    this.length = 500; /// canvas length
    this.height = 500; ///canvas height
    this.x = 250 ;//starting position (center)
    this.y = 250;// starting position (center)
    this.angle = 270;// starting angle
  
    drawElement("player", this.x, this.y, this.angle);

}

Player.prototype.update = function () {
    if (this.x >= 0 && this.y >= 0 && this.x <= this.length && this.y <= this.height) {
        // this.turtle.style.left = parseInt(this._left + this.x - 10) + "px";
        // this.turtle.style.top = parseInt(this._top + this.y - 20) + "px";
        /*draws the object to screen*/
        drawElement("player", this.x, this.y, this.angle);

    }
};

Player.prototype.radians = function () { //calculates angle to move at
    return this.angle / 180 * Math.PI;
};

//move object foward
Player.prototype.forward = function (d) {

    this.crawl(d);//d is the number of spaces moved
};


Player.prototype.backward = function (d) {
    this.forward(-d);
};

Player.prototype.right = function (angle) {

    this.angle = (this.angle + angle) % 360;
    this.update();
};


Player.prototype.left = function (angle) {
 
    this.right(-angle);
};

//moves the player foward depending on players direction
Player.prototype.crawl = function (d) {
    
    var newx = this.x + d * Math.cos(1);//calculates angle to move at
    var newy = this.y + d * Math.sin(1);

    this.x = newx;
    this.y = newy;
    this.update();
};

//reset player to starting position
Player.prototype.home_ = function () {
    this.x = this.max_x / 2;
    this.y = this.max_y / 2;
    this.angle = 270;
    this.update();
};



function DelayCommand(that, fun, args) {
    this.that = that;
    this.fun = fun;
    this.args = args;
}


DelayCommand.prototype.call = function (that) {

    return this.fun.apply(this.that, this.args);
};

//this is function that adds the commands to the pipeline which are then excuted
//by calling the players methods.
function Commands(sprite) {
  
    this.player = new Player(sprite);
    
    this.pipeline = null;
    this.active = false;
    this.halt = false;
    this.speed = 5;
    this.animate = true;
}


Commands.prototype.start = function () {
    this.active = true;
    this.halt = false;
    this.pipeline = new Array();

    this.paint();
};

Commands.prototype.finish = function () {
    this.active = false;
};
Commands.prototype.stop = function () {
    this.halt = true;
};

Commands.prototype.paint = function () {
    if (!this.halt) {
        var redraw = this.active;

        if (this.pipeline.length > 0) {

            do {
                var fun = this.pipeline.shift();



                fun.call();

                redraw = true;

            } while (this.speed <= 1 && this.pipeline.length > 0)
        }
        if (redraw) {
            var that = this;
            //this part animates the object at the speed given
            setTimeout(function () {
                that.paint.call(that);
            }, this.speed);
        }
    }
};
//adds the commands to the pipeline
Commands.prototype.addCommand = function (fun, args) {

    this.pipeline.push(new DelayCommand(this.turtle, fun, args));
};

Commands.prototype.forward = function (d) {
    
        var l = Math.abs(d);
        var s = l / d;//divdes by to make 1

        
        for (var c = 0; c < l; c++) {
            this.addCommand(this.player.crawl, [s])//adds the number of steps foward 
        }
    
};

Commands.prototype.backward = function (d) {
    this.forward(-d);
};


Commands.prototype.right = function () {
    this.addCommand(this.player.right, arguments);
};
Commands.prototype.left = function () {
    this.addCommand(this.player.left, arguments);
};
Commands.prototype.reset = function () {
    this.addCommand(this.player.setup, arguments);
};


Commands.prototype.setxy = function () {
    this.addCommand(this.player.setxy, arguments);
};
Commands.prototype.setx = function () {
    this.addCommand(this.player.setx, arguments);
};
Commands.prototype.sety = function () {
    this.addCommand(this.player.sety, arguments);
};


Commands.prototype.home = function () {
    this.addCommand(this.player.home, arguments);
};

//draws a class in css to the screen
function drawElement(classname, xpos, ypos, angle) {
    var $element = $('<div/>').addClass(classname);
    $element.css('top', ypos + 'px').css('left', xpos + 'px').css("transform" + "rotate(" + angle + "deg)");
    $('#left').append($element);
};