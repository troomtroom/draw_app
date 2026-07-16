const constants={};

constants.DATA_DIR="../data";
constants.RAW_DIR=constants.DATA_DIR+"/raw";
constants.DATASET_DIR=constants.DATA_DIR+"/dataset";
constants.JSON_DIR=constants.DATASET_DIR+"/json";
constants.IMG_DIR=constants.DATASET_DIR+"/img";
constants.SAMPLES=constants.DATASET_DIR+"/samples.json";
constants.FEATURES=constants.DATASET_DIR+"/features.json";
constants.TRAINING=constants.DATASET_DIR+"/training.json";
constants.TRAINING_CSV=constants.DATASET_DIR+"/training.csv";
constants.TESTING=constants.DATASET_DIR+"/testing.json";
constants.TESTING_CSV=constants.DATASET_DIR+"/testing.csv";
constants.K_CONFIG=constants.DATASET_DIR+"/k_config.json";

constants.JS_OBJECTS="../common/js_objects";
constants.SAMPLES_JS=constants.JS_OBJECTS+"/samples.js";
constants.FEATURES_JS=constants.JS_OBJECTS+"/features.js";
constants.TRAINING_JS=constants.JS_OBJECTS+"/training.js";
constants.TESTING_JS=constants.JS_OBJECTS+"/testing.js";
constants.FEATURES_MINMAX_JS = constants.JS_OBJECTS+"/minMax.js";
constants.FEATURES_MEAN_STD_JS=constants.JS_OBJECTS+"/meanStd.js";
constants.DESCISION_BOUNDARY_PLOT = constants.DATASET_DIR+"/decision_boundary_plot.png";
constants.K_TUNING_CSV = constants.DATASET_DIR+"/k_tuning.csv";

if(typeof module!=='undefined'){
   module.exports=constants;
}
