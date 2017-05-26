import React from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import FontAwesome from 'react-fontawesome';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import Palette from 'material-ui/svg-icons/image/palette';
import Add from 'material-ui/svg-icons/content/add';
import { C, selectAction, clearSelection, pickNewColor, selectColor } from '../../actions';

const style = {
    color: '#90a4ae'
};

let CustomizeToolbar = (props) => {
    return (
        <Toolbar>
            <ToolbarGroup firstChild={true}>
                <FlatButton 
                    style={props.board.selectedAction !== C.ACTIONS.PAN_MAP ? style : null}
                    secondary={ props.board.selectedAction === C.ACTIONS.PAN_MAP }
                    onTouchTap={() => props.selectAction(C.ACTIONS.PAN_MAP)}
                    icon={<FontAwesome name="arrows" size="lg" />}
                />
                <FlatButton
                    style={props.board.selectedAction !== C.ACTIONS.SELECT_TILES ? style : null}
                    secondary={ props.board.selectedAction === C.ACTIONS.SELECT_TILES }
                    onTouchTap={() => props.selectAction(C.ACTIONS.SELECT_TILES)}
                    icon={<FontAwesome name="crosshairs" size="lg" />}
                />
                {/*<RaisedButton
                    icon={<FontAwesome name="eraser" size="lg" />}
                />*/}
                <FlatButton
                    style={style}
                    // disabled={ props.board.selectedAction !== C.ACTIONS.SELECT_TILES }
                    onTouchTap={() => props.clearSelection()}
                    icon={<FontAwesome name="times" size="lg" />}
                />
            {/*</ToolbarGroup>
            <ToolbarGroup>*/}
            <ToolbarSeparator />
                {
                (props.board.selectedAction !== C.ACTIONS.FILL_TILE_COLOR) ?
                    <FlatButton
                        icon={<FontAwesome name="paint-brush" size="lg" />}
                        secondary={ props.board.selectedAction === C.ACTIONS.FILL_TILE_COLOR }
                        onTouchTap={() => props.selectAction(C.ACTIONS.FILL_TILE_COLOR)}
                        style={ { color: '#90a4ae', borderBottom: '4px solid ' + props.user.selectedColor } } 
                        /> :
                    <FlatButton
                        icon={<FontAwesome name="paint-brush" size="lg" />}
                        secondary={ props.board.selectedAction === C.ACTIONS.FILL_TILE_COLOR }
                        onTouchTap={() => props.selectAction(C.ACTIONS.FILL_TILE_COLOR)}
                        style={ { borderBottom: '4px solid ' + props.user.selectedColor } }
                    />
                }
                <IconMenu
                    iconButtonElement={<IconButton><Palette color={style.color} /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                >
                    <MenuItem 
                        primaryText="Add new color" 
                        leftIcon={<Add />} 
                        onTouchTap={props.pickNewColor}
                    />
                    <Divider />
                    { props.user.colorPalette.map((color, i) => {
                       return (
                        <MenuItem
                            key={i}
                            primaryText={color}
                            onTouchTap={()=>props.selectColor(color)}
                            leftIcon={
                                <FontAwesome 
                                    name="square" 
                                    size="lg" 
                                    style={{color: color}}
                                />}
                            rightIcon={
                                <FontAwesome 
                                    name={(props.user.selectedColor === color) ? "check" : ''} 
                                />
                            }
                        />
                       );
                    }) }
                    {/*<MenuItem primaryText="Help &amp; feedback" />
                    <MenuItem primaryText="Settings" />
                    <MenuItem primaryText="Sign out" />*/}
                </IconMenu>
                
                {/*<RaisedButton
                    icon={<FontAwesome name="eyedropper" size="lg" />}
                />*/}
            </ToolbarGroup>
        </Toolbar>
            
    );
};

const mapStateToProps = (state) => {
    return { 
        board: state.board,
        user: state.user
    };
};

const mapDispatchToProps =(dispatch) => {
    return { 
        clearSelection: () => {
            dispatch(clearSelection());
        },
        pickNewColor: () => {
          dispatch(pickNewColor());
        },
        selectAction: (action) => {
            dispatch(selectAction(action));
        },
        selectColor: (color) => {
            dispatch(selectColor(color));
        }
    };
};

CustomizeToolbar = connect(mapStateToProps, mapDispatchToProps)(CustomizeToolbar);

export default CustomizeToolbar;

/*
<FlatButton
                    icon={<FontAwesome name="paint-brush" size="lg" />}
                    secondary={ props.board.selectedAction === C.ACTIONS.FILL_TILE_COLOR }
                    onTouchTap={() => props.selectAction(C.ACTIONS.FILL_TILE_COLOR)}
                    style={  ? 
                        { color: '#90a4ae', borderBottom: '4px solid ' + props.user.selectedColor } : 
                        { borderBottom: '4px solid ' + props.user.selectedColor } 
                    }
                />
*/