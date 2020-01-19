/*
  Filename: Navigation.js
  Author: Quang Nguyen
  Date: Jan 07, 2020
  Purpose: Navigation component displays the navigation bar to navigate 
    through different routes (Sign in, Register, Log Out or Reading List )  
*/
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import './Navigation.css'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f7797d'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  
}));


const Navigation = ({route, onRouteChange, name, filter}) => {
	  const classes = useStyles();
    const onClickHomePage = (currentRoute) => {
    filter();
    (currentRoute === 'signedIn' || currentRoute ==='list') ? onRouteChange('signedIn')
    : onRouteChange('home');
      }
	return (
		<div  >
		
		 <AppBar position="static" className={classes.root} >
        <Toolbar>
          <IconButton 
          onClick={() => onClickHomePage(route)} edge="start"
      		 className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon />
          </IconButton>
          {
          	route === 'home' || route === 'register' || route ==='login'?
          	<Typography variant="h6" id='logo'  className={classes.title} >
           Sign Up Now to Save Your Favorite Books to a Reading List 
          </Typography>	
          :
          <Typography variant="h6" id='logo' className={classes.title}>
           Welcome! {name}, Try Out the New Reading List Function! 
          </Typography>	
          }
          
          {
			route === 'home' || route === 'register' || route ==='login' 
			?
			<div>
          <Button color="inherit" onClick= {() => onRouteChange('login')} >Login</Button>
           <Button color="inherit" onClick= {() => onRouteChange('register')}>Register</Button>
         </div>
          : 
          <div>
           <Button color="inherit" onClick= {() => onRouteChange('list')} >Reading List</Button>
           <Button color="inherit" onClick= {() => onRouteChange('home')} >Log Out</Button>
           </div>
      }
        </Toolbar>
      </AppBar>
     

		

		</div>
		);
}


export default Navigation;