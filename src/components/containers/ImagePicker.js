import React, { Component } from 'react';
// import Dropzone from 'react-dropzone'
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
// import { connect } from 'react-redux';

const style = {
    margin: '10px 0'
};

class ColorPicker extends Component {
    
    render() {
        return(
            <Dialog
                title="Add new color"
                open={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                actions={[
                    <FlatButton 
                        label="Cancel" 
                        onTouchTap={this.props.onRequestClose}
                    />,
                    <FlatButton 
                        label="Add"
                        // disabled={!this.state.inputIsValid || !this.state.lengthIsValid}
                        onTouchTap={console.log}
                    />
                ]}
            >
                <Subheader>Choose an image import method.</Subheader>
                <RadioButtonGroup 
                    name="getImageMethod"
                    defaultSelected="fromUrl"
                >
                    <RadioButton 
                        value="fromUrl"
                        label="Add image from URL"
                        style={style}
                    />
                    <RadioButton 
                        value="fromUpload"
                        label="Upload a saved image"
                        style={style}
                    />
                </RadioButtonGroup>
                <Divider />
            </Dialog>    
        );
        
    }
}

export default ColorPicker;

/*
<Subheader>Add image from URL</Subheader>
                <Divider/>
                <Subheader>Upload a saved image.</Subheader>
                
<FlatButton 
    label="Add from URL" 
    onTouchTap={console.log}
/>
<FlatButton 
    label="Upload local file" 
    onTouchTap={console.log}
/>
*/