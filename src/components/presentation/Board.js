import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage, Group, Layer } from 'react-konva';
import { C, changeMapPosition, selectTile } from '../../actions';
import Tile from './Tile';

class Board extends Component {
    constructor(props) {
        super(props);
        
        this.handleEvents = this.handleEvents.bind(this);
        this.dragBounds = this.dragBounds.bind(this);
    }
    
    dragBounds(pos, evt) {
        // console.log(pos, evt);
        if (this.props.board.selectedAction === C.ACTIONS.PAN_MAP) {
            return { x: pos.x, y: pos.y };
        // } else if (this.props.selectedAction.name === 'selectTile' && evt) {
        } else if (evt) {
            return { x: this.props.board.position.x, y: this.props.board.position.y };
        }
        return pos;
    }
    
    handleEvents(evt) {
        console.log('handleEvents() called');
        console.log(evt);
        // PAN_MAP
        switch (this.props.board.selectedAction) {
            case C.ACTIONS.PAN_MAP:
                if (evt.type === 'dragend') {
                    let newPos = {x: evt.target.attrs.x, y: evt.target.attrs.y };
                    this.props.changeMapPosition(newPos);
                }
                break;
            case C.ACTIONS.SELECT_TILES:
                if (evt.type === 'click') {
                    this.props.selectTile(evt.target.attrs);
                } else if (evt.type === 'dragstart') {
                    // TODO: implement functionality to create a draggable selection cursor
                    console.log('dragstart');
                } else if (evt.type === 'dragend') {
                    // TODO: implement functionality to find all tiles within selection cursor area
                    console.log('dragend');
                }
                break;
            default:
                break;
        }
        
        // SELECT_TILES
    }
    
    render() {
       return (
            <div>
                <Stage width={this.props.board.width} height={this.props.board.height}>
                    <Layer>
                        <Group 
                            x={this.props.board.position.x}
                            y={this.props.board.position.y}
                            onClick={this.handleEvents}
                            onDragStart={this.handleEvents}
                            onDragMove={this.handleEvents}
                            onDragEnd={this.handleEvents}
                            // dragBoundFunc={ this.handleEvents }
                            // onClick={ (this.props.selectedAction.name === 'selectTile') ?
                            //         this.props.selectedAction.actionHandler :
                            //         this.catchDeselectedActions }
                            // onDragStart={ (this.props.selectedAction.name === 'selectTile') ? 
                            //             this.findDraggedTiles :
                            //             this.catchDeselectedActions }
                            // // onDragMove={ (this.props.selectedAction.name === 'selectTile') ? 
                            // //             this.findDraggedTiles :
                            // //             this.catchDeselectedActions }
                            // onDragEnd={ (this.props.selectedAction.name === 'panMap' ||
                            //              this.props.selectedAction.name === 'selectTile') ?
                            //                 this.props.selectedAction.actionHandler :
                            //                 this.catchDeselectedActions
                            // }
                            dragBoundFunc={ this.dragBounds }
                            draggable={true}
                            // draggable={this.props.board.selectedAction === C.ACTIONS.PAN_MAP}
                        >
                            { 
                                this.props.tiles.map(t => {
                                    
                                    return(
                                        <Tile { 
                                            ...t 
                                        }
                                            x={
                                                (this.props.tileTemplate.selectedType === 'square') ?
                                                t.column * this.props.tileTemplate.tileRadius * Math.sqrt(2) + this.props.board.offset :
                                                t.column * this.props.tileTemplate.tileRadius * 0.85 + this.props.board.offset
                                            }
                                            y={
                                                (this.props.tileTemplate.selectedType === 'square') ? 
                                                t.row * this.props.tileTemplate.tileRadius * Math.sqrt(2) :
                                                t.row * this.props.tileTemplate.tileRadius * 3 - (t.column % 2 * this.props.tileTemplate.tileRadius * 1.5)
                                            }
                                            sides={(this.props.tileTemplate.selectedType === 'square') ? '4' : '6'}
                                            radius={this.props.tileTemplate.tileRadius}
                                            rotation={(this.props.tileTemplate.selectedType === 'square') ? '45' : '0'}
                                            fill={this.props.tileTemplate.tileFill}
                                            stroke={this.props.tileTemplate.tileStroke}
                                            strokeWidth={this.props.tileTemplate.tileStrokeWidth}
                                         />)
                                }) 
                                
                            }
                        </Group>
                    </Layer>
                </Stage>
            </div>
        ); 
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMapPosition: (newPos) => {
            dispatch(changeMapPosition(newPos))
        },
        selectTile: (tile) => {
            dispatch(selectTile(tile));
        }
    };
};

Board = connect(null, mapDispatchToProps)(Board);

export default Board;