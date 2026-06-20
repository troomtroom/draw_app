const draw = require('../common/draw.js');
const constants = require('../common/constants.js');
const utils = require('../common/utils.js');


const {createCanvas} = require('canvas');
const canvas = createCanvas(400,400);
const ctx =canvas.getContext('2d');

const path = require('path');
const fs = require('fs');



// Read all raw JSON files from the raw data directory
const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];

let id = 1;
fileNames.forEach(fn => {
    const content = fs.readFileSync(path.join(constants.RAW_DIR, fn), 'utf8');
    const { session, student:user, drawings } = JSON.parse(content);

    // Create one sample entry for each drawing label in the file
    for (let label in drawings) {
        samples.push({
            id,
            label,
            user_name: user,
            user_id: session
        });

        const paths = drawings[label];

        fs.writeFileSync(
            constants.JSON_DIR+"/"+id+".json",
            JSON.stringify(paths)
        );
        
        fs.writeFileSync(
            constants.SAMPLES_JS,
            "const samples="+JSON.stringify(paths)+";"
        );

        generateImageFile(
            constants.IMG_DIR+"/"+id+".png",
            paths
        );

        utils.printProgress(id,fileNames.length*8);
        id++;
    }
});

// Write the aggregated sample metadata to samples.json
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));


function generateImageFile(outFile,paths){
    ctx.clearRect(0,0,
        canvas.width,canvas.height);
    draw.paths(ctx,paths);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outFile,buffer);
}
