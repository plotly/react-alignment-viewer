import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import Plot from 'react-plotly.js';

import { importSequences, parseSequences, mergeSequences } from './sequences';
import { getEntropy, getConservation } from './metrics'
import { getWidth, getHovertext, getTicks, SUBPLOT_RATIOS } from './charting';
import { getColorscale } from './colormaker';


export default class AlignmentChart extends PureComponent {

    // Fetch data
    getData() {
        const {
            data: inputData,
            extension,
            colorscale: inputColorscale,
            opacity: inputOpacity,
            textcolor: inputTextColor,
            textsize,
            showlabel,
            showid,
            showconservation,
            conservationcolor,
            conservationcolorscale,
            conservationopacity,
            conservationmethod,
            correctgap,
            showgap,
            gapcolor,
            gapcolorscale,
            gapopacity,
            groupbars,
            showconsensus
        } = this.props;

        // Import sequence in FASTA/Clustal format
        const sequences = importSequences(inputData, extension);

        // Fill sequence gaps if any
        const length = _.maxBy(sequences, (sequence => sequence.seq.length)).seq.length;
        let { sequencesArray, sequencesInfo } = parseSequences(sequences, length);

        const sequencesTranspose = _.zip(...sequencesArray);
        const preCount = sequencesInfo.length;

        // Make consensus sequence
        ({ sequencesArray, sequencesInfo } = mergeSequences(sequencesTranspose, sequencesArray, sequencesInfo, showconsensus));
        const count = sequencesInfo.length;

        // TODO export to main plot

        // Get colorscale
        const { colormap, colorscale, textcolor, opacity } = getColorscale(inputColorscale, inputTextColor, inputOpacity);

        // Get heatmap z, and annotations x, y, text, hoverText
        const z = sequencesArray.map(sequenceText =>
            sequenceText.map(letter => colormap[letter] || 1)
        );

        const x = _.range(length * count).map((i) => i % length);
        const y = _.range(length * count).map((i) => _.floor(i / length));
        const text = _.flatten(sequencesArray);

        const hoverText = getHovertext(sequencesArray, sequencesInfo);

        // Get labels, tick
        const { labels, tick } = getTicks(sequencesInfo, showlabel, showid);

        // return { sequencesInfo, sequencesArray };

        // TODO export to secondary plots
        // Make conservation and gap bars
        let conservationBars = false;
        let gapBars = false;
        let maxEntropy = 0;

        if (showconservation)  {
            conservationBars = sequencesTranspose.map((sequenceTranspose) => {
                let val;

                if (conservationmethod === 'entropy') {
                    val = getEntropy(sequenceTranspose);
                    if (val > maxEntropy) {
                        maxEntropy = val;
                    }
                }  else {
                    val = getConservation(sequenceTranspose);
                }

                return val;
            });

            if (conservationmethod === 'entropy') {
                conservationBars = conservationBars.map(conservationBar => (1 - conservationBar/maxEntropy));
            } else {
                conservationBars = conservationBars.map(conservationBar => conservationBar/preCount);
            }
        }

        if (showgap) {
            gapBars = sequencesTranspose.map(sequenceTranspose =>
                _.countBy(sequenceTranspose)['-']/preCount
            );
        }

        if (correctgap) {
            for (let i = 0; i < conservationBars.length; i++) {
                conservationBars[i] = conservationBars[i] * (1 - (gapBars[i] ? gapBars[i] : 0));
            }
        }

        // Get data
        const data = [
            // Heatmap
            {
                type: 'heatmap',
                name: 'Heatmap',
                z: z,
                hoverinfo: 'none',
                colorscale: colorscale,
                opacity: opacity,
                showscale: false,
            },
            // Heatmap annotations
            {
                type: 'scattergl',
                name: 'Text',
                mode: 'text',
                x: x,
                y: y,
                text: text,
                hoverinfo: 'none',
                textfont: {
                    color: textcolor,
                    size: textsize
                },
            },
            // Hoverinfo label (hacky)
            {
                type: 'scatter',
                name: 'Annotations',
                x: x,
                y: y,
                marker: {
                    color: 'transparent'
                },
                text: hoverText,
                hoverinfo: 'text+name',
                textfont: {
                    color: textcolor,
                    size: textsize
                },
            },
        ];

        // Append secondary plots
        let plotCount = 1;

        // Conservation
        if (conservationBars) {
            plotCount += 1;
            const dataArr = {
                type: 'bar',
                name: 'Conservation',
                x: _.range(length),
                y: conservationBars,
                marker: {
                    color: conservationcolor,
                    opacity: conservationopacity
                },
                yaxis: `y${plotCount}`,
            }
            if (conservationcolorscale) {
                dataArr.marker.color = conservationBars;
                dataArr.marker.colorscale = conservationcolorscale;
                dataArr.marker.reversescale = true;
            }
            data.push(dataArr);
        }

        // Gap
        if (gapBars) {
            if (groupbars === false) {
                plotCount += 1;
            }
            const dataArr = {
                type: 'bar',
                name: 'Gap',
                x: _.range(length),
                y: gapBars,
                marker: {
                    color: gapcolor,
                    opacity: gapopacity
                },
                yaxis: `y${plotCount}`,
            }
            if (gapcolorscale) {
                dataArr.marker.color = gapBars;
                dataArr.marker.colorscale = gapcolorscale;
                dataArr.marker.reversescale = true;
            }
            data.push(dataArr);
        }

        return { data, length, count, labels, tick, plotCount };
    };

