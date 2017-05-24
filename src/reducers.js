import { combineReducers } from 'redux';
import { C } from './actions';

export const initialState = {
    // state pertaining to board component
    board: {
        width: 1024,
        height: 768,
        offset: 12,
        columns: 0,
        rows: 0,
        size: 15,
        position: {
            x: 0,
            y: 0
        },
        selectedAction: C.ACTIONS.PAN_MAP,
        activePopover: null
    },
    // state unique to user
    user: {
        colorPalette: ['#62757F'],
        selectedColor: '#62757F',
        activeDialog: null,
        validInput: false,
        input: ''
    },
    // state pertaining to all tiles
    tileTemplate: {
        selectedType: 'square',
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

function board(state = {}, action) {
    switch (action.type) {
        case C.CHANGE_BOARD_SIZE:
            return {
                ...state,
                height: action.payload,
                width: action.payload
            }
        case C.CHANGE_DIMENSIONS:
            // console.log('changeDimensions() => action:');
            // console.log(action);
            return {
                ...state,
                rows: action.payload,
                columns: action.payload,
                size: action.payload
            };
        case C.CHANGE_MAP_POSITION:
            return {
                ...state,
                position: action.payload
            };
        case C.CHANGE_OFFSET:
            return {
                ...state,
                offset: action.payload
            };
        case C.SELECT_ACTION:
            // console.log('selectAction() => action:');
            // console.log(action);
            return {
                ...state,
                selectedAction: action.payload
            };
        default:
            return state;
    }
}

function user(state = {}, action) {
    switch (action.type) {
        case C.USER.COLORS.ADD_NEW_COLOR:
            let palette = state.colorPalette.slice();
            palette.push(action.payload);
            return {
                ...state,
                colorPalette: palette
            };
        case C.USER.COLORS.SELECT_COLOR:
            return {
                ...state,
                selectedColor: action.payload
            };
        case C.USER.ACTIONS.CLOSE_DIALOGS:
            return {
                ...state,
                activeDialog: null
            };
        case C.USER.ACTIONS.PICK_NEW_COLOR:
            return {
                ...state,
                activeDialog: "pickNewColor"
            };
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
            };
        case C.CHANGE_TILE_RADIUS:
            // console.log(action);
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
            // console.log('beginDragSelection:');
            // console.log(`x: ${action.payload.x}, y: ${action.payload.y}`);
            let startPos = {x: action.payload.x, y: action.payload.y};
            return {
                ...state,
                start: startPos
            };
        case C.ON_DRAG_SELECTION:
            // console.log('onDragSelection:');
            let currentPos = {x: action.payload.x, y: action.payload.y};
            return {
                ...state,
                end: currentPos
            };
        case C.END_DRAG_SELECTION:
            // console.log('endDragSelection:');
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
        case C.CHANGE_TILE_COLOR:
            return state.map(tile => {
                if (tile.id !== action.payload.tile.id) {
                    return tile;
                } else {
                    return {
                        ...tile,
                        fill: action.payload.color
                    };
                }
            });
        case C.DELETE_TILES:
            return state.slice(0, action.payload);
        case C.SELECT_TILE:
            // console.log('C.SELECT_TILE => action:');
            // console.log(action);
            return state.map(tile => {
                if (tile.id !== action.payload.id) {
                    return tile;
                } else {
                    return {
                        ...tile,
                        selected: !tile.selected
                    };
                }
            });
        case C.CLEAR_SELECTION:
            // console.log('C.CLEAR_SELECTION');
            return state.map(tile => {
                return {
                    ...tile,
                    selected: false
                };
            });
        default:
            return state;
    }
}

const mapprApp = combineReducers({
    board,
    user,
    tileTemplate,
    selection,
    tiles
});

export default mapprApp;