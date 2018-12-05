import _ from 'lodash';


// Get Log e entropy of a distribution
export const getEntropy = (input) => {
    let arr;

    if (_.isString(input)) {
        arr = input.split('');
    } else {
        arr = input;
    }

    const set = {};
    arr.forEach(
        c => (set[c] ? set[c]++ : (set[c] = 1))
    );

    return Object.keys(set).reduce(
        (acc, c) => {
            const p = set[c] / arr.length;
            return acc - (p * (Math.log(p)));
        }, 0
    );
};


// Get MLE of a distribution
export const getConservation = (input) => {
    let arr;

    if (_.isString(input)) {
        arr = input.split('');
    } else {
        arr = input;
    }

    const conservationArr = _(arr)
        .countBy()
        .entries()
        .maxBy('[1]')[1];

    return conservationArr;
}


// Get consensus sequence from 2D array
export const getConsensus = (sequencesTranspose) => {
    return sequencesTranspose.map(sequenceTranspose =>
        _(sequenceTranspose)
        .countBy()
        .entries()
        .maxBy('[1]')[0]
    );
}
