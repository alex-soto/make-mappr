export const C = {
    // Change map action
    ACTIONS: {
        PAN_MAP: "PAN_MAP",
        SELECT_TILES: "SELECT_TILES",
        FILL_TILE_COLOR: "FILL_TILE_COLOR"
    },
    SELECT_ACTION: "SELECT_ACTION",
    
    // Tiles
    ADD_TILES: "ADD_TILES",
    DELETE_TILES: "DELETE_TILES",
    CHANGE_TILE_COLOR: "CHANGE_TILE_COLOR",
    
    // Selection
    BEGIN_DRAG_SELECTION: "BEGIN_DRAG_SELECTION",
    CLEAR_SELECTION: "CLEAR_SELECTION",
    END_DRAG_SELECTION: "END_DRAG_SELECTION",
    ON_DRAG_SELECTION: "ON_DRAG_SELECTION",
    SELECT_TILE: "SELECT_TILE",
    
    // Board
    CHANGE_BOARD_SIZE: "CHANGE_BOARD_SIZE",
    CHANGE_DIMENSIONS: "CHANGE_DIMENSIONS",
    CHANGE_OFFSET: "CHANGE_OFFSET",
    CHANGE_MAP_POSITION: "CHANGE_MAP_POSITION",
    CHANGE_TILE_RADIUS: "CHANGE_TILE_RADIUS",
    SELECT_TILE_TYPE: "SELECT_TILE_TYPE",
    TILE_TYPES: {
        HEXAGON: "HEXAGON",
        SQUARE: "SQUARE"
    },
    
    // User settings
    USER: {
        ACTIONS: {
            CLOSE_DIALOGS: "CLOSE_DIALOGS",
            PICK_NEW_COLOR: "PICK_NEW_COLOR",
            ADD_BACKGROUND_IMAGE: "ADD_BACKGROUND_IMAGE"
        },
        COLORS: {
            ADD_NEW_COLOR: "ADD_NEW_COLOR",
            EDIT_EXISTING_COLOR: "EDIT_EXISTING_COLOR",
            DELETE_COLOR: "DELETE_COLOR",
            SELECT_COLOR: "SELECT_COLOR"
        },
        INPUT: {
            VALIDATE_INPUT: "VALIDATE_INPUT"
        }
    }
};

export function addTiles(tile) {
    return { type: C.ADD_TILES, payload: tile  };
}

export function deleteTiles(index) {
    return { type: C.DELETE_TILES, payload: index };
}

export function changeTileColor(tile, color) {
    return { type: C.CHANGE_TILE_COLOR, payload: {tile, color } };
}

export function beginDragSelection(position) {
    return { type: C.BEGIN_DRAG_SELECTION, payload: position };
}

export function changeBoardSize(size) {
    return { type: C.CHANGE_BOARD_SIZE, payload: size };
}

export function changeDimensions(newDimensions) {
    return { type: C.CHANGE_DIMENSIONS, payload: newDimensions };
}

export function changeMapPosition(newPosition) {
    return { type: C.CHANGE_MAP_POSITION, payload: newPosition };
}

export function changeOffset(newOffset) {
    return { type: C.CHANGE_OFFSET, payload: newOffset };
}

export function changeTileRadius(newRadius) {
    return { type: C.CHANGE_TILE_RADIUS, payload: newRadius };
}

export function clearSelection() {
    return { type: C.CLEAR_SELECTION, payload: null };
}

export function endDragSelection() {
    return { type: C.END_DRAG_SELECTION, payload: null };
}

export function onDragSelection(position) {
    return { type: C.ON_DRAG_SELECTION, payload: position };
}

export function selectAction(action) {
    return { type: C.SELECT_ACTION, payload: action };
}

export function selectTile(tile) {
    return { type: C.SELECT_TILE, payload: tile };
}

export function selectTileType(tileType) {
    return { type: C.SELECT_TILE_TYPE, payload: tileType };
}

// User-specific functions
export function closeDialogs() {
    return { type: C.USER.ACTIONS.CLOSE_DIALOGS, payload: null };
}

export function pickNewColor() {
    return { type: C.USER.ACTIONS.PICK_NEW_COLOR, payload: null };
}

export function addBackgroundImage() {
    return { type: C.USER.ACTIONS.ADD_BACKGROUND_IMAGE, payload: null };
}

export function addColorToPalette(color) {
    return { type: C.USER.COLORS.ADD_NEW_COLOR, payload: color };
}

export function editPaletteColor(colorToEdit, newColor) {
    let payload = { color: colorToEdit, newColor: newColor };
    return { type: C.USER.COLORS.EDIT_EXISTING_COLOR, payload };
}

export function deletePaletteColor(color) {
    return { type: C.USER.COLORS.DELETE_COLOR, payload: color };
}

export function selectColor(color) {
    return { type: C.USER.COLORS.SELECT_COLOR, payload: color };
}

// export function validateInput(test, input) {
//     return { type: C.USER.INPUT.VALIDATE_INPUT, payload: {test: test, input: input} };
// }

/*
USER.COLOR.
ADD_NEW_COLOR: "ADD_NEW_COLOR",
EDIT_EXISTING_COLOR: "EDIT_EXISTING_COLOR",
DELETE_COLOR: "DELETE_COLOR"
*/