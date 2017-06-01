import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import Dialog from 'material-ui/Dialog';
// import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
// import { connect } from 'react-redux';

const style = {
    margin: '10px 0'
};

class ImagePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            methodSelected: 'fromUrl',
            accepted: [],
            rejected: []
        }
    
    }
    
    componentWillMount(){
        // console.log(this);
    }
    
    render() {
        return(
            <Dialog
                autoScrollBodyContent={true}
                title="Add background image"
                open={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                actions={[
                    <FlatButton 
                        label="Cancel" 
                        onTouchTap={this.props.onRequestClose}
                    />,
                    <FlatButton 
                        label="Add"
                        disabled={true}
                    />
                ]}
            >
                <Subheader>Choose an image import method.  <span style={ {color: 'red'} }>(Pending feature.)</span></Subheader>
                <RadioButtonGroup 
                    name="getImageMethod"
                    defaultSelected={this.state.methodSelected}
                    onChange={(event, value) => {
                        this.setState({ methodSelected: value });
                        console.log(this.state);
                    }}
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
                {
                    (this.state.methodSelected === 'fromUrl') ?
                    <TextField
                      style={style}
                      floatingLabelText="URL"
                      fullWidth={true}
                    /> :
                    <Paper style={style}>
                        <Dropzone className="dropzone"
                            accept="image/jpeg, image/png"
                            onDrop={(accepted, rejected) => {
                                console.log('onDrop called! accepted, rejected:');
                                for (let i in accepted) {
                                    if (this.state.accepted.indexOf(accepted[i].name) < 0){
                                        let tmpAccepted = [
                                            ...this.state.accepted,
                                            accepted[i].name
                                        ];
                                        this.setState({ accepted: tmpAccepted });
                                    }
                                }
                                for (let i in rejected) {
                                    if (this.state.rejected.indexOf(rejected[i].name) < 0){
                                        let tmpRejected = [
                                            ...this.state.rejected,
                                            rejected[i].name
                                        ];
                                        this.setState({ rejected: tmpRejected });
                                    }
                                }
                                console.log(accepted);
                                console.log(rejected);
                            }}
                        >
                            <Subheader 
                                style={ 
                                    { 
                                    textAlign: "center",
                                    margin: "10px auto"
                                    } 
                                }
                            >
                                <p className="imagepicker-text"><b>Drag an image here</b></p>
                                <p className="imagepicker-text">or click to browse files.</p>
                            </Subheader>
                            
                        </Dropzone>
                    </Paper>
                }
            </Dialog>    
        );
        
    }
}

export default ImagePicker;

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