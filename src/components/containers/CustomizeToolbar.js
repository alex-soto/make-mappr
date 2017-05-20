import React from 'react';
import { connect } from 'react-redux';
// import muiThemeable from 'material-ui/styles/muiThemeable';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
// import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import FontAwesome from 'react-fontawesome';
// import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import Palette from 'material-ui/svg-icons/image/palette';
import Add from 'material-ui/svg-icons/content/add';
import { C, selectAction, clearSelection, pickNewColor } from '../../actions';

let CustomizeToolbar = (props) => {
    return (
        <Toolbar>
            <ToolbarGroup firstChild={true}>
                <FlatButton
                    secondary={ props.board.selectedAction === C.ACTIONS.PAN_MAP }
                    // hoverColor={ props.muiTheme.palette. }
                    onClick={() => props.selectAction(C.ACTIONS.PAN_MAP)}
                    icon={<FontAwesome name="arrows" size="lg" />}
                />
                <FlatButton
                    secondary={ props.board.selectedAction === C.ACTIONS.SELECT_TILES }
                    onClick={() => props.selectAction(C.ACTIONS.SELECT_TILES)}
                    icon={<FontAwesome name="crosshairs" size="lg" />}
                />
                {/*<RaisedButton
                    icon={<FontAwesome name="eraser" size="lg" />}
                />*/}
                <FlatButton
                    // disabled={ props.board.selectedAction !== C.ACTIONS.SELECT_TILES }
                    onClick={() => props.clearSelection()}
                    icon={<FontAwesome name="times" size="lg" />}
                />
            {/*</ToolbarGroup>
            <ToolbarGroup>*/}
            <ToolbarSeparator />
                
                <FlatButton
                    icon={<FontAwesome name="paint-brush" size="lg" />}
                    style={ { borderBottom: '4px solid green' } }
                />
                <IconMenu
                    iconButtonElement={<IconButton><Palette /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                >
                    <MenuItem 
                        primaryText="Add new color" 
                        leftIcon={<Add />} 
                        onTouchTap={props.pickNewColor}
                    />
                    <Divider />
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
        board: state.board 
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
        }
    };
};

CustomizeToolbar = connect(mapStateToProps, mapDispatchToProps)(CustomizeToolbar);

export default CustomizeToolbar;