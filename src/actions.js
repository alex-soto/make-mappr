/*
this.addTilesToState
this.selectTileType
this.handleDimensionChange
this.handleRadiusChange

this.initializeTileState

this.selectTile
this.selectAction
this.panMap
*/

export const C = {
    ACTIONS: {
        PAN_MAP: "PAN_MAP",
        SELECT_TILES: "SELECT_TILES",
        CLEAR_SELECTION: "CLEAR_SELECTION"
    },
    ADD_TILES: "ADD_TILES",
    BEGIN_DRAG_SELECTION: "BEGIN_DRAG_SELECTION",
    END_DRAG_SELECTION: "END_DRAG_SELECTION",
    ON_DRAG_SELECTION: "ON_DRAG_SELECTION",
    SELECT_TILE_TYPE: "SELECT_TILE_TYPE",
    CHANGE_DIMENSIONS: "CHANGE_DIMENSIONS",
    CHANGE_MAP_POSITION: "CHANGE_MAP_POSITION",
    CHANGE_TILE_RADIUS: "CHANGE_TILE_RADIUS",
    SELECT_ACTION: "SELECT_ACTION",
    SELECT_TILE: "SELECT_TILE",
    TILE_TYPES: {
        HEXAGON: "HEXAGON",
        SQUARE: "SQUARE"
    }
};

export function addTiles(tile) {
    return { type: C.ADD_TILES, payload: tile  };
}

export function beginDragSelection(position) {
    return { type: C.BEGIN_DRAG_SELECTION, payload: position };
}

export function changeDimensions(newDimensions) {
    return { type: C.CHANGE_DIMENSIONS, payload: newDimensions };
}

export function changeMapPosition(newPosition) {
    return { type: C.CHANGE_MAP_POSITION, payload: newPosition };
}

export function changeTileRadius(newRadius) {
    return { type: C.CHANGE_TILE_RADIUS, payload: newRadius };
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