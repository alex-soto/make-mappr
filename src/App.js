import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Divider from 'material-ui/Divider';
import Board from './components/Board';
import { BoardSettings } from './components/BoardSettings';
// import BoardDrawer from './components/BoardDrawer';
import './App.css';

injectTapEventPlugin();

class App extends Component {
  constructor() {
    super();
    
    this.selectTileType = this.selectTileType.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    
    this.state = {
      boardSize: 0,
      boardWidth: 400,
      columns: 8,
      tilesPerColumn: 8,
      selectedType: null,
      tileTypes: ['square','hexagon'],
      tileRadius: 20,
      tileRotation: 0,
      tileFill: 'grey',
      tileStroke: 'black',
      tileStrokeWidth: 0.5
    };
  }
  
  componentWillMount() {
    this.setState({ 
      selectedType: this.state.tileTypes[0],
      boardSize: (window.innerWidth < window.innerHeight) ? Math.floor(window.innerWidth) : Math.floor(window.innerHeight)
    });
  }
  
  handleRadiusChange(event, radius) {
    this.setState({ tileRadius: radius });
    console.log(`tileRadius changed: ${this.state.tileRadius}`);
  }
  
  selectTileType(event, key, type) {
    if (this.state.tileTypes.some(t => type === t)) {
      this.setState({ selectedType: type });  
      console.log(`selectedType changed: ${this.state.selectedType}`);
    }
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <h2>React</h2>
          </div>
          <p className="App-intro">
           Stage
          </p>
          
          <Board 
            height={this.state.boardSize} 
            width={this.state.boardSize}
            columns={this.state.columns}
            tilesPerColumn={this.state.tilesPerColumn}
            selectedType={this.state.selectedType}
            tileRadius={this.state.tileRadius}
            tileFill={this.state.tileFill}
            tileStroke={this.state.tileStroke}
            tileStrokeWidth={this.state.tileStrokeWidth}
          />
          
          <Divider />
          
          <BoardSettings 
            selectTileType={this.selectTileType}
            handleRadiusChange={this.handleRadiusChange}
          />
          
          

        </div>
      </MuiThemeProvider>
      
    );
  }
}

export default App;

/*
<BoardDrawer 
  tileTypes={this.state.tileTypes}
  selectTileType={this.selectTileType.bind(this)} />

import logo from './logo.svg';
<img src={logo} className="App-logo" alt="logo" />
*/