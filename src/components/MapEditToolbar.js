import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

const style = {
    width: '150px',
    marginTop: '24px'
};

export class MapEditToolbar extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Dimensions" />
                    <IconMenu
                        maxHeight={150}
                        desktop={true}
                        anchorOrigin={ {"horizontal":"right","vertical":"bottom"} }
                        targetOrigin={ {"horizontal":"middle","vertical":"top"} }
                        iconButtonElement={
                            <IconButton touch={true}>
                                <NavigationExpandMoreIcon />
                            </IconButton>
                        }
                    >
                        <TextField
                            style={style}
                            defaultValue="1600"
                            floatingLabelText="Width"
                        />
                        <TextField
                            style={style}
                            defaultValue="900"
                            floatingLabelText="Height"
                        />
                    </IconMenu>
                    <ToolbarTitle text="Tile shape" />
                    <IconMenu
                            maxHeight={150}
                            desktop={true}
                            anchorOrigin={ {"horizontal":"right","vertical":"bottom"} }
                            targetOrigin={ {"horizontal":"middle","vertical":"top"} }
                            onChange={this.props.selectTileType}
                            iconButtonElement={
                                <IconButton touch={true}>
                                    <NavigationExpandMoreIcon />
                                </IconButton>
                            }
                    >
                        <MenuItem value='square' primaryText="Squares" />
                        <MenuItem value='hexagon' primaryText="Hexagons" />
                    </IconMenu>
                    <ToolbarTitle text="Tile size" />
                    <Slider 
                        style={style}
                        step={1} 
                        min={15} 
                        max={50} 
                        defaultValue={20}
                        onChange={this.props.handleRadiusChange}
                    />
                </ToolbarGroup>
                <ToolbarSeparator />
            </Toolbar>
        );
    }
}

/*

<DropDownMenu 
    value={this.props.selectedType}
    onChange={this.props.selectTileType}>
    <MenuItem value='square' primaryText="Squares" />
    <MenuItem value='hexagon' primaryText="Hexagons" />
</DropDownMenu>
                
<IconMenu
    onChange={this.props.selectTileType}
    iconButtonElement={
        <IconButton touch={true}>
            <NavigationExpandMoreIcon />
        </IconButton>
    }
>
<MenuItem value='square' primaryText="Squares" />
<MenuItem value='hexagon' primaryText="Hexagons" />
</IconMenu>

<ToolbarGroup>
    <ToolbarTitle text="Tile size" />
    <Slider 
        style={style}
        step={1} 
        min={15} 
        max={50} 
        defaultValue={20}
        onChange={this.props.handleRadiusChange}
    />
</ToolbarGroup>

<TextField
                        style={style}
                        defaultValue="1600"
                        floatingLabelText="Width"
                    />
                    <TextField
                        style={style}
                        defaultValue="900"
                        floatingLabelText="Height"
                    />
*/