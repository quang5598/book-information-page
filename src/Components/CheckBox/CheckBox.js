/*
  Filename: CheckBox.js
  Author: Quang Nguyen
  Date: Dec 22, 2019
  Purpose: CheckBox component will filter the category bases on the user-selected 
          and display any book that matches that category.  
*/

import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class CheckBox extends React.Component{

  handleChange = (event) =>{
    if(event.target.checked){
    this.props.handleChecked(event.target.value)
  }else {
    this.props.handleUnChecked(event.target.value)
  }

  }

  render(){
    const {categories} = this.props;
    var flags = [], output = [], l = categories.length, i;

for( i=0; i<l; i++) {
  if(categories[i] !== undefined){
    if( flags[categories[i]]) continue;
    flags[categories[i]] = true;
    output.push(categories[i]);
  }
    } // end for

    return(
        <div className='pa4'>
        <FormGroup column="true" style={{textAlign:'left'}}>    
      {

    output.map((category,id) => {
     return(
        <div key={id}>
        <FormControlLabel 
        control={
          <Switch key={id} onChange={this.handleChange} value={category} />
        }
        label={category}
      />
      </div>

     ) // end map return
    }) // end map
      } 
      </FormGroup>

  </div>
      )// end return
  }
} // end class

export default CheckBox;