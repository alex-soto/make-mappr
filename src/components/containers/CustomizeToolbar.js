import React from 'react';
import { connect } from 'react-redux';
// import IconButton from 'material-ui/IconButton';
// import FontIcon from 'material-ui/FontIcon';
// import PanTool from 'material-ui/svg-icons/action/pan-tool';
import FontAwesome from 'react-fontawesome';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { C, selectAction } from '../../actions';

let CustomizeToolbar = (props) => {
    return (
        <Toolbar>
            <ToolbarGroup firstChild={true}>
                <RaisedButton
                    secondary={ props.board.selectedAction === C.ACTIONS.PAN_MAP }
                    onClick={() => props.selectAction(C.ACTIONS.PAN_MAP)}
                    icon={<FontAwesome name="arrows" size="lg" />}
                />
                <RaisedButton
                    secondary={ props.board.selectedAction === C.ACTIONS.SELECT_TILES }
                    onClick={() => props.selectAction(C.ACTIONS.SELECT_TILES)}
                    icon={<FontAwesome name="crosshairs" size="lg" />}
                />
                {/*<RaisedButton
                    icon={<FontAwesome name="eraser" size="lg" />}
                />*/}
                <RaisedButton
                    secondary={ props.board.selectedAction === C.ACTIONS.CLEAR_SELECTION }
                    onClick={() => props.selectAction(C.ACTIONS.CLEAR_SELECTION)}
                    icon={<FontAwesome name="times" size="lg" />}
                />
            </ToolbarGroup>
            <ToolbarGroup>
                
                <RaisedButton
                    icon={<FontAwesome name="eyedropper" size="lg" />}
                />
                <RaisedButton
                    icon={<FontAwesome name="paint-brush" size="lg" />}
                />
            </ToolbarGroup>
        </Toolbar>
            
    );
};

const mapStateToProps = (state) => {
    return { board: state.board };
};

const mapDispatchToProps =(dispatch) => {
    return { 
        selectAction: (action) => {
            dispatch(selectAction(action))
        }
    }
}

CustomizeToolbar = connect(mapStateToProps, mapDispatchToProps)(CustomizeToolbar);

export default CustomizeToolbar;

/*
<RaisedButton
    icon={<FontAwesome name="mouse-pointer" />}
/>
                    
<RaisedButton
    icon={<FontAwesome name="download" />}
/>

<RaisedButton
    icon={<PanTool />}
/>
<RaisedButton
    icon={<PanTool />}
/>

<IconButton
    iconStyle={styles.smallIcon}
    style={styles.small}
>
    <PanTool />
</IconButton>

*/