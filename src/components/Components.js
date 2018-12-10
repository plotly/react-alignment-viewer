import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Select, { Creatable } from 'react-select';


export const Caption = (props) => {
    return (
        <div style={{marginTop: -8, marginBottom: -8}}>
            <p style={{fontSize: 12, fontColor: '#444444'}}>
                {props.children}
            </p>
        </div>
    );
}


export const DropdownSelect = (props) => {
    const { caption, isCreatable, outerStyle, ...propsRest } = props;

    return (
        <div style={outerStyle}>
            {caption && <Caption>{caption}</Caption>
            }
            {!caption && <Caption>&nbsp;</Caption>
            }
            {isCreatable &&
                <Creatable allowCreate={true} {...propsRest}>
                </Creatable>
            }
            {!isCreatable &&
                <Select {...propsRest}>
                </Select>
            }
        </div>
    );
}
