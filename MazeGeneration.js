/**
 * Created by adam on 23-Jan-16.
 *
 * got to adamt94.bitbucket.org for testing
 *
 *
 */

Math.seed = 0;

function GenerateMaze(height, width,seed){

    this.WALL = 1;
    this.SPACE = 0;
    Math.seed = seed;
    this.height = height;
    this.width = width;
    this.data = this.Generate(this.width, this.height); //setup maze data NE
    this.data2 = this.Generate(this.width,this.height);//setup maze data NW
    this.data3 = this.Generate(this.width, this.height); //setup maze data SE
    this.data4 = this.Generate(14,14);//setup maze data SW

    //RECURSIVE BACKTRACKER
    this.data[1][1] = this.SPACE; //starting point
    this.data = this.Carve(1,1,this.data); //sstart random gen algorithm
    this.data2[1][1] = this.SPACE; //starting point
    this.data2 = this.Carve(1,1,this.data2);


    //KRUSKALS
    this.data3[1][1] = this.SPACE; //starting point
    this.data3 = this.Carve(1,1,this.data3); //sstart random gen algorithm
    this.data4[1][1] = this.SPACE; //starting point
    this.data4 = this.KruskalAlgorithm(this.data4);
 //   this.data4 = this.Carve(1,1,this.data4)
   // this.KruskalAlgorithm(this.Generate(this.width,this.height));












    //starting point
    this.data2[0][0]=0;


    var line = "";
    for(var i =0; i<this.width; i++){
        for(var j =0; j<this.height; j++)
        {
            line += this.data[i][j]+ " ";

        }
        line +="\n";
    }
   // console.log(line);




}

//return array initialized for maze
GenerateMaze.prototype.Generate = function(width ,height){
    var maze =[];
    for(var x = 0; x < width; x++) {
        maze[x] = [];
        for(var y = 0; y < height; y++) {
            maze[x][y] = this.WALL;
        }
    }
    //2s are created for padding around edges
    //fill border right column
    for(var x = 0; x < width; x++) {
        maze[x][0] = 2;
        maze[x][height - 1] = 2;
    }

    //fill border bottom row
    for(var y = 0; y < height; y++) {
        maze[0][y] = 2;
        maze[width - 1][y] = 2;
    }


    return maze;

};



/*
 * method uses recusive backtracker to generate a maze
 * an array is created with a  given size. the array is filled with 1s which is a wall and padding around it
 * to stop out of bounds.
 * Here’s the mile-high view of recursive backtracking:
 * - Choose a starting point in the field.
 * - Randomly choose a wall at that point and carve a passage through to the adjacent cell, but only if the adjacent cell has not been visited yet. This becomes the new current cell.
 * - If all adjacent cells have been visited, back up to the last cell that has uncarved walls and repeat.
 * - The algorithm ends when the process has backed all the way up to the starting point.
 *
 * */


GenerateMaze.prototype.Carve = function(x,y,maze){
    //directions for each cell
    var directionsX = [1,-1,0,0];
    var directionsY = [0,0,1,-1];
    var test = Math.seededRandom(3,0);
    test = Math.round(test);

    //choose random direction
    var dir = test;


    //loop round each direction until finished
    for(var i =0; i<4; i++)
    {
        //calculates the cell positions
        var x1 = x +directionsX[dir];
        var y1 = y + directionsY[dir];
        var x2 = x1 + directionsX[dir];
        var y2 = y1 + directionsY[dir];
        //check if the next 2 cells have a wall and  cell has been visited
        if(maze[x1][y1]==this.WALL && maze[x2][y2]== this.WALL&&maze[x][y]==0)
        {
            //change the cells to a space
            maze[x1][y1] = 0;
            maze[x2][y2] = 0;
            //call again
            this.Carve(x2,y2,maze);
        }else{
            //assign a different direction if
            dir = (dir+1)%4;

        }


    }


    return maze;

};

//create a random seed
Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
};

GenerateMaze.prototype.KruskalAlgorithm = function(maze){
    var directionsX = [2,-2,0,0];
    var directionsY = [0,0,2,-2];
    var directionsX2 = [1,-1,0,0];
    var directionsY2 = [0,0,1,-1];
    var randx;
    var randy;
    var dir = Math.seededRandom(3, 0);
    dir = Math.round(dir);
    var sets = 3;
    var finished = false;
    var edgesx = [];
    var edgesy = [];
    var edge = 2;
    for(var i =0; i < (maze.length-1)/2; i++){
        edgesx[i] = edge;
        edge+=2;
    }
    edge =2;
    for(var i =0; i < (maze.length-1)/2; i++){
        edgesy[i] = edge;
        edge+=2;
    }
    for(var i =0; i<edgesx.length; i++){
        console.log(edgesx[i]);
    }
    //needs to be changed while there are edges, currently works with 10 iterations though
    for(var c =0; c<10; c++) {
        for (var i = 0; i < edgesx.length; i++) {
            for (var j = 0; j < edgesy.length; j++) {
                dir = Math.seededRandom(3, 0);
                dir = Math.round(dir);
                var x = edgesx[i];
                var y = edgesy[j];

                var x2 = edgesx[i] + directionsX[dir];
                var y2 = edgesy[j] + directionsY[dir];

                var pathx = edgesx[i] + directionsX2[dir];
                var pathy = edgesy[j] + directionsY2[dir];
                try{
                if (maze[x][y] == this.WALL && maze[x2][y2] == this.WALL) {
                    maze[x][y] = sets;
                    maze[pathx][pathy] = 0;
                    maze[x2][y2] = sets;

                    sets++;
                }
                else if (maze[x][y] == this.WALL && maze[x2][y2] > 2) {
                    maze[x][y] = maze[x2][y2];
                    maze[pathx][pathy] = 0;
                }

                else if (maze[x][y] > 2 && maze[x2][y2] > 2 && maze[x][y] !== maze[x2][y2]) {
                    maze[pathx][pathy] = 0;
                    var set = maze[x2][y2];
                    for (var h = 0; h < maze.length; h++) {
                        for (var k = 0; k < maze[0].length; k++) {
                            if (set == maze[h][k]) {
                                maze[h][k] = maze[x][y];
                            }
                        }
                    }
                }
                }catch(err){
                }
            }
        }
    }

    for(var i =0; i<maze.length; i++){
        s="";
        for(var j = 0; j<maze[0].length; j++){
            if(maze[i][j] >2)
            {
                maze[i][j] =0;
            }
            s+=maze[i][j]+"  ";
        }
        console.log(s);
    }
        return maze;

};

function set(){
    this.set = 0;
}