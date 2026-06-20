const constants = {};

const path = require('path');

// Base data directory relative to this script
constants.DATA_DIR = path.join(__dirname, '..', 'data');
constants.RAW_DIR = path.join(constants.DATA_DIR, 'raw');
constants.DATASET_DIR = path.join(constants.DATA_DIR, 'dataset');
constants.JSON_DIR = path.join(constants.DATASET_DIR, 'json');
constants.IMG_DIR = path.join(constants.DATASET_DIR, 'img');
constants.SAMPLES = path.join(constants.DATASET_DIR, 'samples.json');
constants.JS_OBJECTS = "../common/js_objects";
constants.SAMPLES_JS= path.join(constants.JS_OBJECTS,'samples.js')


if(typeof module!=='undefined'){
    module.exports=constants
}