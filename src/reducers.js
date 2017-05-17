import { combineReducers } from 'redux';
import { C } from './actions';

export const initialState = {
    // state pertaining to board component
    board: {
        width: 1024,
        height: 768,
        offset: 12,
        columns: 30,
        rows: 20,
        position: {
            x: 0,
            y: 0
        },
        selectedAction: C.ACTIONS.PAN_MAP,
    },
    // state pertaining to all tiles
    tileTemplate: {
        selectedType: null,
        tileTypes: ['square','hexagon'],
        tileRadius: 20,
        tileRotation: 0,
        tileFill: '#FFFFFF',
        tileStroke: 'grey',
        tileStrokeWidth: 0.5,    
    },
    // selection box
    selection: {
        start: null,
        end: null
    },
    // array of instantiated tiles
    tiles: []
    // ,
    // selectedTiles: []
};

/*
ADD_TILES: "ADD_TILES",
SELECT_TILE_TYPE: "SELECT_TILE_TYPE",
CHANGE_DIMENSIONS: "CHANGE_DIMENSIONS",
CHANGE_MAP_POSITION: "CHANGE_MAP_POSITION",
CHANGE_TILE_RADIUS: "CHANGE_TILE_RADIUS",
SELECT_ACTION: "SELECT_ACTION",
SELECT_TILE: "SELECT_TILE"
*/

function board(state = {}, action) {
    switch (action.type) {
        case C.CHANGE_DIMENSIONS:
            console.log('changeDimensions() => action:');
            console.log(action);
            return {
                ...state,
                width: action.payload.width,
                height: action.payload.height
            }
        case C.CHANGE_MAP_POSITION:
            return {
                ...state,
                position: action.payload
            }
        case C.SELECT_ACTION:
            console.log('selectAction() => action:');
            console.log(action);
            return {
                ...state,
                selectedAction: action.payload
            }
        default:
            return state;
    }
}

function tileTemplate(state = {}, action) {
    switch (action.type) {
        case C.SELECT_TILE_TYPE:
            return {
                ...state,
                selectedType: action.payload
            }
        case C.CHANGE_TILE_RADIUS:
            return {
                ...state,
                tileRadius: action.payload
            };
        default:
            return state;
    }
}

function selection(state = {}, action) {
    switch (action.type) {
        case C.BEGIN_DRAG_SELECTION:
            console.log('beginDragSelection:');
            console.log(`x: ${action.payload.x}, y: ${action.payload.y}`);
            let startPos = {x: action.payload.x, y: action.payload.y};
            return {
                ...state,
                start: startPos
            };
        case C.ON_DRAG_SELECTION:
            console.log('onDragSelection:');
            let currentPos = {x: action.payload.x, y: action.payload.y};
            return {
                ...state,
                end: currentPos
            };
        case C.END_DRAG_SELECTION:
            console.log('endDragSelection:');
            // console.log(`start: ${JSON.stringify(start)}, end: ${JSON.stringify(end)}`);
            return { start: null, end: null };
        default: 
            return state;
    }
}

function tiles(state = [], action) {
    switch (action.type) {
        case C.ADD_TILES:
            let newTile = action.payload;
            return [
                ...state,
                newTile
            ];
        case C.SELECT_TILE:
            console.log('C.SELECT_TILE => action:');
            console.log(action);
            return state.map(tile => {
                if (tile.id !== action.payload.id) {
                    return tile;
                } else {
                    return {
                        ...tile,
                        selected: !tile.selected
                    }
                }
            })
        default:
            return state;
    }
}

const mapprApp = combineReducers({
    board,
    tileTemplate,
    selection,
    tiles
});

export default mapprApp;

// (state = initialState, action) {
//     return {
//         board: board(state.board, action),
//         tileTemplate: tileTemplate(state.tileTemplate, action),
//         tiles: tiles(state.tiles, action)
//     }
// }