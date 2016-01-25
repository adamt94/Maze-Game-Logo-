/**
 * Created by adam on 23-Jan-16.
 */


function GenerateMaze(height, width){
    var line = "";
    this.carve = function(x,y){
        var directionsX = [1,-1,0,0];
        var directionsY = [0,0,1,-1];

        var dir = Math.floor(Math.random() * 4);


        for(var i =0; i<4; i++)
        {
            var x1 = x +directionsX[dir];
            var y1 = y + directionsY[dir];
            var x2 = x1 + directionsX[dir];
            var y2 = y1 + directionsY[dir];

            if(this.data[x1][y1]==this.WALL && this.data[x2][y2]== this.WALL)
            {

                this.data[x1][y1] = 0;
                this.data[x2][y2] = 0;

                this.carve(x2,y2);
            }else{
                dir = (dir+1)%4;

            }


        }

    };
    this.generate = function(){

        for(var x = 0; x < this.width; x++) {
            this.data[x] = [];
            for(var y = 0; y < this.height; y++) {
                this.data[x][y] = this.WALL;
            }
        }

        //fill border right column
        for(var x = 0; x < this.width; x++) {
            this.data[x][0] = 2;
            this.data[x][this.height - 1] = 2;
        }

        //fill border bottom row
        for(var y = 0; y < this.height; y++) {
            this.data[0][y] = 2;
            this.data[this.width - 1][y] = 2;
        }

        //for(var i =0; i<this.height; i++){
        //    for(var j =0; j<this.width; j++)
        //    {
        //        line += this.data[i][j]+ " ";
        //
        //    }
        //    line +="\n";
        //}
        //console.log(line);
    };
    this.WALL = 1;
    this.SPACE = 0;
    this.data = [];
    this.height = height;
    this.width = width;
    this.generate();
    this.data[1][1] = this.SPACE;
    this.carve(1, 1);

    //removes left column
    for (var i = 0; i < this.data.length; i++) {
        var row = this.data[i];
        row.splice(0, 1);
    }
    this.data[0][0]=0;
    line = "";
    for(var i =0; i<this.height; i++){
        for(var j =0; j<this.width; j++)
        {
            line += this.data[i][j]+ " ";

        }
        line +="\n";
    }
    console.log(line);




}

function Generate(){
    var line = ""
    for(var x = 0; x < this.width; x++) {
        data[x] = [];
        for(var y = 0; y < this.height; y++) {
            data[x][y] = this.WALL;
        }
    }

    //fill border column
    for(var x = 0; x < this.width; x++) {
        data[x][0] = 2;
        data[x][this.height - 1] = 2;
    }

    //fill border column
    for(var y = 0; y < this.height; y++) {
        data[0][y] = 2;
        data[this.width - 1][y] = 2;
    }

    for(var i =0; i<this.height; i++){
        for(var j =0; j<this.width; j++)
        {
            line += data[i][j]+ " ";

        }
        line +="\n";
    }
    console.log(line);
};
//function carve(x,  y)
//{
//    var directionsX = [1,-1,0,0];
//    var directionsY = [0,0,1,-1];
//
//    var dir = Math.floor(Math.random() * 4);
//
//
//    for(var i =0; i<4; i++)
//    {
//        var x1 = x +directionsX[dir];
//        var y1 = y + directionsY[dir];
//        var x2 = x1 + directionsX[dir];
//        var y2 = y1 + directionsY[dir];
//
//        if(this.data[x1][y1]==this.WALL && this.data[x2][y2]== this.WALL)
//        {
//
//            this.data[x1][y1] = 0;
//            this.data[x2][y2] = 0;
//
//             carve(x2,y2);
//        }else{
//            dir = (dir+1)%4;
//
//        }
//
//
//    }
//
//
//}
//private void carve(int x, int y) {
//
//    final int[] upx = { 1, -1, 0, 0 };
//    final int[] upy = { 0, 0, 1, -1 };
//
//
//    //direction to move
//    int dir = rand.nextInt(4);
//
//
//    for(int i =0; i<4; i++){
//        final int x1 = x + upx[dir];
//        final int y1 = y + upy[dir];
//        final int x2 = x1 + upx[dir];
//        final int y2 = y1 + upy[dir];
//        if(data[x1][y1] == WALL && data[x2][y2] == WALL) {
//            data[x1][y1] = SPACE;
//            data[x2][y2] = SPACE;
//
//            carve(x2, y2);
//
//        } else {
//            //select another direction
//            dir = (dir + 1) % 4;
//
//
//        }
//    }
//}