const featureFunctions = {};

featureFunctions.getPathCount = (paths)=>{
    return paths.length;
}


// get point count
featureFunctions.getPointCount=(paths)=>{
    const points = paths.flat();
    return points.length;
}


if(typeof module !=="undefined"){
    module.exports=featureFunctions;
}