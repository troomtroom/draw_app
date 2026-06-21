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

if(typeof module!=='undefined'){
    module.exports=utils;
}