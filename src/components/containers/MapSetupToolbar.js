import React, { Component } from 'react';
import { connect } from 'react-redux';
// import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
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
    
    dimensionChange(event, key, value) {
        // console.log(this.props.board.columns, " x ", this.props.board.rows);
        // console.log(this.props);
        let newDimensions = value;
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
                    <ToolbarTitle text="Map size" />
                    <DropDownMenu 
                        // maxHeight={150}
                        // desktop={true}
                        anchorOrigin={ {"horizontal":"right","vertical":"bottom"} }
                        targetOrigin={ {"horizontal":"middle","vertical":"top"} }
                        value={this.props.board.size} 
                        // onItemTouchTap={(event, child, value)=>{
                        //     console.log(event, child, value);
                        //   }
                        // }
                        onChange={this.dimensionChange}
                        iconButton={<NavigationExpandMoreIcon />
                                // <IconButton touch={true}>
                                //     <NavigationExpandMoreIcon />
                                // </IconButton>
                            }
                        iconStyle={ { fill: 'rgba(0, 0, 0, 0.4)' } }
                        >
                        <MenuItem value={15} primaryText="15 x 15" />
                        <MenuItem value={30} primaryText="30 x 30" />
                        <MenuItem value={45} primaryText="45 x 45" />
                        <MenuItem value={60} primaryText="60 x 60" />
                    </DropDownMenu>
                    <ToolbarTitle text="Tile shape" />
                    <DropDownMenu
                            // maxHeight={150}
                            // desktop={true}
                            value={this.props.tileTemplate.selectedType}
                            anchorOrigin={ {"horizontal":"right","vertical":"bottom"} }
                            targetOrigin={ {"horizontal":"middle","vertical":"top"} }
                            onChange={
                                (event, child, value) => {
                                    this.props.selectTileType(value);
                                }
                            }
                            iconButton={<NavigationExpandMoreIcon />
                            }
                            iconStyle={ { fill: 'rgba(0, 0, 0, 0.4)' } }
                    >
                        <MenuItem value='square' primaryText="Squares" />
                        <MenuItem value='hexagon' primaryText="Hexagons" />
                    </DropDownMenu>
                </ToolbarGroup>
                <Divider />
                <ToolbarGroup>
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
                <Divider />
                <ToolbarGroup>
                    <RaisedButton 
                        label="Add background image"
                        labelPosition="before"
                        secondary={true}
                        icon={<FileUpload />}
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
