if(typeof utils==='undefined'){const utils = require('../utils.js');}

class KNN{
    constructor(samples,k){
        this.samples = samples;
        this.k = k;
    }
    predict(point){
        const samplePoints = this.samples.map(s=>s.point);
            const indices = utils.getNearest (point,samplePoints, this.k);
            const nearestSamples = indices.map(i => this.samples[i.index]);
            const labels = nearestSamples.map(s => s.label);
            
            const epsilon = 1e-6;

            const weights = nearestSamples.map(s=> {
                const distance = utils.distance(point,s.point);
                return 1/(distance+epsilon);
            });

            const {label, probability} = utils.getWeightedProbability(labels,weights);
            // const {label,probability} = utils.getVoteProbability(labels);

            return {label, probability, nearestSamples};

    }
}

if(typeof module !== 'undefined'){
    module.exports = KNN;
}