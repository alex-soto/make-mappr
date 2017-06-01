import React from 'react';
import { Stage, Layer, Group, RegularPolygon, Text } from 'react-konva';

const logoPos = {
    x: 80,
    y: 80,
    sides: 6,
    radius: 60,
    fill: "rgba(0,0,0,0)",
    primary: "#FFFFFF",
    secondary: "#f48fb1",
    strokeWidth: 15
};

export default function Logo(props) {
    return (
        <Stage width="360" height="160">
            <Layer id="logo">
            <Group>
                    
                </Group>
                <Group draggable={true}>
                    <RegularPolygon 
                        name="logo"
                        x={logoPos.x}
                        y={logoPos.y}
                        sides={logoPos.sides}
                        radius={logoPos.radius}
                        // fill={logoPos.fill}
                        stroke={logoPos.primary}
                        strokeWidth={logoPos.strokeWidth}
                        onClick={props.onClick}
                        shadowColor='black'
                        shadowBlur="10"
                        shadowOffset={[20, 20]}
                    />
                    
                </Group>
                
                <Group draggable={true}>
                    <Text 
                        x={logoPos.x/1.8}
                        y={logoPos.y/2}
                        fontFamily="Orbitron"
                        fontSize="80"
                        shadowColor='black'
                        shadowBlur="20"
                        shadowOffset={[20, 20]}
                        align="center"
                        fill={logoPos.primary}
                        text="M"
                    />
                    <Text 
                        x={logoPos.x * 1.75}
                        y={logoPos.y / 2}
                        fontFamily="Orbitron"
                        fontSize="80"
                        shadowColor='black'
                        shadowBlur="20"
                        shadowOffset={[20, 20]}
                        align="left"
                        fill={logoPos.primary}
                        text="appr"
                    />
                </Group>
            </Layer>
        </Stage>
    );
}

/*
<RegularPolygon 
                      x={0}
                      y={0}
                      sides="4"
                      width={800}
                      height={800}
                      rotation="45"
                      radius={logoPos.radius}
                      fill="#62757f"
                    //   stroke="#62757f"
                    //   strokeWidth={logoPos.strokeWidth}
                    />
                
<Group draggable={true}>
                    <Text 
                        fontFamily="Orbitron"
                        fontSize="40"
                        fill={logoPos.primary}
                        text="appr"
                    />
                </Group>
<Line 
                        points={[logoPos.x, logoPos.y-logoPos.radius, logoPos.x, logoPos.y + logoPos.radius / 3]}
                        stroke={logoPos.secondary}
                        strokeWidth={logoPos.strokeWidth}
                    />
<Group draggable={true}>
                    <RegularPolygon 
                      name="logo"
                      x={logoPos.x * 1.5}
                      y={logoPos.y * 1.5}
                      sides={logoPos.sides}
                      radius="10"
                      fill="#62757f"
                      stroke={logoPos.primary}
                      strokeWidth={logoPos.strokeWidth}
                    />
                </Group>
                <Group draggable={true}>
                    <RegularPolygon 
                      name="logo"
                      x={logoPos.x * 2}
                      y={logoPos.y * 2}
                      sides={logoPos.sides}
                      radius="10"
                       fill="#62757f"
                      stroke={logoPos.primary}
                      strokeWidth={logoPos.strokeWidth}
                    />
                </Group>
*/