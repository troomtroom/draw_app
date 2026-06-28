const utils = {}
utils.flaggedUsers = [1663855426831,1663858221250,1663858276975,1663859212298,1663859847700,1663860275179,1663860941163,1663861295079,1663864583532,
    1663866553884,1663914386004,1663959787784,1663961253145,
1666997859230,1666998028989,1674833893482,1674890940118,1675056399345
,1675613158094,1676257394767,1676348574010,1676640449982,1678207465106,1679403934444,1681750351703,1681777101369,1681837899558,1682255271235,
]


utils.styles ={
    car:    {color:'gray',text:'🚗'},
    fish:   {color:'red', text:'🐟'},
    house:  {color:'yellow',text:'🏠'},
    tree:   {color:'green', text:'🌳'},
    bicycle:{color: 'cyan', text:'🚲'},
    guitar: {color: 'blue', text:'🎸'},
    pencil: {color: 'magenta',text:'✏️'},
    clock:  {color:'lightgray',text:'⏰'}
}
utils.formatPercent= (n)=>{
    return (n*100).toFixed(2)+"%";
}


utils.printProgress = (count,max)=>{
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent = utils.formatPercent(
        count/max
    );
    process.stdout.write(count+"/"+max+ " ("+percent+")"); 
}

utils.groupBy=(objArray,key)=>{
    const groups = {};
    for(let obj of objArray){
        const val = obj[key];
        if(groups[val]==null){
            groups[val]=[];
        }

        groups[val].push(obj);
    }
    return groups; 
}



utils.distance=(p1,p2)=>{
   return Math.sqrt(
      (p1[0]-p2[0])**2+
      (p1[1]-p2[1])**2
   );
}

utils.getNearest=(loc,points)=>{
   let minDist=Number.MAX_SAFE_INTEGER;
   let nearestIndex=0;

   for(let i=0;i<points.length;i++){
      const point=points[i];
      const d=math.distance(loc,point);

      if(d<minDist){
         minDist=d;
         nearestIndex=i;
      }
   }
   return nearestIndex;
}

utils.inverseLerp=(min,max,value)=>{
    return (value-min)/(max-min);
}


utils.normalizePoints=(points,minMax)=>{
    let min,max;
    const dims = points[0].length;
    
    if(minMax){
        min = minMax.min;
        max = minMax.max;
    }
    else{
        min= [...points[0]];
        max= [...points[0]];

        for(let i=1;i<points.length;i++){
            for(let j=0;j<dims;j++){
                min[j]=Math.min(min[j],points[i][j]);
                max[j]=Math.max(max[j],points[i][j]);
            }
        }
    }
    for(let i=0;i<points.length;i++){
        for(let j=0;j<dims;j++){
            points[i][j]=utils.inverseLerp(min[j],max[j],points[i][j]);
        }
    }

    return {min,max};
}

utils.standardizePoints=(points,meanStd)=>{
    let mean,std;
    const dims = points[0].length;

    if(meanStd){
        mean = meanStd.mean;
        std = meanStd.std;
    }
    else{
        mean = new Array(dims).fill(0);
        std = new Array(dims).fill(0);

        for(let i=0;i<points.length;i++){
            for(let j=0;j<dims;j++){
                mean[j]+=points[i][j];
            }
        }

        for(let j=0;j<dims;j++){
            mean[j]/=points.length;
        }

        for(let i=0;i<points.length;i++){
            for(let j=0;j<dims;j++){
                std[j]+=(points[i][j]-mean[j])**2;
            }
        }

        for(let j=0;j<dims;j++){
            std[j]=Math.sqrt(std[j]/points.length);
        }
    }

    for(let i=0;i<points.length;i++){
        for(let j=0;j<dims;j++){
            points[i][j]=std[j]===0 ? 0 : (points[i][j]-mean[j])/std[j];
        }
    }

    return {mean,std};
}


if(typeof module!=='undefined'){
    module.exports=utils;
}