    // Fetch layout
    getLayout({ length, count, labels, tick, plotCount }) {
        const {
            tilewidth,
            tileheight,
            numtiles: inputNumtiles,
            overview,
            scrollskip: inputScrollskip,
            tickstart,
            ticksteps,
            width: inputWidth,
            height: inputHeight,
        } = this.props;
        // const { xStart, xEnd } = this.state;

        // Get sizing
        let width, pixelWidth, height;

        // Width
        if (inputWidth) {
            width = inputWidth;
            pixelWidth = getWidth(inputWidth);
        } else if (tilewidth && inputNumtiles) {
            width = _.toInteger(tilewidth) * _.toInteger(inputNumtiles);
            pixelWidth = width;
        } else {
            width = '100%';
            pixelWidth = getWidth(width);
        }

        // Height
        if (inputHeight) {
            height = inputHeight;
        } else if (tileheight) {
            // Adjust for subplots
            const ratio = SUBPLOT_RATIOS[plotCount] * ((overview === 'heatmap' || overview === 'bar') ? 0.85 : 1);
            height = _.toInteger(_.toInteger(tileheight) * count / ratio) + 50;
        } else {
            height = '100%';
        }

        // Number of horizontal tiles
        let numtiles;
        if (inputNumtiles) {
            numtiles = inputNumtiles;
        } else if (tilewidth) {
            numtiles = _.toInteger(pixelWidth / tilewidth);
        } else {
            numtiles = 50;
        }

        const initialRange = [-0.5, numtiles + 0.5];

        // Get slider
        let steps;
        if (overview === 'slider') {
            const scrollskip = inputScrollskip ? inputScrollskip : 1;
            const possibleSteps = _.range(length);
            steps = _(possibleSteps)
                .filter((i) => i % _.toInteger(scrollskip) === 0)
                .map((j) =>
                    ({
                        'method': 'relayout',
                        'label': j,
                        'args': ['xaxis', {'range': [-0.5 + j, numtiles + 0.5 + j]}],
                    })
                )
                .value();
        }

        // Get layout
        const layout =  {
            hovermode: 'closest',
            showlegend: false,
            xaxis: {
                showgrid: false,
                zeroline: false,
                range: initialRange,
                automargin: true
            },
            yaxis: {
                ticks: tick,
                ticktext: labels,
                tickvals: _.range(labels.length),
                showgrid: false,
                zeroline: false,
                autorange: 'reversed',
                automargin: true
            },
            yaxis2: {
                showgrid: false,
                zeroline: false,
                domain: [0.75, 1]
            },
            margin: { t: 20, r: 20 },
        };

        // Append secondary plots
        if (plotCount === 2) {
            layout.yaxis.domain = [0.0, 0.74];
            layout.yaxis2 = {
                title: '<b>Bar weights</b>',
                titlefont: {size: 12},
                showgrid: false,
                zeroline: false,
                domain: [0.75, 1]
            };
        } else if (plotCount === 3) {
            layout.yaxis.domain = [0.0, 0.64];
            layout.yaxis2 = {
                title: '<b>Conservation</b>',
                titlefont: {size: 12},
                showgrid: false,
                zeroline: false,
                domain: [0.65, 0.89]
            };
            layout.yaxis3 = {
                title: '<b>Gap</b>',
                titlefont: {size: 12},
                showgrid: false,
                zeroline: false,
                domain: [0.90, 1]
            };
        } else {
            layout.yaxis.domain = [0.0, 1.0];
        }

        // Get overview plot
        if (overview === 'heatmap') {
            layout.xaxis.rangeslider = { autorange: true };
            layout.xaxis.tick0 = tickstart;
            layout.xaxis.dtick = ticksteps;
            layout.margin = { t: 20, r: 20, b: 20 };
        } else if (overview === 'slider') {
            layout.sliders = [{
                // Wrap in bold hack
                currentvalue: {"prefix": "<b>Position </b><b>", "suffix": "</b>"},
                steps: steps
            }];
        } else {
            layout.xaxis.tick0 = tickstart;
            layout.xaxis.dtick = ticksteps;
            layout.margin = { t: 20, r: 20, b: 20 };
        }

        return { layout, width, height };
    };

