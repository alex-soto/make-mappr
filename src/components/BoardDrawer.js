import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

export default class BoardDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleToggle = () => this.setState({
        open: !this.state.open
    });

    render() {
        return (
            <div>
                <RaisedButton
                  label="Toggle Drawer"
                  onTouchTap={this.handleToggle}
                />
                <Paper style={style}>
                    <Drawer open={this.state.open}>
                        <Menu 
                            desktop={true}
                            onItemTouchTap={(event, menuItem)=>console.log(menuItem)}
                            >
                            <MenuItem 
                                primaryText="Tile type"
                                rightIcon={<ArrowDropRight />}
                                menuItems={[
                                    <MenuItem primaryText="Square" value="square" />,
                                    <MenuItem primaryText="Hexagon" value="hexagon" />
                                ]}
                            />
                            {/*<MenuItem>Menu Item 2</MenuItem>*/}
                        </Menu>
                    </Drawer>
                </Paper>
          </div>
        );
    }
}