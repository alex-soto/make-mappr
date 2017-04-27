import React, { Component } from 'react';
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
// import { Card } from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import { MapEditToolbar } from './MapEditToolbar';

export class BoardSettings extends Component {
    render() {
        return (
            <Tabs>
                <Tab label="Map settings" >
                    <MapEditToolbar />
                </Tab>
            </Tabs>   
        );    
    }
}

/*

*/