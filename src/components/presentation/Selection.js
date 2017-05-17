import React from 'react';
import { Layer, Rect } from 'react-konva';

export default function Selection(props) {
    return(
        <Layer>
            <Rect 
                id={props.id}
                x={props.start.x} 
                y={props.start.y}
                width={props.end.x - props.start.x}
                height={props.end.y - props.start.y}
                fill='rgba(225, 175, 0, 0.4)'
            />
        </Layer>
    );
}