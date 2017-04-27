import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { Tile } from '../partials/Tile';

const mapOffset = 12;

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
        let lastColumn = Math.ceil(this.props.width / this.props.tileRadius);
        let lastRow = Math.ceil(this.props.height / this.props.tileRadius);
        
        for (let i = 1; i <= lastColumn; i++) {
            for (let j = 1; j <= lastRow; j++) {
                
                tiles.push(
                    <Tile 
                        key={tileKey++}
                        x={ (this.props.selectedType === 'square') ?
                            i * this.props.tileRadius * Math.sqrt(2) + mapOffset :
                            i * this.props.tileRadius * 0.85 + mapOffset
                        }
                        y={ (this.props.selectedType === 'square') ? 
                            j * this.props.tileRadius * Math.sqrt(2) :
                            j * this.props.tileRadius * 3 - (i % 2 * this.props.tileRadius * 1.5)
                            // j * this.props.tileRadius + (i % 2 * this.props.tileRadius)
                        }
                        sides={(this.props.selectedType === 'square') ? '4' : '6'}
                        radius={ this.props.tileRadius }
                        rotation={(this.props.selectedType === 'square') ? '45' : '0'}
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
            <Stage ref="stage" width={this.props.width} height={this.props.height}>
                <Layer>{this.drawMap()}</Layer>
            </Stage>
        );
    }
}

/*
// Works for squares:

drawMap() {
        let tiles = [];
        let tileKey = 0;
        let lastColumn = Math.ceil(this.props.width / this.props.tileRadius);
        let lastRow = Math.ceil(this.props.height / this.props.tileRadius);
        
        for (let i = 0; i <= lastColumn; i++) {
            for (let j = 0; j <= lastRow; j++) {
                tiles.push(
                    <Tile 
                        key={tileKey++}
                        x={ (this.props.selectedType === 'square') ?
                            i * this.props.tileRadius * Math.sqrt(2) :
                            i * this.props.tileRadius * 2
                        }
                        y={ (this.props.selectedType === 'square') ? 
                            j * this.props.tileRadius * Math.sqrt(2) :
                            j * this.props.tileRadius
                            // j * this.props.tileRadius + (i % 2 * this.props.tileRadius)
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

*/