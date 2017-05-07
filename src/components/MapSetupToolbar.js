import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

const style = {
    width: '150px',
    marginTop: '24px'
};

export class MapSetupToolbar extends Component {
    constructor(props) {
        super(props);
        this.dimensionChange = this.dimensionChange.bind(this);
    }
    
    dimensionChange(event, newValue) {
        if (event.target.name === 'mapWidth') {
            this.props.handleDimensionChange('width', newValue)
        } else if (event.target.name === 'mapHeight') {
            this.props.handleDimensionChange('height', newValue)
        }
    }
    
    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Width" />
                    <TextField
                        style={ { width: '100px'} }
                        defaultValue="1600"
                        name="mapWidth"
                        onChange={this.dimensionChange}
                        // floatingLabelText="Width"
                    />
                    <ToolbarTitle text="Height" />
                    <TextField
                        style={ { width: '100px'} }
                        defaultValue="900"
                        name="mapHeight"
                        onChange={this.dimensionChange}
                        // floatingLabelText="Height"
                    />
                    <ToolbarTitle text="Tile shape" />
                    <IconMenu
                            maxHeight={150}
                            desktop={true}
                            anchorOrigin={ {"horizontal":"right","vertical":"bottom"} }
                            targetOrigin={ {"horizontal":"middle","vertical":"top"} }
                            onItemTouchTap={this.props.selectTileType}
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
                
            </Toolbar>
        );
    }
}

/*
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
                        onRequestChange={(event, child) => console.log(event, child)}
                        onEscKeyDown={console.log}
                        onChange={console.log}
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
                    
<ToolbarSeparator />

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