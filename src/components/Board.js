import React, { Component } from 'react';
// import IconButton from 'material-ui/IconButton';
// import ActionPanTool from 'material-ui/svg-icons/action/pan-tool';
import { Stage, Group, Layer, Rect } from 'react-konva';
import Tile from '../partials/Tile';


// panMap: move the group containing all tiles
// selectTile: select a specific tile (or tiles) to edit

class Board extends Component {
    constructor(props){
        super(props);
        
        this.drawMap = this.drawMap.bind(this);
        this.dragBounds = this.dragBounds.bind(this);
        this.drawSelectionShape = this.drawSelectionShape.bind(this);
        this.findDraggedTiles = this.findDraggedTiles.bind(this);
        this.catchDeselectedActions = this.catchDeselectedActions.bind(this);
    }
    
    // componentWillMount() {
    //     if (this.props.tiles.length === 0) {
    //         this.props.addTilesToState(this.drawMap());
    //     }
    // }
    
    dragBounds(pos, evt) {
        // console.log(pos, evt);
        if (this.props.selectedAction.name === 'panMap') {
            return { x: pos.x, y: pos.y };
        } else if (this.props.selectedAction.name === 'selectTile' && evt) {
            return { x: this.props.mapPos.x, y: this.props.mapPos.y };
        }
        return pos;
    }
    
    drawSelectionShape(evt){
        console.log('drawSelectionShape:');
        console.log(evt);
        if (evt.type === 'dragstart') {
            return(
                <Rect 
                    ref='selectionBox'
                    x={evt.evt.x}
                    y={evt.evt.y}
                    stroke={"#ddad00"}
                    strokeWidth={1}
                />
                );
        } else if (evt.type === 'dragmove') {
            console.log(this.refs.selectionBox);
        } else if (evt.type === 'dragend') {
            
        }
    }
    
    findDraggedTiles(evt) {
        console.log(evt);
    }
    
    catchDeselectedActions(evt) {
        // This function is just to intercept events that don't match the appropriate action handler
        console.log('catchDeselectedActions:');
        console.log(evt);
        return;
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
                        id={tileKey}
                        selected={(this.props.selectedTiles.indexOf(tileKey) >= 0)}
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
                    />
                );
                tileKey++;
            }
        }
        
        // Return tiles to Board canvas
        return tiles;
      }
    
    render() {
        return (
            <div>
                <Stage ref="stage" width={this.props.width} height={this.props.height}>
                    <Layer
                        // listening={(this.props.selectedAction.name === 'selectTile')}
                        // onDragStart={this.drawSelectionShape}
                        // onDragMove={this.drawSelectionShape}
                    >
                        <Group 
                            x={this.props.mapPos.x}
                            y={this.props.mapPos.y}
                            onClick={ (this.props.selectedAction.name === 'selectTile') ?
                                    this.props.selectedAction.actionHandler :
                                    this.catchDeselectedActions }
                            onDragStart={ (this.props.selectedAction.name === 'selectTile') ? 
                                        this.findDraggedTiles :
                                        this.catchDeselectedActions }
                            // onDragMove={ (this.props.selectedAction.name === 'selectTile') ? 
                            //             this.findDraggedTiles :
                            //             this.catchDeselectedActions }
                            onDragEnd={ (this.props.selectedAction.name === 'panMap' ||
                                         this.props.selectedAction.name === 'selectTile') ?
                                            this.props.selectedAction.actionHandler :
                                            this.catchDeselectedActions
                            }
                            dragBoundFunc={ this.dragBounds }
                            draggable={true}
                            // draggable={ this.props.selectedAction.name === 'panMap' ? true : false }
                        >
                            { 
                                this.props.tiles.map(t => {
                                    return(<Tile { ...t } />)
                                }) 
                                
                            }
                        </Group>
                    </Layer>
                </Stage>
            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tileTemplate: state.tileTemplate
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addTiles: () => {
            ownProps.tile
        }
    }
    
}

/*

<Group 
                            x={this.props.mapPos.x}
                            y={this.props.mapPos.y}
                            onClick={ (this.props.selectedAction.name === 'selectTile') ?
                                    (evt)=>this.props.selectedAction.actionHandler(evt.target) :
                                    this.catchDeselectedActions }
                            onDragStart={this.catchDeselectedActions}
                            // onDragMove={ (this.props.selectedAction.name === 'selectTile') ? 
                            //             this.findDraggedTiles :
                            //             this.catchDeselectedActions }
                            onDragEnd={ (this.props.selectedAction.name === 'panMap') ?
                                            this.props.selectedAction.actionHandler :
                                            this.catchDeselectedActions
                            }
                            dragBoundFunc={ this.dragBounds }
                            draggable={true}
                            // draggable={ this.props.selectedAction.name === 'panMap' ? true : false }
                        >
                            { 
                                this.props.tiles.map(t => {
                                    return(<Tile { ...t } />)
                                }) 
                                
                            }
                        </Group>

//////

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
                        id={tileKey}
                        selected={(this.props.selectedTiles.indexOf(tileKey) >= 0)}
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
                    />
                );
                tileKey++;
            }
        }
        
        // Return tiles to Board canvas
        return tiles;
      }
      
////

<Group 
                            x={this.props.mapPos.x}
                            y={this.props.mapPos.y}
                            { (this.props.selectedAction.name === 'selectTile') &&
                                onClick={  this.props.selectedAction.actionHandler }    
                            }
                            
                            onDragEnd={ this.props.selectedAction.name === 'panMap' && this.props.selectedAction.actionHandler }
                            dragBoundFunc={ this.dragBounds }
                            draggable={true}
                            // draggable={ this.props.selectedAction.name === 'panMap' ? true : false }
                        >
                            {this.drawMap()}
                        </Group>


*/