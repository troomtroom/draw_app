// tune_k.js
const constants = require('../common/constants.js');
const KNN = require('../common/classifiers/KNN.js');
const fs = require('fs');
if(typeof utils==='undefined'){utils = require('../common/utils.js')};

console.log("LOADING DATA FOR CROSS-VALIDATION TUNING...");
const { samples: allTrainingSamples } = JSON.parse(fs.readFileSync(constants.TRAINING));

const numFolds = 5;
const minK = 1;
const maxK = 99; 

let bestK = minK;
let bestAverageAccuracy = -1;

console.log(`Running ${numFolds}-Fold Cross-Validation...`);

// Loop through each K value we want to try
for (let k = minK; k <= maxK; k += 2) {
    let totalAccuracyAcrossFolds = 0;

    // Run the experiment 5 times (once for each fold)
    for (let fold = 0; fold < numFolds; fold++) {
        const trainingSamples = [];
        const validationSamples = [];

        // Distribute data systematically across the 5 folds
        for (let i = 0; i < allTrainingSamples.length; i++) {
            // If the sample index matches our current fold turn, it's validation data
            if (i % numFolds === fold) {
                validationSamples.push(allTrainingSamples[i]);
            } else {
                trainingSamples.push(allTrainingSamples[i]);
            }
        }

        // Train KNN on the 4 folds, test on the 1 validation fold
        const kNN = new KNN(trainingSamples, k);
        let correctCount = 0;
        for (const sample of validationSamples) {
            const { label: predictedLabel } = kNN.predict(sample.point);
            correctCount += predictedLabel === sample.label ? 1 : 0;
        }

        const foldAccuracy = correctCount / validationSamples.length;
        totalAccuracyAcrossFolds += foldAccuracy;
    }

    // Calculate the overall average accuracy for this specific K value
    const averageAccuracy = totalAccuracyAcrossFolds / numFolds;
    console.log(`k = ${k} -> Average Cross-Validation Accuracy: ${(averageAccuracy * 100).toFixed(2)}%`);

    // Track the absolute best performing K overall
    if (averageAccuracy > bestAverageAccuracy) {
        bestAverageAccuracy = averageAccuracy;
        bestK = k;
    }
}

console.log(`\n Verified Winner! Best K found: ${bestK} with a Cross-Validation Accuracy of ${(bestAverageAccuracy * 100).toFixed(2)}%`);

// Save the truly optimal K value
const configData = { bestK: bestK };
fs.writeFileSync(constants.K_CONFIG, JSON.stringify(configData, null, 2));
console.log("Saved best K to config.json!");