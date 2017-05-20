import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey100, blueGrey300, 
         blueGrey500, pink100, pink200, //pink400, 
         darkBlack, white } from 'material-ui/styles/colors';
import Board from '../presentation/Board';
import MapSetupToolbar from './MapSetupToolbar';
import CustomizeToolbar from './CustomizeToolbar';
import ColorPicker from '../presentation/ColorPicker';
import { addTiles, changeBoardSize, changeDimensions, closeDialogs, deleteTiles, validateInput } from '../../actions';

import '../../App.css';


injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey300,
    primary2Color: blueGrey500,
    primary3Color: blueGrey100,
    accent1Color: pink200,
    // accent2Color: pink400,
    accent3Color: pink100,
    textColor: darkBlack,
    alternateTextColor: white,
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
    // margin: '0 auto',
    overflowX: 'hidden'
  }
}

class Mappr extends Component {
  
  constructor(props){
    super(props);
    
    this.createTiles = this.createTiles.bind(this);
    this.updateTiles = this.updateTiles.bind(this);
  }
    
  createTiles() {
    console.log('createTiles() called.');
    // console.log(this.props);
      let newTile = {};
      let tileKey = this.props.tiles.length;
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
  
  updateTiles(rows, columns, tiles) {
    let expectedTileLength = rows * columns;
    if (expectedTileLength > tiles.length) {
      this.createTiles();
    } else if (expectedTileLength < tiles.length) {
      console.log('deleteTiles() called.');
      this.props.deleteTiles(expectedTileLength);
    }
  }
    
  componentWillMount() {
    this.props.changeBoardSize(window.innerWidth - 20);
    this.props.changeDimensions(this.props.board.size);
    
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.board.size === prevProps.board.size && 
        this.props.board.rows === prevProps.board.rows &&
        this.props.board.columns === prevProps.board.columns) {
          return null;
        } else {
          this.updateTiles(this.props.board.rows, this.props.board.columns, this.props.tiles);
        }
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
                    <ColorPicker 
                      // actions={
                      //   []
                      // }
                      validateInput={this.props.validateInput}
                      isOpen={this.props.user.activeDialog === 'pickNewColor'}
                      onRequestClose={this.props.closeDialogs}
                    />
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
      tiles: state.tiles,
      user: state.user
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addTiles: (tile) => {
          dispatch(addTiles(tile));
        },
        changeBoardSize: (size) => {
          dispatch(changeBoardSize(size));
        },
        changeDimensions: (size) => {
          dispatch(changeDimensions(size));
        },
        closeDialogs: () => {
          dispatch(closeDialogs());
        },
        deleteTiles: (index) => {
          dispatch(deleteTiles(index));
        },
        validateInput: (input) => {
          let colorPickerTest = /#?([A-F]|[0-9]){3,6}/ig;
          dispatch(validateInput(colorPickerTest, input));
        }
    };
};



Mappr = connect(mapStateToProps, mapDispatchToProps)(Mappr);

export default Mappr;
