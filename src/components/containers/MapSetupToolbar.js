import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { changeDimensions, selectTileType, changeTileRadius } from '../../actions';

const style = {
    width: '150px',
    marginTop: '24px'
};

class MapSetupToolbar extends Component {
    
    constructor(props) {
        super(props);
        
        this.dimensionChange = this.dimensionChange.bind(this);
        this.radiusChange = this.radiusChange.bind(this);
    }
    
    componentWillMount() {
        // console.log(this.props);
    }
    
    dimensionChange(event, newValue) {
        console.log(this.props);
        let newDimensions = { 
            height: this.props.board.height, 
            width: this.props.board.width 
        };
        if (event.target.name === 'mapWidth') {
            // this.props.handleDimensionChange('width', newValue)
            newDimensions.width = newValue;
        } else if (event.target.name === 'mapHeight') {
            newDimensions.height = newValue;
        }
        this.props.changeDimensions(newDimensions);
    }
    
    radiusChange(event, newRadius) {
        console.log(this);
        this.props.changeTileRadius(newRadius);
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
                    />
                    <ToolbarTitle text="Height" />
                    <TextField
                        style={ { width: '100px'} }
                        defaultValue="900"
                        name="mapHeight"
                        onChange={this.dimensionChange}
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
                        onChange={this.radiusChange}
                    />
                </ToolbarGroup>
                
            </Toolbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      board: state.board,
      tileTemplate: state.tileTemplate,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        selectTileType: (type) => {
            dispatch(selectTileType(type));
        },
        changeDimensions: (dimensions) => {
            dispatch(changeDimensions(dimensions));
        },
        changeTileRadius: (radius) => {
            dispatch(changeTileRadius(radius));
        }
    };
};

MapSetupToolbar = connect(mapStateToProps, mapDispatchToProps)(MapSetupToolbar);
module.exports = MapSetupToolbar;

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