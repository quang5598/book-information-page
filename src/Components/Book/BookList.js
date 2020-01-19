/*
  Filename: BookList.js
  Author: Quang Nguyen
  Date: Dec 15, 2019
  Purpose: Booklist component is assigned with an array of books 
  		   and gives the information to each Book component.  
*/

import React from 'react';
import Book from './Book';

const BookList = ({userID,route,books, maxComponent, readMore,onClickReadingList}) => {
	try {
	return (

	<div className='container'>
	{

		books.slice(0,maxComponent).map((book, id) => {

			try {
				if(books[id].volumeInfo && books[id].searchInfo){
				return (
					<Book
				key={id}		
				title={books[id].volumeInfo.title} 
				author= {books[id].volumeInfo.authors} 
				description ={books[id].volumeInfo.description} 
				image ={books[id].volumeInfo.imageLinks.thumbnail} 
				publishedDate={books[id].volumeInfo.publishedDate}
				textSnippet={books[id].searchInfo.textSnippet}
				category = {books[id].volumeInfo.categories[0]}
				isSignedIn = {true}
				readMore = {readMore}
				isbn={books[id].volumeInfo.industryIdentifiers[0].identifier}
				publisher = {books[id].volumeInfo.publisher}
				pageCount= {books[id].volumeInfo.pageCount}
				country ={books[id].saleInfo.country}
				onClickReadingList = {onClickReadingList}
				route={route}
				userID = {userID}
				/>);
			}
			
			} catch (e){
			}
			})

	}


	</div>
	);
} catch (ee){
	return (<h1>We could not find your book in our system :( please try again!</h1>)
}
}

export default BookList;

