/*
  Filename: BookInformation.js
  Author: Quang Nguyen
  Date: Jan 02, 2020
  Purpose: BookInformation component displays detailed information about the book  
*/

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

class BookInformation extends React.Component{
constructor(props){
		super(props);
		this.state = {
			title: '',
			author: '',
			image:'',
			description:'',
			publishedDate:'',
			publisher:'',
			pageCount:'',
			category:'',
			country:'',
			
		}
	}
	
	componentDidMount(){
    this.setState({title: this.props.title,
      				 author: this.props.author,
      				image: this.props.image,
      				description: this.props.description,
      				publishedDate: this.props.publishedDate,
      				publisher:this.props.publisher,
      				category: this.props.category,
      				pageCount: this.props.pageCount,
      				country: this.props.country,})
   
  }


render(){
	if(!this.state.title){

	}
	return(
		<div >
		
        
		<Grid container >
		<Grid xs={1} item={true}></Grid>
		<Grid xs={10} item={true}><Box ><h1 className='shadow-5  pa-3'>{this.state.title}</h1></Box>
		<Divider light/>
		</Grid>
		<Grid xs={1} item={true}></Grid>
		<Grid xs={1} item={true}></Grid>
		<Grid xs={2} item={true} className='pa3  br bl b--black-20'>
		<img src={this.state.image} alt=''  />
		<Typography variant='h5' style={{ paddingTop:'30px'}}
		 className='pa-3 bb b--black-20'>Information</Typography>
		 <div style={{textAlign: 'left'}}>
		 <Typography><span className='b'>Authors:</span> {this.state.author}</Typography>	
		 <Typography><span className='b'>Publisher:</span> {this.state.publisher}</Typography>	
		 <Typography><span className='b'>Published Date:</span> {this.state.publishedDate}</Typography>
		 <Typography><span className='b'>ISBN:</span> {this.props.isbn}</Typography>
		 <Typography><span className='b'>Category:</span> {this.state.category}</Typography>
		 <Typography><span className='b'>Page Count:</span> {this.state.pageCount} pages</Typography>
		 <Typography><span className='b'>Country:</span> {this.state.country}</Typography>
		 </div>
		</Grid>
		<Grid xs={8} item={true} >
		<Typography variant='h5' className='bb pa-3 b'
		style={{textAlign:'left',paddingLeft:'2px'}}>Synopsis</Typography>
		<Typography variant="subtitle1" 
		style={{textAlign: 'justify',padding:'10px',textIndent:'2em'}}>
		{this.state.description}
		</Typography>
		<Button 
		variant="contained"
        color="primary"
        startIcon={<KeyboardReturnIcon />}
        onClick={this.props.onClickGoBack}>Go Back</Button>

		</Grid>
		<Grid xs={1} item={true}></Grid>

		</Grid>
		</div>
		);

	}
}



export default BookInformation;