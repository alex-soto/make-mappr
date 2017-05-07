import React, { Component } from 'react';

// Props: selectedAction
export default class TileManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tiles: [],
            selectedAction: null
        }
        
        this.drawMap = this.drawMap.bind(this);
    }
    
    componentWillMount() {
        if (this.state.tiles.length === 0) {
            this.drawMap();    
        }
        
    }
    
    drawMap() {
        let tiles = [];
        let tileKey = 0;
        let lastColumn = Math.ceil(this.props.width / this.props.tileRadius);
        let lastRow = Math.ceil(this.props.height / this.props.tileRadius);
        console.log(`drawMap() called. lastRow: ${lastRow}, lastColumn: ${lastColumn}`);
        
        for (let i = 1; i <= lastColumn; i++) {
            for (let j = 1; j <= lastRow; j++) {
                tiles.push(
                    <Tile 
                        key={tileKey}
                        tileId={tileKey++}
                        selected={false}
                        x={ (this.props.selectedType === 'square') ?
                            i * this.props.tileRadius * Math.sqrt(2) + this.props.mapOffset :
                            i * this.props.tileRadius * 0.85 + this.props.mapOffset
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
                        onClick={this.props.selectedAction}
                    />
                );
            }
        }
        
        // Return tiles to Board canvas
        this.setState({tiles});
      }
      
    render() {
        return (
            <Group 
                onClick={this.groupClickHandler} 
                // listening={true}
                // draggable={true}
                draggable={ this.props.selectedAction === 'panMap' ? true : false }
                >
                {this.state.tiles}
            </Group>
        );
    }
}