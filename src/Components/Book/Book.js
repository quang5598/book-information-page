/*
  Filename: Book.js
  Author: Quang Nguyen
  Date: Dec 12, 2019
  Purpose: Book component will handle the information of each book
*/
import React from 'react';
import './Book.css';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const checkAuthor =(author)=>{
	if(author){
		return author;
	} else {
		return 'N/A'
	}
}

const checkTitle =(title)=>{
if(title){
		return title;
	} else {
		return 'N/A'
	}
}

const checkImage = (image)=>{
	if(image){
		return image;
	} else {
		return 'http://www.annetteoppenlander.com/wp-content/uploads/2016/04/book-cover-question-mark-image.png'
	}
}

const checkTextSnippet = (textSnippet)=> {
	if(textSnippet){

		return textSnippet.replace(/[^a-zA-Z .,]/g, "");
	} else {
		return 'N/A'
	}
}
const checkCategory = (category) =>{
	if(category){
		return category;
	} else {
		return 'N/A'
	}
}

const checkPublishedDate = (publishedDate) =>{
	if(publishedDate){
		return publishedDate;
	} else {
		return 'N/A'
	}
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  close: {
    padding: theme.spacing(0.5),
  },
  isToggleOn: true,
  isDisabled: true,
}));


const Book = 
({userID,route,onClickReadingList,title, author, description,image, textSnippet, category,publishedDate,isSignedIn,readMore,isbn,country, pageCount, publisher}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
    const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = newState => () => {
  	fetch('https://secure-refuge-83591.herokuapp.com/addtolist' , {
			method:'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: userID,
				title: checkTitle(title),
				author:checkAuthor(author),
				isbn : isbn,
				description:description,
				category:category,
				image:image,
				publishedDate:publishedDate,
				publisher:publisher,
				pageCount:pageCount,
				country:country
			})
		}).then()
  	setState({ open: true, ...newState });
  };


  const handleClose = () => {
    setState({ ...state, open: false });
  };


  
  if(isSignedIn){
  	classes.isDisabled = false;
  }else {
  	classes.isDisabled = true;
  }


  const handleExpandClick = () => {
    onClickExpand();

    setExpanded(!expanded);
  };
  const onClickExpand = () => {
  	if(!expanded){
  		classes.isToggleOn = false;
  	} else {
  		classes.isToggleOn = true;
  	}
  	}


	return(
		<div>
		<div className='tc grow br3 pa3 ma2 dib bw2 shadow-5 measure-narrow
						   box'>
			
			<Box textOverflow="ellipsis" variant="h3">
			<CardHeader
        avatar={
        	<Tooltip title={checkCategory(category)} placement="right">
          <Avatar aria-label="recipe" className={classes.avatar}>
            {checkCategory(category).charAt(0)}
          </Avatar>
          </Tooltip>
        }
        action={
        	(route === 'home') ?
        	<Tooltip title='Please Sign In to Use This Function'
        	 placement="left">	
          <IconButton aria-label="settings" >
            <ImportContactsIcon  color='disabled'/>
          </IconButton>
          </Tooltip>
          :
          <div>
          <Tooltip title='Add This Book to Your Reading List'
        	 placement="left">	
          <IconButton aria-label="settings"  
          onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}
          >
            <ImportContactsIcon color='secondary' />
          </IconButton>
          </Tooltip>
         <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={2500}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        message={ 'Added "' + title + '" to your reading list'}
      />
      </div>
        }
        subheader={checkPublishedDate(publishedDate)}
        title='Published Date'
      />

			  <Typography color='textPrimary' 
			  noWrap={classes.isToggleOn} 
			  id='text'
			  display='initial' variant="h4" >{checkTitle(title)}
			  </Typography>
			  			<img src={checkImage(image)} alt='' height='200px' width ='150px'/> 

			<h3>Author</h3>
			<Typography variant="h5" color='textSecondary' 
			noWrap={classes.isToggleOn}  >{checkAuthor(author)}</Typography>
			
			</Box>
			<IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}

          aria-expanded={expanded}
          aria-label="show description"
        >
          <ExpandMoreIcon />
        </IconButton>
         <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent >
          <Typography paragraph>Description:</Typography>
          <Typography paragraph className='tooltip' >
            {checkTextSnippet(textSnippet)}
          </Typography>
          <Box component='div'>
           <Button variant="contained" color="primary" 
           onClick={() => {readMore(isbn,author,title,description,category,image,publishedDate,publisher, pageCount,country)}}>
     		 Read More
    		</Button>
    		</Box> 
        </CardContent>
      </Collapse>
		</div>
		</div>
		);
}

export default Book;


