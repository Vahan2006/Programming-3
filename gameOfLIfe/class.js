class LivingCreature {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.time = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    move() {

        this.getNewCoordinates()
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in matrix) {
                if (this.x == matrix[i].x && this.y == matrix[i].y) {
                    matrix.splice(i, 1);
                    break;
                }
            }
        } else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }



}

class Grass extends LivingCreature {
    mul() {
        this.getNewCoordinates()
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}


class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 8
    }
    mul() {
        this.getNewCoordinates()
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        
        if (newCell && this.multiply >= a) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            var newGr = new GrassEater(newX, newY);
            grassEaterArr.push(newGr);
            this.multiply = 0;
            for (var i in matrix) {
                if (this.x == matrix[i].x && this.y == matrix[i].y) {
                    matrix.splice(i, 1);
                    break;
                }
            }
        }
    }

    eat() {
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

        } else {
            
                this.move()
            

        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}


class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 25
    }
    eat() {
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

        }

        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}
class Fermer extends LivingCreature {

    move() {
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 1
            this.x = newX
            this.y = newY
            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);

            for (var i in matrix) {
                if (this.x == matrix[i].x && this.y == matrix[i].y) {
                    matrix.splice(i, 1);
                    break;
                }
            }
        }
    }
}

class Trap extends LivingCreature {
    eat() {
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        var emptyCells1 = this.chooseCell(4);
        var newCell1 = random(emptyCells1);
        var emptyCells2 = this.chooseCell(3);
        var newCell2 = random(emptyCells2);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

        }
        if (newCell1) {
            var newX = newCell1[0];
            var newY = newCell1[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in fermerArr) {
                if (newX == fermerArr[i].x && newY == fermerArr[i].y) {
                    fermerArr.splice(i, 1);
                    break;
                }
            }

        }
        if (newCell2) {
            var newX = newCell2[0];
            var newY = newCell2[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

        }

    }
}
class Lava extends LivingCreature {

    mul(a) {

        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        var emptyCells1 = this.chooseCell(1);
        var newCell1 = random(emptyCells1);
        var emptyCells11 = this.chooseCell(2);
        var newCell11 = random(emptyCells11);

        if (newCell && this.multiply >= a) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 6;

            var lava = new Lava(newX, newY);
            lavaArr.push(lava);
            this.multiply = 0;


        }
        if (newCell1 && this.multiply >= a) {
            var newX = newCell1[0];
            var newY = newCell1[1];
            matrix[newY][newX] = 6;

            var lava = new Lava(newX, newY);
            lavaArr.push(lava);
            this.multiply = 0;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        if (newCell11 && this.multiply >= a) {
            var newX = newCell11[0];
            var newY = newCell11[1];
            matrix[newY][newX] = 6;

            var lava = new Lava(newX, newY);
            lavaArr.push(lava);
            this.multiply = 0;
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}


class GrassVirus extends LivingCreature {
    mul() {
        this.multiply++
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 5) {
            this.multiply = 0
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 8;

            var newGrassV = new GrassVirus(newX, newY);
            grassVirusArr.push(newGrassV);

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassVirusArr) {
            if (this.x == grassVirusArr[i].x && this.y == grassVirusArr[i].y) {
                grassVirusArr.splice(i, 1);
                break;
            }
        }
    }
}