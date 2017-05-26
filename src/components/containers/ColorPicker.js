import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { addColorToPalette, selectColor } from '../../actions';

class ColorPicker extends Component {
    
    constructor(props){
        super(props);
        this.validateInput = this.validateInput.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.state = {
            lengthIsValid: false,
            inputIsValid: true,
            input: ''
        };
    }
    
    addNewColor(){
        if (this.state.lengthIsValid && this.state.inputIsValid) {
            this.props.addColorToPalette(this.state.input.toUpperCase());
        }
        this.props.onRequestClose();
    }
    
    validateInput(event, input) {
        // console.log(event, input);
        // if (input) {
            let hexRegex=/^#?([A-F]|[0-9]){3,6}/ig;
            this.setState({ 
                lengthIsValid: (input.length >= 3 ),
                inputIsValid: hexRegex.test(input),
                input
            });    
        // }
    }
    
    render(){
        return (
            <Dialog
                title="Add new color"
                // modal={false}
                open={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                actions={[
                    <FlatButton 
                        label="Cancel" 
                        // primary={true}
                        onTouchTap={this.props.onRequestClose}
                    />,
                    <FlatButton 
                        label="Add"
                        disabled={!this.state.inputIsValid || !this.state.lengthIsValid}
                        onTouchTap={this.addNewColor}
                    />
                ]}
            >
                <TextField
                    hintText="Ex: #00BCD4"
                    errorText={!this.state.inputIsValid && "Valid hex code required"}
                    floatingLabelText="Color"
                    // value={this.props.user.input}
                    // onChange={ (evt, newVal)=>this.props.validateInput(newVal) }
                    onChange={this.validateInput}
                />
                
                {/*The actions in this window were passed in as an array of React objects.*/}
            </Dialog>
        );
    }
    
    
}

const mapStateToProps = (state) => {
    return { 
        user: state.user
    };
};

const mapDispatchToProps =(dispatch) => {
    return { 
        addColorToPalette: (color)=>{
            dispatch(addColorToPalette(color));
            dispatch(selectColor(color));
        }
    };
};

ColorPicker = connect(mapStateToProps, mapDispatchToProps)(ColorPicker);

export default ColorPicker;