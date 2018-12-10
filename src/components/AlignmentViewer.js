import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import AlignmentChart from './AlignmentChart';
import { DropdownSelect } from './Components';
import { getVisualizations } from './charting';
import { VISUALIZATION_OPTIONS, OVERVIEW_OPTIONS, COLORSCALE_OPTIONS } from './options';


export default class AlignmentViewer extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            overview: { value: 'heatmap', label: 'Heatmap overview' },
            colorscale: { value: 'clustal', label: 'Clustal' },
            visualizations: [
                { value: 'showconservation', label: 'Show conservation weights' },
                { value: 'showgap', label: 'Show gap weights' },
                { value: 'showlabel', label: 'Show labels' },
                { value: 'showid', label: 'Show ID' },
                { value: 'showconsensus', label: 'Show consensus' }
            ],
        }
    }

    handleSelect = (key) => (event) => {
        this.setState({ [key]: event });
    }

    render() {
        const {
            data,
            id,
        } = this.props;
        const { colorscale, overview, visualizations } = this.state;

        // Parse state
        const colorscaleVal = colorscale.value;
        const overviewVal = overview.value;
        const visualizationsVal = visualizations.map(visualization =>
            visualization.value
        );

        const {
            showconservation,
            showgap,
            showlabel,
            showid,
            showconsensus
        } = getVisualizations(visualizationsVal);

        return (
            <div id={id}>
                <div
                    style={{display: 'flex'}}
                >
                    <DropdownSelect
                        outerStyle={{width: '25%'}}
                        caption={'Select colorscale'}
                        value={colorscale}
                        onChange={this.handleSelect('colorscale')}
                        options={COLORSCALE_OPTIONS}
                    />
                    <DropdownSelect
                        outerStyle={{width: '25%'}}
                        caption={'Select overview'}
                        value={overview}
                        onChange={this.handleSelect('overview')}
                        options={OVERVIEW_OPTIONS}
                    />
                    <DropdownSelect
                        outerStyle={{width: '75%'}}
                        caption={'Toggle visualizations'}
                        value={visualizations}
                        onChange={this.handleSelect('visualizations')}
                        options={VISUALIZATION_OPTIONS}
                        isMulti={true}
                    />
                </div>
                <AlignmentChart
                    data={data}
                    colorscale={colorscaleVal}
                    overview={overviewVal}
                    showconservation={showconservation}
                    showgap={showgap}
                    showlabel={showlabel}
                    showid={showid}
                    showconsensus={showconsensus}
                />
            </div>
        );
    }
}
