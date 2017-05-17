import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey300, pink200 } from 'material-ui/styles/colors';

import Board from '../presentation/Board';
import MapSetupToolbar from './MapSetupToolbar';
import CustomizeToolbar from './CustomizeToolbar';
import { addTiles } from '../../actions';

import '../../App.css';


injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey300,
    accent1Color: pink200
  }
});

let styles = {
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  paper: {
    maxWidth: '100%',
    overflowX: 'hidden'
  }
}



class Mappr extends Component {
  
  constructor(props){
    super(props);
    
    this.intializeTiles = this.initializeTiles.bind(this);
  }
    
  initializeTiles() {
    console.log('initializeTiles(props) => props:');
    console.log(this.props);
      let newTile = {};
      let tileKey = 0;
      for (let i = 1; i <= this.props.board.columns; i++) {
        for (let j = 1; j <= this.props.board.rows; j++) {
          newTile = {
            key: tileKey,
            id: tileKey,
            column: i,
            row: j,
            selected: false,
          };
          this.props.addTiles(newTile);
          tileKey++;
        }
      }
  }
    
    componentWillMount() {
        this.initializeTiles(this.props);
    }
    
    // console.log(props);
    render() {
        return(
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="App">
                  <div className="App-header" onClick={()=>console.log(this.props.state)}>
                    <h2>React</h2>
                  </div>
                  <Paper style={styles.paper}>
                    <Tabs>
                        <Tab 
                          label="Setup"
                          icon={<FontIcon className="material-icons">build</FontIcon>}
                        >
                          <MapSetupToolbar />
                        </Tab>
                        <Tab 
                          label="Customize"
                          icon={<FontIcon className="material-icons">brush</FontIcon>}
                        >
                          <CustomizeToolbar />
                        </Tab>
                        
                    </Tabs>
                    
                    <Board 
                      board={this.props.board}
                      tileTemplate={this.props.tileTemplate}
                      tiles={this.props.tiles} 
                    />
                    
                  </Paper>
                  <Divider />
                  
                </div>
                </MuiThemeProvider>    
        );
    }
}



const mapStateToProps = (state) => {
    return {
      state,
      board: state.board,
      tileTemplate: state.tileTemplate,
      tiles: state.tiles
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addTiles: (tile) => {
            dispatch(addTiles(tile));
        }
    };
};

Mappr = connect(mapStateToProps, mapDispatchToProps)(Mappr);

export default Mappr;

/*
<MapSetupToolbar 
                              handleDimensionChange={this.handleDimensionChange}
                              selectedType={this.state.selectedType}
                              selectTileType={this.selectTileType}
                              handleRadiusChange={this.handleRadiusChange}
                            />
                            
<CustomizeToolbar 
                            selectAction={this.selectAction}
                            selectedAction={this.state.selectedAction}
                          />
                          
<Board 
                      width={this.state.boardWidth}
                      height={this.state.boardHeight}
                      addTilesToState={this.addTilesToState}
                      mapPos={this.state.mapPos}
                      selectedAction={this.state.selectedAction}
                      selectTile={this.selectTile}
                      selectedTiles={this.state.selectedTiles}
                      selectedType={this.state.selectedType}
                      tiles={this.state.tiles}
                    />
                    
*/