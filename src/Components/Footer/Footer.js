import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = ({isLoading})=>{
	return(
		<div className='br--left shadow-5 code white bold' style={{ paddingBottom:'20px'
		}}>
		<p className='ttu' style={{padding:'30px', fontWeight:'1000'}}>
        About the project
      </p>
      <div style={{fontWeight:'500',textAlign:'left',paddingLeft:'10px'}} className='white'>
      <p style={{textIndent:'30px'}}>
        Book Information Page is built on a Javascript library called React.
     The page will fetch information from the Google Books APIs to retrieve book information
     based on user searches. Users can login or register to use the Reading List function 
     where users can store their favorite books.
     </p>
     <p style={{textIndent:'30px'}}>
     The project uses node.js and express.js as a back-end server to receive and send back data to the front-end (React).
     User information will be stored in the database management system called PostgreSQL.
	Both back-end server and database were deployed in a cloud platform called Heroku.</p>
      </div>
		<div>
		<a style={{color:'inherit',textDecoration: 'none'}} 
		href='https://github.com/quang5598'
		target="_blank">
		<GitHubIcon fontSize='large' className='grow pointer' 
		style={{paddingRight:'30px'}} /></a>
		<a style={{color:'inherit',textDecoration: 'none'}} 
		href='https://www.linkedin.com/in/quang-nguyen-730b28195'
		target="_blank">
		<LinkedInIcon fontSize='large' className='grow pointer' href='' />
		</a></div>


		</div>
		); // end return
}

export default Footer;