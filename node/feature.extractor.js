const constants = require('../common/constants.js');
const featureFunctions = require('../common/featureFunctions.js');
const utils = require('../common/utils.js');
const fs = require('fs');

console.log("Extracting features from samples...");

const samples = JSON.parse(
    fs.readFileSync(constants.SAMPLES)
);

for(const sample of samples){
    const paths = JSON.parse(
        fs.readFileSync(
            constants.JSON_DIR+"/"+sample.id+".json"
        )

    );

const featureFns = featureFunctions.inUse.map(feature => feature.function);
sample.point = featureFns.map(fn => fn(paths));
};

const meanStd = utils.standardizePoints(samples.map(s=>s.point));
const featureNames = featureFunctions.inUse.map(feature => feature.name || feature.label || 'Unnamed Feature');

fs.writeFileSync(
    constants.FEATURES,
    JSON.stringify({
        featureNames,
        samples: samples.map(s=>{
            return{
                point:s.point,
                label:s.label
            };
        })
    })
);

fs.writeFileSync(
    constants.FEATURES_JS,
    `const features = 
    ${JSON.stringify({featureNames,samples})}
    ;`
);

fs.writeFileSync(constants.FEATURES_MEAN_STD_JS,`const featuresMeanStd = ${JSON.stringify(meanStd)};`);
console.log("Features extracted and saved to "+constants.FEATURES);
