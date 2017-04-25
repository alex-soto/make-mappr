import React, { Component } from 'react';
import { RegularPolygon } from 'react-konva';

export class Tile extends Component {
    render() {
        return (
            <RegularPolygon 
                x={this.props.x}
                y={this.props.y}
                sides={this.props.sides}
                radius={this.props.radius}
                rotation={this.props.rotation}
                fill={this.props.fill}
                stroke={this.props.stroke}
                strokeWidth={this.props.strokeWidth}
                onClick={()=>console.log(this)}
            />
        );
    }
}