import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Board from './components/Board';
import { BoardSettings } from './components/BoardSettings';
// import BoardDrawer from './components/BoardDrawer';
import './App.css';

injectTapEventPlugin();

let style = {
  margin: '10px 20px'
}

class App extends Component {
  constructor() {
    super();
    
    this.selectTileType = this.selectTileType.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    
    this.state = {
      boardSize: 0,
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
      selectedType: this.state.tileTypes[1],
      boardWidth: 1024,
      boardHeight: 768
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
          <Paper style={style}>
            <Board 
              style={style}
              width={this.state.boardWidth}
              height={this.state.boardHeight}
              selectedType={this.state.selectedType}
              tileRadius={this.state.tileRadius}
              tileFill={this.state.tileFill}
              tileStroke={this.state.tileStroke}
              tileStrokeWidth={this.state.tileStrokeWidth}
            />
          </Paper>
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