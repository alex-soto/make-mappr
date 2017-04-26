import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';

const style = {
    width: '200px',
    margin: '0 10px',
    float: 'left'
}

export class BoardSettings extends Component {
    render() {
        return (
            <div>
                <h3>Settings</h3>
                <SelectField 
                    style={style}
                    floatingLabelText="Tile type"
                    onChange={this.props.selectTileType}
                    >
                    <MenuItem value='square' primaryText="Squares" />
                    <MenuItem value='hexagon' primaryText="Hexagons" />
                </SelectField>
                <Slider 
                    style={style} 
                    step={1} 
                    min={15} 
                    max={50} 
                    defaultValue={20}
                    onChange={this.props.handleRadiusChange}
                />
            </div>    
        );    
    }
}

/*

*/