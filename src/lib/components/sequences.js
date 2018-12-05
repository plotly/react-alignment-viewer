import { fasta, clustal } from 'bio.io';
import _ from 'lodash';

import { getConsensus } from './metrics'


// Import sequence in FASTA/Clustal format
export const importSequences = (inputData, extension) => {
    let sequences;

    if (extension === 'fasta') {
        sequences = fasta.parse(inputData);
    } else if (extension === 'clustal') {
        sequences = clustal.parse(inputData);
    } else {
        sequences = '';
        console.log("Invalid format")
    }

    return sequences;
}


// Get sequence and associated info
export const parseSequences = (sequences, length) => {
    const sequencesArray = [];
    const sequencesInfo = [];

    sequences.forEach(
        (sequence) => {
            // Pad end if sequences not same length
            const sequenceString = _.padEnd(sequence.seq, length, "-");
            const sequenceArray = _.split(sequenceString, '');
            const sequenceInfo = {
                'id': sequence.id,
                'name': sequence.name,
                ...sequence.details,
                ...sequence.ids
            };

            sequencesArray.push(sequenceArray);
            sequencesInfo.push(sequenceInfo);
        }
    );

    return { sequencesArray, sequencesInfo };
}


// Merge sequences w/ consensus sequence
export const mergeSequences = (inputTranspose, inputArray, inputInfo, showconsensus) => {
    let sequencesArray = inputArray;
    let sequencesInfo = inputInfo;

    if (showconsensus) {
        const consensusObj = {
            name: '<b>Consensus</b>',
            en: '<b>Consensus</b>',
            id: `<b>${_.maxBy(inputInfo, "id").id + 1}</b>`,
        };
        const consensus = getConsensus(inputTranspose);
        sequencesArray = [...inputArray, consensus];
        sequencesInfo = [...inputInfo, consensusObj];
    }

    return { sequencesArray, sequencesInfo };
}
