const constants = require('../common/constants.js');
if(typeof utils==='undefined'){utils = require('../common/utils.js')};

const KNN = require('../common/classifiers/KNN.js');


const fs = require('fs');

console.log("RUNNING CLASSIFICATION..");


// first thing we'll need to classfication is to get training sample
const {samples:trainingSamples}= JSON.parse(
    fs.readFileSync(constants.TRAINING)
);

// instantiating KNN classifier on training samples
const kNN = new KNN(trainingSamples,50);

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