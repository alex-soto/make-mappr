import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage, Group, Layer } from 'react-konva';
import { C, beginDragSelection, changeMapPosition, changeOffset, endDragSelection, onDragSelection, selectTile } from '../../actions';
import Tile from './Tile';
import Selection from './Selection';

class Board extends Component {
    constructor(props) {
        super(props);
        
        this.handleEvents = this.handleEvents.bind(this);
        this.dragBounds = this.dragBounds.bind(this);
        this.dragSelection = this.dragSelection.bind(this);
        this.setNewOffset = this.setNewOffset.bind(this);
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
    
    dragSelection(pos,evt, c) {
        console.log('dragSelection() called:');
        console.log(pos, evt, c);
    }
    
    handleEvents(evt) {
        // console.log('handleEvents() called');
        // console.log(evt);
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
                    this.props.beginDragSelection({x: evt.evt.layerX, y: evt.evt.layerY});
                } else if (evt.type === 'dragmove') {
                    this.props.onDragSelection({x: evt.evt.layerX, y: evt.evt.layerY});
                } else if (evt.type === 'dragend') {
                    let { start, end } = this.props.selection;
                    let minX = Math.min(start.x, end.x);
                    let minY = Math.min(start.y, end.y);
                    let maxX = Math.max(start.x, end.x);
                    let maxY = Math.max(start.y, end.y);
                    let stage = this.refs.stage.getStage();
                    console.log(stage.find('#selection').hitFunc());
                    let tiles = stage.find('.Tile');
                    
                    tiles.each((tile) => {
                        if ( (tile.attrs.x >= minX && tile.attrs.x <= maxX) &&
                             (tile.attrs.y >= minY && tile.attrs.y <= maxY) && 
                             (!tile.attrs.selected) ) {
                                this.props.selectTile(tile.attrs);
                            }
                    });
                    
                    this.props.endDragSelection();
                }
                break;
            default:
                break;
        }
        
    }
    
    setNewOffset(props = this.props) {
        let newOffset = (props.board.width - (props.board.size * props.tileTemplate.tileRadius)) / 3;
        console.log(`newOffset: ${newOffset}`);
        newOffset = (newOffset > 0) ? newOffset: 0;
        props.changeOffset(newOffset); 
    }
    
    componentWillMount() {
        this.setNewOffset();
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.board.size !== nextProps.board.size) {
            console.log('Board => componentWillReceiveProps() called.');
            console.log(nextProps);
            this.setNewOffset(nextProps);
               
        }
    }
    
    render() {
       return (
            <div>
                <Stage ref="stage" width={this.props.board.width} height={this.props.board.height}>
                    <Layer id="tileLayer">
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
                                            name="Tile"
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
                                         />);
                                }) 
                                
                            }
                        </Group>
                    </Layer>
                    { (this.props.selection.start && this.props.selection.end) && 
                        <Selection
                            id="selection"
                            start={this.props.selection.start}
                            end={this.props.selection.end}
                        />
                        //console.log(`this.props.selection: ${JSON.stringify(this.props.selection)}`)
                        
                    }
                </Stage>
            </div>
        ); 
    }
    
}

const mapStateToProps = (state) => {
  return {
      selection: state.selection
  };  
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeMapPosition: (newPos) => {
            dispatch(changeMapPosition(newPos));
        },
        changeOffset: (newOffset) => {
            dispatch(changeOffset(newOffset));
        },
        selectTile: (tile) => {
            dispatch(selectTile(tile));
        },
        beginDragSelection: (pos) => {
            dispatch(beginDragSelection(pos));
        },
        endDragSelection: () => {
            dispatch(endDragSelection());
        },
        onDragSelection: (pos) => {
            dispatch(onDragSelection(pos));
        }
    };
};

Board = connect(mapStateToProps, mapDispatchToProps)(Board);

export default Board;