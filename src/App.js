/*
  Filename: App.js
  Author: Quang Nguyen
  Date: Dec 12, 2019
  Purpose: this class has a root component that will gather and handle other
           components
*/

import React from 'react';
import {isMobile,isBrowser,MobileView, BrowserView} from 'react-device-detect';
import './App.css';
import BookList from './Components/Book/BookList';
import BookInformation from './Components/BookInformation/BookInformation';
import ReadingList from './Components/ReadingList/ReadingList';
import SearchBox from './Components/SearchBox/SearchBox';
import Footer from './Components/Footer/Footer';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Button from '@material-ui/core/Button';
import CheckBox from './Components/CheckBox/CheckBox.js'
import Grid from '@material-ui/core/Grid';
import { SolarSystemLoading } from 'react-loadingg';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import Hidden from '@material-ui/core/Hidden';
const search = {
  search: '',
}
class App extends React.Component {
  bookList = (handle) =>{
    return (
    <div>
          <BookList books = {handle} 
                    maxComponent={this.state.maxComponent}
                    readMore = {this.onClickReadMore} 
                    isToggleOn = {this.state.isToggleOn}
                    onClickReadingList= {this.onClickReadingList}
                    route ={this.state.route}
                    userID = {this.state.user.id}
                    /> 
          {
            this.state.maxComponent <this.state.books.length 
            ? // check if maxComponent still less than array.length, 
              //if yes, then display load more button
            <Button 
          onClick={this.onExtendComponent}
          variant="contained"
          color="secondary"
          startIcon={<ArrowDropDownCircleIcon />}>Load More</Button>
            : // else, if maxComponent greater than array.length, disable load more button
          <Button 
          onClick={this.onExtendComponent}
          variant="contained"
          color="disable"
          startIcon={<ArrowDropDownCircleIcon />}
          >Load More</Button>
          }
            </div>
            )
  }
  constructor(){
    super();
    this.state = {
      books: [], // hold all the book data searched by the user, maximum 40 elements
      searchfield:'react', // set the default display when first loaded 
      hasError: false,
      isLoading: true, 
      isChange:false,
      maxComponent:10, // only 10 components display at a time
      isReadMore: false, 
      route: 'home',
      isbn:'',
      author:'',
      title:'',
      description:'',
      category:'',
      image:'',
      publishedDate:'',
      publisher:'',
      pageCount:'',
      country: '',
      isToggleOn:true,
      categories: [], // hold all the book categories (including duplicates)
      checkedCategories: [], // hold all the book categories (excluding duplicates)
      newBooksWhenchecked: [], // hold all the books that are matching the category
      isUsingFilter: false,
      readingList: [], // reading list 
      user: { // store the user information
        id:'',
        name: '',
        email: '',
      }
    }
  }
  loadUser = (data)=>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email
    }})
  }
  onRouteChange = (route) => {
    this.setState({route: route});
    if(this.state.route === 'list'){
      this.setState({isChange:false})
    }
  }
  // fetchAPI() function will fetching resources from the google book API
  // then assign it to the books array
  fetchAPI = (param) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${param}&maxResults=40`)
    .then(response => response.json())
    .then(data => {
      if(data){
      data.items.map((book,id) => 
        this.state.categories.push(data.items[id].volumeInfo.categories))
      this.setState({books: data.items})
      }
    }
    ).catch(err => this.setState({books: undefined}));
  }

  // handleChecked function will add category to the array if the user selected
  handleChecked = (data) =>{
    this.state.checkedCategories.unshift(data)
    this.onClickFilter();
  }
  // handleUnChecked function will remove category from the array if the user unselected
  handleUnChecked = (data) =>{
    var index = this.state.checkedCategories.indexOf(data)
    this.state.checkedCategories.splice(index,1)
    this.onClickFilter()
  }
  // onClickFilter function will store any book that matches with the selected caterogy
  onClickFilter = () => {
  if(this.state.checkedCategories.length >0){
    if(this.state.books){
      var array = []
     this.state.checkedCategories.map(checked => {
      return this.state.books.filter((category,id) => {
           if(checked.indexOf(category.volumeInfo.categories) > -1){
            array.push(category)
           }
      })
   })
   this.setState({newBooksWhenchecked: array, isUsingFilter:true})
 }
} else {
  this.setState({isUsingFilter:false})
}
}
  // This function will reset the filter when the user switch to different routes
  onClickSetFilter = ()=>{
    this.setState({isUsingFilter: false, newBooksWhenchecked: [],
      checkedCategories:[],isReadMore:false})
  }
  // onClickReadMore function will store information when the user click Read More button
  onClickReadMore = (isbn, author,title,description,category,image,publishedDate,publisher, pageCount,country) =>{
    this.setState({isReadMore: true,isbn:isbn,author:author,title:title,
      description:description,category:category,image:image,publishedDate:publishedDate,
      publisher:publisher,pageCount:pageCount, country:country,
      checkedCategories:[], newBooksWhenchecked: this.state.books})
  }
  // onClickReadingList will add the book information to the readingList array
  onClickReadingList = (title, author, isbn,description,category,image,publishedDate,publisher, pageCount,country) => {
    this.state.readingList.push({title: title, author: author, isbn: isbn, description: description,
              category:category, image:image,publishedDate:publishedDate,publisher:publisher,
              pageCount:pageCount,country:country})
  }
  // back to the home page
  onClickGoBack = () => {
this.setState({maxComponent: 10,isReadMore:false})
  }
  // back to the reading list
  onClickGoBackToList = () =>{
    this.setState({isChange: false})
  }

  onClickReadInfoInList = () =>{
    this.setState({isChange: true})
  }
  // fetch the information when the page first loaded
  componentDidMount(){
    document.title='Book Information'
    this.fetchAPI(this.state.searchfield);
    this.setState({isLoading: false})
  }
  // catch any error
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  onSearchChange = (event) => {
    search.search = event.target.value
  }
  //onSubmitChange function will display book information bases on the user search
  onSubmitChange = () => {

    if(search.search){
    this.fetchAPI(search.search)
    this.setState({maxComponent: 10,isReadMore:false,
              categories:[],newBooksWhenchecked:[],isUsingFilter:false,
              checkedCategories:[],
              route: this.state.route === 'signedIn' || this.state.route ==='list'
              ? 'signedIn' : 'home'})
    }
  }
  // this function will add 10 more components if click
  onExtendComponent =() => {
    this.setState({maxComponent: this.state.maxComponent+10})

  }


  render() {
    // console.log = console.warn = console.error = () => {};



  return (

    <div className = 'App'>
      
      <Navigation route = {this.state.route} onRouteChange={this.onRouteChange}
                name={this.state.user.name} filter ={this.onClickSetFilter}/>
        <MobileView>
        <h2 style={{color: '#B22222'}}>Because the project is completed in React, 
        mobile users may not experience it well. Please use any browser on your computer for a better experience.
        This project will be developed on a mobile platform in the future!</h2>
        </MobileView>
      {
      this.state.route === 'login' ?
      <SignIn onRouteChange={this.onRouteChange} loadUser ={this.loadUser}
            onClickSetFilter={this.onClickSetFilter}/>
      : (this.state.route === 'register')?
      <Register onRouteChange={this.onRouteChange} loadUser= {this.loadUser}
        onClickSetFilter={this.onClickSetFilter}/>
      :
      <div>
            <Grid container spacing={0}>
      
      
      <Grid item xs={12}>

      <SearchBox searchChange = {this.onSearchChange} submitChange = {this.onSubmitChange}
                  /> </Grid></Grid>
    {
    this.state.route === 'home' || this.state.route === 'signedIn'
    ?
    <div >
    
      {
        !this.state.isReadMore ? // check if the user click read more, if not then.
        <div className='wrapper main'>

      { 
        this.state.books === undefined 
        ?
        <div >
        <h1>We could not find your book in our system :( please try again!</h1>
        </div>
        :
        <div>
        <Grid container item={true}>
      <Grid xs={3} item={true} >
      <Hidden smDown>
      <CheckBox categories={this.state.categories}
                        handleChecked={this.handleChecked}
                        handleUnChecked={this.handleUnChecked}/>    
      </Hidden>    
      </Grid>
      <Grid  xs={9} item >
      {
        this.state.books.length 
        ? // if the books array is not empty
          !this.state.isUsingFilter
          ? // if users are not using filter search
          this.bookList(this.state.books)
          : // if the users are using filter
          this.bookList(this.state.newBooksWhenchecked)
        : // loading when render
        <Grid xs={5} item><SolarSystemLoading style={{marginRight:'20px',marginLeft:'70%'}} 
         color="red" size="large"/></Grid>
      }

      </Grid>
      </Grid>
        </div>
      }
      </div>
      : // if the user click on read more ,then
      <div className='wrapper main'>
      <BookInformation isbn={this.state.isbn}
      author={this.state.author}
      title={this.state.title}
      description={this.state.description}
      image={this.state.image}
      publisher={this.state.publisher}
      publishedDate={this.state.publishedDate}
      country={this.state.country}
      category={this.state.category}
      pageCount={this.state.pageCount}
       onClickGoBack ={this.onClickGoBack}/>
       </div>
      }
      
      </div>
      : (this.state.route === 'list')? // check if user click on reading list
      <div className='wrapper main'>
      <ReadingList data={this.state.readingList} isChange={this.state.isChange}
                  onClickReadInfoInList={this.onClickReadInfoInList}
                  onClickGoBackToList={this.onClickGoBackToList}
                  userID = {this.state.user.id}
                         />
      </div> // end is signed in
      :
      <div></div> // else, nothing
      } 
      </div>
    } 
      <div style={{height:'150px'}}></div>
      <div style={{ backgroundColor:'#f7797d'}}>
      <Footer isLoading={this.state.isLoading}/></div>
      </div> 
   
  ); // return
  
} // end render()
} // end class


export default App;
