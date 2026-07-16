const constants = require('../common/constants.js');
if(typeof utils==='undefined'){utils = require('../common/utils.js')};

const KNN = require('../common/classifiers/KNN.js');



const fs = require('fs');

let bestK = 50; 
try {
    const configFileContent = fs.readFileSync(constants.K_CONFIG, 'utf8');
    const config = JSON.parse(configFileContent);
    bestK = config.bestK;
    console.log(`Loaded optimal k=${bestK} from ${constants.K_CONFIG}`);
} catch (e) {
    console.log(`Could not load ${constants.K_CONFIG}, defaulting to k=${bestK}`);
}

console.log("RUNNING CLASSIFICATION..");


// first thing we'll need to classfication is to get training sample
const {samples:trainingSamples}= JSON.parse(
    fs.readFileSync(constants.TRAINING)
);

// instantiating KNN classifier on training samples
const kNN = new KNN(trainingSamples,bestK);

// testing now

// get testing samples
const {samples:testingSamples}= JSON.parse(
    fs.readFileSync(constants.TESTING)
);

// compute accuracy
let totalCount = 0;
let correctCount = 0;
for(const sample of testingSamples){
    const {label: predictedLabel} = kNN.predict(sample.point);
    correctCount += predictedLabel === sample.label ? 1 : 0;
    totalCount++;
}  

console.log(`Accuracy: ${correctCount}/${totalCount} = ${correctCount/totalCount*100}%`);


// Descision Boundary Plots

console.log("Generating Decision Boundary Plots..");

// we'll need to use a canvas

const {createCanvas} = require('canvas');

const canvas = createCanvas(1000,1000);

const ctx = canvas.getContext('2d');

// It'll be a pixel based plot, we take each individual pixel and treat it as a feature
// then well classify it and color it based on the predicted label


// looping pixel by pixel, generating a point for each pixel and classifying it
const totalColumns = canvas.width;
for(let x=0;x<canvas.width;x++){

    const percent_done = ((x/canvas.width)*100).toFixed(2);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Progress: ${percent_done}%`);
    for(let y=0;y<canvas.height;y++){
        const point = [
            x/canvas.width,
            1-y/canvas.height  // y axis is flipped in canvas   
        ];
        const {label} = kNN.predict(point);
        const color = utils.styles[label]?.color;
        ctx.fillStyle = color;
        ctx.fillRect(x,y,1,1);
    }
}


const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(constants.DESCISION_BOUNDARY_PLOT, buffer);

console.log("DONE! Decision Boundary Plot saved to "+constants.DESCISION_BOUNDARY_PLOT);

