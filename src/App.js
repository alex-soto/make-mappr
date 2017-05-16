import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import Board from './components/Board';
import {Tabs, Tab} from 'material-ui/Tabs';
import { MapSetupToolbar } from './components/MapSetupToolbar';
import { CustomizeToolbar } from './components/CustomizeToolbar';
import './App.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey300, pink200 } from 'material-ui/styles/colors';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey300,
    accent1Color: pink200
  }
});

// *** Color scheme: *** //
// Primary: #90a4ae
// Primary Light: #c1d5e0
// Primary Dark: #62757f

// Secondary: #F48FB1
// Secondary Light: #ffc1e3
// Secondary Dark: #bf5f82

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

export default class App extends Component {
  constructor() {
    super();
    
    this.addTilesToState = this.addTilesToState.bind(this);
    this.selectTileType = this.selectTileType.bind(this);
    this.handleDimensionChange = this.handleDimensionChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.initializeTileState = this.initializeTileState.bind(this);
    this.selectTile = this.selectTile.bind(this);
    this.selectAction = this.selectAction.bind(this);
    this.panMap = this.panMap.bind(this);
    
    this.state = {
      // state pertaining to board component
      boardWidth: 1024,
      boardHeight: 768,
      mapOffset: 12,
      mapPos: null,
      selectedAction: null,
      
      // state pertaining to tiles
      selectedType: null,
      tileTypes: ['square','hexagon'],
      tileRadius: 20,
      tileRotation: 0,
      tileFill: '#FFFFFF',
      tileStroke: 'grey',
      tileStrokeWidth: 0.5,
      tiles: [],
      selectedTiles: []
    };
  }
  
  componentWillMount() {
    this.setState({ 
      selectedType: this.state.tileTypes[1],
      mapPos: {x: 0, y: 0},
      tiles: this.initializeTileState()
    });
    this.selectAction('panMap');
  }
  
  // componentDidUpdate() {
  //   this.setState({ tiles: this.initializeTileState() });
  // }
  
  addTilesToState(tiles) {
    this.setState({ tiles });
  }
  
  initializeTileState(tiles = [], type = this.state.selectedType) {
    let newTileArray = tiles;
    let tileKey = 0;
    // let lastColumn = Math.ceil(this.state.boardWidth / this.state.tileRadius);
    // let lastRow = Math.ceil(this.state.boardHeight / this.state.tileRadius);
    let lastColumn = 40;
    let lastRow = 20;
    console.log(`initializeTileState() called. lastRow: ${lastRow}, lastColumn: ${lastColumn}, selectedType: ${this.state.selectedType}`);
    
    for (let i = 1; i <= lastColumn; i++) {
      for (let j = 1; j <= lastRow; j++) {
        newTileArray[tileKey] = {
          key: tileKey,
          id: tileKey,
          selected: (newTileArray[tileKey]) ? newTileArray[tileKey].selected : false,
          x: (type === 'square') ?
              i * this.state.tileRadius * Math.sqrt(2) + this.state.mapOffset :
              i * this.state.tileRadius * 0.85 + this.state.mapOffset,
          y: (type === 'square') ? 
              j * this.state.tileRadius * Math.sqrt(2) :
              j * this.state.tileRadius * 3 - (i % 2 * this.state.tileRadius * 1.5),
          sides: (type === 'square') ? '4' : '6',
          radius: this.state.tileRadius,
          rotation: (type === 'square') ? '45' : '0',
          fill: this.state.tileFill,
          stroke: this.state.tileStroke,
          strokeWidth: this.state.tileStrokeWidth
        };
        tileKey++;
      }
    }
    
    return newTileArray;
    
  }
  
  handleDimensionChange(dim, newValue) {
    if (parseInt(newValue, 10) && newValue >= 100 && newValue <= 1600) {
      
      if (dim === 'width') {
        this.setState({ boardWidth: newValue });
      } else if (dim === 'height') {
        this.setState({ boardHeight: newValue });
      }
      
    }
  }
  
  handleRadiusChange(event, radius) {
      console.log(`tileRadius changed: ${this.state.tileRadius}`);
      this.setState({ tileRadius: radius });
  }
  
  selectTile(event) {
    if (event.type === 'click') {
      let tile = event.target;
      // console.log(tile);
      let newSelectedTiles = this.state.tiles.map(t => {
        if (t.id === tile.attrs.id) {
          t.selected = !tile.attrs.selected;
        }
        return t;
      });
      this.setState({tiles: newSelectedTiles});
    }
  }
  
