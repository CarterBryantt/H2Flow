class Pipe {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.spacing = 1; // Gaps in piping IOs
        this.inputCount = undefined;
        this.type = undefined;
        this.flowIOs = []; // Inputs and outputs

        this.directions = ["N","E","S","W"];
    }

    /**Serves the purpose of setting the new flowIOs */
    rotate(rotation) {
        this.rotation = rotation;

        this.flowIOs = [];
        
        let i = 0;
        while(this.flowIOs.length != this.inputCount) {
            this.flowIOs.push(this.directions[((i*this.spacing)+this.rotation)%4]);
            i++;
        }
    }

    /** Sets the type of pipe
     * @param {string} pipeType 
     */
    setType(pipeType) {
        switch(pipeType.toLowerCase()) {
            case "plug":
                this.inputCount = 1;
                this.spacing = 1;
                this.rotate(this.rotation);
            break;
            case "straight":
                this.inputCount = 2;
                this.spacing = 2;
                this.rotate(this.rotation);
            break;
            case "elbow":
                this.inputCount = 2;
                this.spacing = 1;
                this.rotate(this.rotation);
            break;
            case "tee":
                this.inputCount = 3;
                this.spacing = 1;
                this.rotate(this.rotation);
            break;
            case "cross":
                this.inputCount = 4;
                this.spacing = 1;
                this.rotate(this.rotation);
            break;
        }
    }

    startFlow(pipe) {
        pipe.flowDirection
    }
}

let myPipe = new Pipe();
myPipe.setType("cross");

let gridSizeX = 8;
let gridSizeY = 8;
let pipePlayground = [];

for (let x = 0; x < gridSizeX; x++) {
    let col = [];
    for (let y = 0; y < gridSizeY; y++) {
        col.push(new Pipe(x, y));
    }
    pipePlayground.push(col);
}
console.log(pipePlayground);

const unicodePipes = {
    "plug": {"solidPlugs": [9593,9594,9595,9592], "hollowPlugs": [2294,"228F",2293,2290]},
    "straight": {"solidStraights": [9475,9472,9475,9472], "hollowStraights": [9553,9552,9553,9552]},
    "elbow": {"solidElbows": [9494,9486,9490,9498], "hollowElbows": [9562,9556,9559,9565]},
    "tee": {"solidTees": [8866,8868,8867,8869], "hollowTees": [9568,9574,9571,9577]},
    "cross": {"straightCrosses:": [9546,9546,9546,9546], "hollowCrosses": [9580,9580,9580,9580]}
}

for (pipeTypes in unicodePipes) {
    for (pipeAppearances in unicodePipes[pipeTypes]) {
        unicodePipes[pipeTypes][pipeAppearances].forEach(code => console.log(String.fromCharCode(code)));
    }
}

let textGrid = "";

for (let x = 0; x < gridSizeX; x++) {
    for (let y = 0; y < gridSizeY; y++) {
        textGrid += pipePlayground[x][y].rotation;
    }
    textGrid += "\n";
}
console.log(textGrid);