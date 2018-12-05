import _ from 'lodash';


// Subplot ratios
export const SUBPLOT_RATIOS = {
            1: 1,
            2: 0.75,
            3: 0.65
};


// Get width
export const getWidth = (inputWidth) => {
    let width;

    if (_.isNumber(inputWidth)) {
        width = inputWidth;
    } else {
        // Only supports % and px for now
        // Need react-sizeme for container support if user chooses half-grid, etc
        if (inputWidth.includes('%')) {
            width = parseFloat(inputWidth)/100 * window.innerWidth;
        } else {
            width = parseFloat(inputWidth);
        }
    }

    return width;
}


// Format hover text
export const getHovertext = (sequencesArray, sequencesInfo) => {
    const formattedTextsArray = [];

    for (let i = 0; i < sequencesArray.length; i++) {
        const formattedTexts = [];

        let position = 0;
        sequencesArray[i].forEach((letter) => {
            position += 1;

            const formattedText = [
                `<b>Name</b>: ${sequencesInfo[i].name}`,
                `<b>Organism</b>: ${sequencesInfo[i].os ? sequencesInfo[i].os: 'N/A'}`,
                `<b>ID</b>: ${sequencesInfo[i].id}<br>`,
                `<b>Position</b>: (${position}, ${i})`,
                `<b>Letter</b>: ${letter}`,
            ].join('<br>');

            formattedTexts.push(formattedText);
        });

        formattedTextsArray.push(formattedTexts);
    }

    return _.flatten(formattedTextsArray);
}


// Get label and tick properties
export const getTicks = (sequencesInfo, showlabel, showid) => {
    const offset = _.toString(_.maxBy(sequencesInfo, "id").id).length;
    let labels, tick;

    if (showlabel && showid) {
        labels = sequencesInfo.map(sequence =>
            sequence.name + "     " + _.padStart(sequence.id, offset, "0")
        );
        tick = '';
    } else if (showlabel) {
        labels = sequencesInfo.map(sequence => sequence.name);
        tick = 'outside';
    } else if (showid) {
        labels = sequencesInfo.map(sequence => sequence.id);
        tick = 'outside';
    } else {
        labels = sequencesInfo.map(() => "");
        tick = '';
    }

    return { labels, tick };
}


// Pasrse visualization settings for AlignmentViewer
export const getVisualizations = (visualizationsVal) => {
    let showconservation = false;
    let showgap = false;
    let showlabel = false;
    let showid = false;
    let showconsensus = false;

    if (_.includes(visualizationsVal, 'showconservation')) {
        showconservation = true;
    }
    if (_.includes(visualizationsVal, 'showgap')) {
        showgap = true;
    }
    if (_.includes(visualizationsVal, 'showlabel')) {
        showlabel = true;
    }
    if (_.includes(visualizationsVal, 'showid')) {
        showid = true;
    }
    if (_.includes(visualizationsVal, 'showconsensus')) {
        showconsensus = true;
    }

    return { showconservation, showgap, showlabel, showid, showconsensus };
}
