import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { Tile } from '../partials/Tile';

export default class Board extends Component {
    constructor(props){
        super(props);
        this.drawMap = this.drawMap.bind(this);
    }
    
    componentDidMount() {
        // console.log(this.refs);
    }
    
    drawMap() {
        let tiles = [];
        let tileKey = 0;
        for (let i = 0; i < this.props.columns; i++) {
            for (let j = 0; j < this.props.tilesPerColumn; j++) {
                tiles.push(
                    <Tile 
                        key={tileKey++}
                        x={ i * this.props.tileRadius * 1.4 }
                        y={ (this.props.selectedType === 'square') ? 
                            j * this.props.tileRadius * 1.4 :
                            j * this.props.tileRadius + (j % 2 * this.props.tileRadius)
                        }
                        sides={(this.props.selectedType === 'square') ? '4' : '6'}
                        radius={ this.props.tileRadius }
                        rotation={(this.props.selectedType === 'square') ? '45' : '30'}
                        fill={this.props.tileFill}
                        stroke={this.props.tileStroke}
                        strokeWidth={this.props.tileStrokeWidth}
                    />  
                )
            }
        }
        return tiles;
    }
    
    render() {
        return (
            <Stage width={this.props.width} height={this.props.height}>
                <Layer>{this.drawMap()}</Layer>
            </Stage>
        );
    }
}