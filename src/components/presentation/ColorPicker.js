import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

export default function ColorPicker(props){
    
    const actions = [
        <FlatButton 
            label="Cancel" 
            primary={true}
            onTouchTap={props.onRequestClose}
        />,
        <FlatButton 
            label="Add"
            // disabled={!inputIsValid}
            onTouchTap={props.onRequestClose}
        />    
    ];
    
    return (
        <Dialog
            title="Add new color"
            actions={actions}
            modal={false}
            open={props.isOpen}
            // onRequestClose={props.onRequestClose}
        >
            <TextField
                hintText="Ex: #00BCD4"
                // errorText={!inputIsValid && "This field is required"}
                floatingLabelText="Color"
                onChange={ (evt, newVal)=>props.validateInput(newVal) }
            />
            
            {/*The actions in this window were passed in as an array of React objects.*/}
        </Dialog>
    );
}