    // Main
    render() {
        const { id } = this.props;

        const { data, length, count, labels, tick, plotCount } = this.getData();
        const { layout, width, height } = this.getLayout({ length, count, labels, tick, plotCount });

        const other = {
            style: {
                width: width,
                height: height
            },
            useResizeHandler: true
        };

        return (
            <div id={id}>
                <Plot
                    data={data}
                    layout={layout}
                    // onClick={this.handleChange}
                    // onHover={this.handleChange}
                    // onRelayout={this.handleChange}
                    {...other}
                />
            </div>
        );
    }
}


AlignmentChart.propTypes = {

    /*
    The ID of this component, used to identify dash components
    in callbacks. The ID needs to be unique across all of the
    components in an app.
    */
    id: PropTypes.string,

    /*
    Input data, either in FASTA or Clustal format.
    */
    data: PropTypes.string,

    /*
    Format type of the input data, either in FASTA or Clustal.
    */
    extension: PropTypes.string,

    /*
    Colorscale in 'buried', 'cinema', 'clustal', 'clustal2', 'helix', 'hydrophobicity'
    'lesk', 'mae', 'nucleotide', 'purine', 'strand', 'taylor', 'turn', 'zappo',
    or your own colorscale as a {'nucleotide': COLOR} dict.
    Note that this is NOT a standard plotly colorscale.
    */
    colorscale: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),

    /*
    Opacity of the main plot as a value between 0 and 1.
    */
    opacity: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),

    /*
    Color of the nucleotide labels, in common name, hex, rgb or rgba format.
    If left blank, handled by the colorscale automatically.
    */
    textcolor: PropTypes.string,

    /*
    Size of the nucleotide labels, as a number.
    */
    textsize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),

    /*
    Toggles displaying sequence labels at left of alignment
    */
    showlabel: PropTypes.bool,

    /*
    Toggles displaying sequence IDs at left of alignment.
    */
    showid: PropTypes.bool,

    /*
    Enables the display of conservation secondary barplot where the most conserved
    nucleotides or amino acids get greater bars.
    */
    showconservation: PropTypes.bool,

    /*
    Color of the conservation secondary barplot, in common name, hex, rgb or rgba format.
    */
    conservationcolor: PropTypes.string,

    /*
    Colorscale of the conservation barplot, in Plotly colorscales (e.g. 'Viridis')
    or as custom Plotly colorscale under a list format.
    Note that this conservationcolorscale argument
    does NOT follow the same format as the colorscale argument.
    */
    conservationcolorscale: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),

    /*
    Opacity of the conservation secondary barplot as a value between 0 and 1.
    */
    conservationopacity: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),

    /*
    Whether to use most conserved ratio (MLE) 'conservation'
    or normalized entropy 'entropy' to determine conservation,
    which is a value between 0 and 1 where 1 is most conserved.
    */
    conservationmethod: PropTypes.oneOf(['conservation', 'opacity']),

    /*
    Whether to normalize the conservation barchart
    By multiplying it elementwise with the gap barchart, as to
    lower the conservation values across sequences regions with many gaps.
    */
    correctgap: PropTypes.bool,

    /*
    Enables the display of gap secondary barplot where the sequence regions
    with the fewest gaps get the greatest bars.
    */
    showgap: PropTypes.bool,

    /*
    Color of the gap secondary barplot, in common name, hex, rgb or rgba format.
    */
    gapcolor: PropTypes.string,

    /*
    Colorscale of the gap barplot, in Plotly colorscales (e.g. 'Viridis')
    or as custom Plotly colorscale under a list format.
    Note that this conservationcolorscale argument
    does NOT follow the same format as the colorscale argument.
    */
    gapcolorscale: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),

    /*
    Opacity of the gap secondary barplot as a value between 0 and 1.
    */
    gapopacity: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),

    /*
    If both conservation and gap are enabled,
    toggles whether to group bars or to stack them as separate subplots.
    No effect if not both gap and conservation are shown.
    */
    groupbars: PropTypes.bool,

    /*
    Displays toggling the consensus sequence, where each nucleotide in the
    consensus sequence is the argmax of its distribution at a set nucleotide.
    */
    showconsensus: PropTypes.bool,

    /*
    Sets how many pixels each nucleotide/amino acid on the Alignment Viewer
    takes up horizontally. The total number of tiles (numtiles) seen
    horizontally is automatically determined by rounding
    the Viewer width divided by the tile width.
    */
    tilewidth: PropTypes.number,

    /*
    Sets how many pixels each nucleotide/amino acid on the Alignment Viewer
    takes up vertically.
    If enabled, set height dynamically.
    */
    tileheight: PropTypes.number,

    /*
    Toggles whether the overview should be a heatmap, a slider, or none.
    */
    overview: PropTypes.oneOf(['heatmap', 'slider', 'none']),

    /*
    Sets how many tiles to display across horitontally. If enabled,
    overrides tilewidth and sets the amount of tiles directly based off
    that value.
    */
    numtiles: PropTypes.number,

    /*
    If overview is set to 'slider', determines how many tiles to skip
    with each slider movement.
    Has no effect if scroll is not enabled (such as with overview or none).
    */
    scrollskip: PropTypes.number,

    /*
    Determines where to start annotating the first tile.
    If let blank will be automatically determined by Plotly.
    Equivalent to Plotly's tick0 property.
    Does not function if overview mode 'slider' is applied. (Current bug)
    */
    tickstart: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),

    /*
    Determines at what interval to keep annotating the tiles.
    If left blank will be automatially determined by Plotly.
    Equivalent to Plotly's dtick property.
    Does not function if overview mode 'slider' is applied. (Current bug)
    */
    ticksteps: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),

    /*
    Width of the Viewer.
    Property takes precedence over tileswidth and numtiles
    if either of them is set.
    */
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),

    /*
    Width of the Viewer.
    Property takes precedence over tilesheight if both
    are set.
    */
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
};


AlignmentChart.defaultProps = {
    // Data
    extension: 'fasta',
    colorscale: 'clustal2',
    opacity: null,
    textcolor: null,
    textsize: 10,
    showlabel: true,
    showid: true,
    showconservation: true,
    conservationcolor: null,
    conservationcolorscale: 'Viridis',
    conservationopacity: null,
    conservationmethod: 'entropy',
    correctgap: true,
    showgap: true,
    gapcolor: 'grey',
    gapcolorscale: null,
    gapopacity: null,
    groupbars: false,
    showconsensus: true,
    // Layout
    tilewidth: 16,
    tileheight: 16,
    numtiles: null,
    overview: 'heatmap',
    scrollskip: 10,
    tickstart: null,
    ticksteps: null,
    // Other
    width: null,
    height: 900
};
