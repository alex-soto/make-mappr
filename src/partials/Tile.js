import React from 'react';
import { RegularPolygon } from 'react-konva';

function Tile(props) {
    return (
        <RegularPolygon
            x={props.x}
            y={props.y}
            id={props.id}
            selected={props.selected}
            // onClick={props.onClick}
            sides={props.sides}
            radius={props.radius}
            rotation={props.rotation}
            fill={ (props.selected) ? 'rgba(225, 175, 0, 0.5)' : props.fill }
            stroke={ (props.selected) ? '#ddad00' : props.stroke }
            // fill={props.fill}
            // stroke={props.stroke}
            strokeWidth={props.strokeWidth}
        />
    );
}

module.exports = Tile;