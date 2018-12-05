import _ from 'lodash';

import Buried from "./colorscales/buried";
import Cinema from "./colorscales/cinema";
import Clustal from "./colorscales/clustal";
import Clustal2 from "./colorscales/clustal2";
import Helix from "./colorscales/helix";
import Hydrophobicity from "./colorscales/hydrophobicity";
import Lesk from "./colorscales/lesk";
import Mae from "./colorscales/mae";
import Nucleotide from "./colorscales/nucleotide";
import Purine from "./colorscales/purine";
import Strand from "./colorscales/strand";
import Taylor from "./colorscales/taylor";
import Turn from "./colorscales/turn";
import Zappo from "./colorscales/zappo";


const ALL_COLORSCALES = {
  buried: Buried,
  buried_index: Buried,
  cinema: Cinema,
  clustal2: Clustal2,
  clustal: Clustal,
  helix: Helix,
  helix_propensity: Helix,
  hydro: Hydrophobicity,
  hydrophobicity: Hydrophobicity,
  lesk: Lesk,
  mae: Mae,
  nucleotide: Nucleotide,
  purine: Purine,
  purine_pyrimidine: Purine,
  strand: Strand,
  strand_propensity: Strand,
  taylor: Taylor,
  turn: Turn,
  turn_propensity: Turn,
  zappo: Zappo
};

const DARK_COLORSCALES = [
    'buried',
    'buried_index',
    'helix',
    'helix_propensity',
    'hydro',
    'hydrophobicity',
    'strand',
    'strand_propensity',
    'turn',
    'turn_propensity'
];


const convertColorscale = (inputColorscale) => {

    // Add filler white for blanks
    if (!(inputColorscale['-'])) {
        inputColorscale['-'] = '#ffffff';
    }

    // Increment based on number of keys in colorscale
    const length = _.size(inputColorscale);
    const increment = 1/length;

    let offset = 0;
    const safety = 0.005;
    const colormap = {};
    const colorscale = [];

    _.forEach(inputColorscale,
        ((val, key) => {
            // Pre-increment
            colormap[key] = offset + safety;
            colorscale.push([offset, val])
            // Increment
            offset += increment;
            // Post-increment
            colorscale.push([offset, val])
        })
    )

    // To remove floating point error
    colorscale[colorscale.length - 1][0] = 1;

    return { colormap, colorscale };
}


// Return colorscale and other params for given input string/object
export const getColorscale = (inputColorscale, inputTextcolor=false, inputOpacity=false) => {

    let chosenColorscale, textcolor, opacity;

    if (_.isString(inputColorscale)) {
        // Default colorscale
        chosenColorscale = ALL_COLORSCALES[inputColorscale] || Taylor;

        if (DARK_COLORSCALES.includes(inputColorscale)) {
            textcolor = '#ffffff';
            opacity = 1;
        } else {
            textcolor = '#444444';
            opacity = 0.75;
        }
    } else {
        // Custom colorscale
        chosenColorscale = inputColorscale;
        textcolor = '#ffffff';
        opacity = 1;
    }

    // Custom overrride
    if (inputTextcolor) {
        textcolor = inputTextcolor;
    }
    if (inputOpacity) {
        opacity = inputOpacity;
    }

    const { colormap, colorscale } = convertColorscale(chosenColorscale);

    return { colormap, colorscale, textcolor, opacity };
}
