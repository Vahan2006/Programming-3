function generator(matLen, gr, grEat, pre, ferm, trap, lava) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pre; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < ferm; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < trap; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < lava; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }

    return matrix;
}

let side = 20;

let matrix = generator(50, 150, 80, 15, 10, 5, 3);

let grassArr = []
let grassEaterArr = []
let predatorArr = []
let fermerArr = []
let trapArr = []
let lavaArr = []
let weather = true;
let winter = document.getElementById("winter");
let summer = document.getElementById("summer");

winter.addEventListener("click", winterF);
function winterF() {
    weather = false;
}
summer.addEventListener("click", summerF);
function summerF() {
    weather = true;
}

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(3)
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let grE = new GrassEater(x, y)
                grassEaterArr.push(grE)
            }
            else if (matrix[y][x] == 3) {
                let pre = new Predator(x, y)
                predatorArr.push(pre)
            }
            else if (matrix[y][x] == 4) {
                let ferm = new Fermer(x, y)
                fermerArr.push(ferm)
            }
            else if (matrix[y][x] == 5) {
                let trap = new Trap(x, y)
                trapArr.push(trap)
            }
            else if (matrix[y][x] == 6) {
                let lava = new Lava(x, y)
                lavaArr.push(lava)
            }
        }
    }
    console.log(grassArr);
}


function draw() {
    if (weather == true) {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 1) {
                    fill('green')
                } else if (matrix[y][x] == 0) {
                    fill('#acacac')
                } else if (matrix[y][x] == 2) {
                    fill('yellow')
                }
                else if (matrix[y][x] == 3) {
                    fill('red')
                }
                else if (matrix[y][x] == 4) {
                    fill('blue')
                }
                else if (matrix[y][x] == 5) {
                    fill('black')
                }
                else if (matrix[y][x] == 6) {
                    fill('orange')
                }
                rect(x * side, y * side, side, side)
            }
        }}
        else if (weather == false) {
            for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                    if (matrix[y][x] == 1) {
                        fill('lightgreen')
                    } else if (matrix[y][x] == 0) {
                        fill('white')
                    } else if (matrix[y][x] == 2) {
                        fill('lightyellow')
                    }
                    else if (matrix[y][x] == 3) {
                        fill('lightred')
                    }
                    else if (matrix[y][x] == 4) {
                        fill('lightblue')
                    }
                    else if (matrix[y][x] == 5) {
                        fill('lightblack')
                    }
                    else if (matrix[y][x] == 6) {
                        fill('lightorange')
                    }
                    rect(x * side, y * side, side, side)
                }
            }
        }
        if (weather == true){
            frameRate(2)
            for (let i in grassArr) {
                grassArr[i].mul()
            }
            for (let i in grassEaterArr) {
                grassEaterArr[i].mul()
                grassEaterArr[i].eat()
            }
            for (let i in predatorArr) {
                predatorArr[i].eat()
            }
            for (let i in fermerArr) {
                fermerArr[i].move()
            }
            for (let i in trapArr) {
                trapArr[i].eat()
            }
            for (let i in lavaArr) {
                lavaArr[i].mul()
            }
        }
        if (weather == false){
            frameRate(1)
            for (let i in grassArr) {
                grassArr[i].mul()
            }
            for (let i in grassEaterArr) {
                grassEaterArr[i].mul()
                grassEaterArr[i].eat()
            }
            for (let i in predatorArr) {
                predatorArr[i].eat()
            }
            for (let i in fermerArr) {
                fermerArr[i].move()
            }
            for (let i in trapArr) {
                trapArr[i].eat()
            }
            for (let i in lavaArr) {
                lavaArr[i].mul()
            }
        }

    } 


    var fs = require('fs');

var statistics = {};
let a = 200;

let b = 80;
setInterval(function() {
statistics.grass = a++;
statistics.grassEater = b++;
fs.writeFile("statistics.json", JSON.stringify( statistics), function(){
console.log("send")
})
},1000);
