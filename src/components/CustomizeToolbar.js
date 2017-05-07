import React, { Component } from 'react';
// import IconButton from 'material-ui/IconButton';
// import FontIcon from 'material-ui/FontIcon';
// import PanTool from 'material-ui/svg-icons/action/pan-tool';
import FontAwesome from 'react-fontawesome';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

export class CustomizeToolbar extends Component {
    
    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <RaisedButton
                        secondary={ this.props.selectedAction.name === 'panMap' }
                        onClick={() => this.props.selectAction('panMap')}
                        icon={<FontAwesome name="arrows" size="lg" />}
                    />
                    <RaisedButton
                        secondary={ this.props.selectedAction.name === 'selectTile' }
                        onClick={() => this.props.selectAction('selectTile')}
                        icon={<FontAwesome name="crosshairs" size="lg" />}
                    />
                    <RaisedButton
                        icon={<FontAwesome name="eraser" size="lg" />}
                    />
                    <RaisedButton
                        icon={<FontAwesome name="times" size="lg" />}
                    />
                </ToolbarGroup>
                <ToolbarSeparator />
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
    }
}

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