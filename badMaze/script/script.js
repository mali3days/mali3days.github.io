"use strict";
var
    Maze = [
    ["+", 0, "+","+","+","+","+","+","+","+","+","+"],
    ["+", 0, "+", 0 ,"+","+", 0 , 0 , 0 , 0 , 0 ,"+"],
    ["+", 0, "+", 0 , 0 , 0 , 0 ,"+","+", 0 ,"+","+"],
    ["+", 0, "+", 0 ,"+","+","+","+", 0 , 0 , 0 ,"+"],
    ["+", 0,  0 , 0 ,"+","+", 0 ,"+", 0 ,"+","+","+"],
    ["+", 0, "+","+","+", 0 , 0 ,"+", 0 , 0 , 0 ,"+"],
    ["+", 0, "+", 0 , 0 , 0 ,"+","+", 0 ,"+", 0 ,"+"],
    ["+", 0,  0 , 0 ,"+","+", 0 , 0 , 0 ,"+", 0 ,"+"],
    ["+", 0, "+", 0 , 0 ,"+", 0 ,"+","+","+","+","+"],
    ["+", 0,  0 , 0,  0 ,"+", 0 ,"+", 0 , 0 , 0 ,"+"],
    ["+", 0, "+", 0 , 0 ,"+", 0 , 0 , 0 ,"+", 0 ,"+"],
    ["+","+","+","+","+","+","+","+","+","+", 0 ,"+"]],
mazeHasNotYetPassed = true,
canvas = document.getElementById('canvas1'),
context = canvas.getContext("2d"),
w = canvas.width,
delimiter = 12,
 size = w/delimiter,
x, y,
startY = 0,
startX = 0,
lengthOfMaze = Maze.length;

rect(size,size-16,size,size,'red');
rect(size*10,11*size,size,size,'green');
for(var i = 0;i<lengthOfMaze;i++){
    for(var j = 0;j<lengthOfMaze;j++){
        rect(size*j,size*i,size,size,blackOrWhite((Maze[i][j])));
    }
}

function rect(x,y,w,h,color){
    context.fillStyle = color;
    context.fillRect (x,y,w,h);
}

function blackOrWhite(something){
    return something === "+" ? 'black' : 'white' ;
}

function dfs(Maze) {
    Maze[startX][startY] = 1; //стартовая ячейка
    var k = 1;
    while (k < lengthOfMaze * lengthOfMaze) {
        k++;
        for (x = 0; x < lengthOfMaze; x++){
            for(y = 0; y < lengthOfMaze; y++){
                Maze = passWave(x, y, k, Maze);
            }
        }
    }
}

function passWave(x, y, k, maze) {
    if (maze[x][y] == k-1  && mazeHasNotYetPassed) {
        wayThroughTheMazeFound(x,y,maze);

        if ((x < lengthOfMaze-1)  && (maze[x+1][y] == 0) && mazeHasNotYetPassed) {
            maze[x+1][y] = k;
            rect(y*size,(x+1)*size,size,size,yellowWay(maze[x][y]));
        }
        if ((x > 0)  && (maze[x-1][y] == 0) && mazeHasNotYetPassed) {
            maze[x-1][y] = k;
            rect(y*size,(x-1)*size,size,size,yellowWay(maze[x][y]));
        }
        if ((y < lengthOfMaze-1) && (maze[x][y+1] == 0) && mazeHasNotYetPassed){
            maze[x][y+1] = k;
            rect((y+1)*size,x*size,size,size,yellowWay(maze[x][y]));
        }
        if ((y > 0)  && (maze[x][y-1] == 0) && mazeHasNotYetPassed) {
            maze[x][y-1] = k;
            rect((y-1)*size,x*size,size,size,yellowWay(maze[x][y]));
        }
    }
    return maze;
}

function wayThroughTheMazeFound(x,y,maze) {
    if(maze[x][y] === Maze[lengthOfMaze-1][lengthOfMaze-2]) {
        mazeHasNotYetPassed = false;
        rect(size,size-16,size,size,'green');
        rect(size*10,11*size,size,size,'red');
        alert("Лабиринт пройден!");
    }
}

function passMaze() {
        dfs(Maze);
}

function yellowWay(something){
    if( isNaN(something) ) {
        return 'black';
    } else {
        return '#E9AC40';
    }
}