  selectTileType(event, selected) {
      let type = selected.props.value;
      if (this.state.tileTypes.some(t => type === t)) {
        this.setState({ selectedType: type, tiles: this.initializeTileState(this.state.tiles, type) });  
        
      }
  }
  
  panMap(evt){
    // console.log(evt);
    let newPosition = { x: evt.target.attrs.x, y: evt.target.attrs.y };
    this.setState({ mapPos: newPosition });
  }
  
  selectAction(action) {
    let actionHandler;
    switch (action) {
      case 'selectTile':
        actionHandler = this.selectTile;
        break;
      case 'panMap':
        actionHandler = this.panMap;
        break;
      default:
        actionHandler = null;
    }
    this.setState({ 
      selectedAction: {
        name: action,
        actionHandler
      } 
      
    });
  }
  
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <div className="App-header" onClick={()=>console.log(this.state)}>
            <h2>React</h2>
          </div>
          <Paper style={styles.paper}>
            <Tabs>
                <Tab 
                  label="Setup"
                  icon={<FontIcon className="material-icons">build</FontIcon>}
                >
                    <MapSetupToolbar 
                      handleDimensionChange={this.handleDimensionChange}
                      selectedType={this.state.selectedType}
                      selectTileType={this.selectTileType}
                      handleRadiusChange={this.handleRadiusChange}
                      
                    />
                </Tab>
                <Tab 
                  label="Customize"
                  icon={<FontIcon className="material-icons">brush</FontIcon>}
                >
                  <CustomizeToolbar 
                    selectAction={this.selectAction}
                    selectedAction={this.state.selectedAction}
                  />
                </Tab>
                
            </Tabs>
            
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
            
          </Paper>
          <Divider />
          
        </div>
      </MuiThemeProvider>
      
    );
  }
}

/*
<Board 
              width={this.state.boardWidth}
              height={this.state.boardHeight}
              mapOffset={this.state.mapOffset}
              addTilesToState={this.addTilesToState}
              mapPos={this.state.mapPos}
              selectedAction={this.state.selectedAction}
              selectTile={this.selectTile}
              selectedTiles={this.state.selectedTiles}
              selectedType={this.state.selectedType}
              tiles={this.state.tiles}
              tileRadius={this.state.tileRadius}
              tileFill={this.state.tileFill}
              tileStroke={this.state.tileStroke}
              tileStrokeWidth={this.state.tileStrokeWidth}
            />
            

drawMap() {
    let tiles = [];
    let tileKey = 0;
    let lastColumn = Math.ceil(this.state.boardWidth / this.state.tileRadius);
    let lastRow = Math.ceil(this.state.boardHeight / this.state.tileRadius);
    console.log(`drawMap() called. lastRow: ${lastRow}, lastColumn: ${lastColumn}`);
    
    for (let i = 1; i <= lastColumn; i++) {
        for (let j = 1; j <= lastRow; j++) {
            tiles.push(
                <Tile 
                    key={tileKey}
                    id={tileKey}
                    onClick={(evt)=>this.selectTile(evt.target.attrs.id)}
                    x={ (this.state.selectedType === 'square') ?
                        i * this.state.tileRadius * Math.sqrt(2) + this.state.mapOffset :
                        i * this.state.tileRadius * 0.85 + this.state.mapOffset
                    }
                    y={ (this.state.selectedType === 'square') ? 
                        j * this.state.tileRadius * Math.sqrt(2) :
                        j * this.state.tileRadius * 3 - (i % 2 * this.state.tileRadius * 1.5)
                    }
                    sides={(this.state.selectedType === 'square') ? '4' : '6'}
                    radius={ this.state.tileRadius }
                    rotation={(this.state.selectedType === 'square') ? '45' : '0'}
                    fill={this.state.tileFill}
                    stroke={ (this.state.selectedTiles.indexOf(tileKey) >= 0) ? '#ddad00' : this.state.tileStroke }
                    strokeWidth={this.state.tileStrokeWidth}
                />
            );
            tileKey++;
        }
    }
    this.setState({tiles});
  }

<IconButton
  iconStyle={styles.mediumIcon}
>
  <Build />
</IconButton>

<RaisedButton
  label="Map settings"
  icon={<Build />}
/>
            
import logo from './logo.svg';
<img src={logo} className="App-logo" alt="logo" />
*/