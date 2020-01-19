/*
  Filename: SearchBox.js
  Author: Quang Nguyen
  Date: Dec 17, 2019
  Purpose: SearchBox component will display the logo, search field and search buton  
*/

import React from 'react';
import Logo from '../Logo/Logo';

const SearchBox = ({searchChange,submitChange, categories}) => {
	return (
		

		<div>
		<div style={{  display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
			<Logo className='fl w-third center logo' /></div>
			<div className='center'>

				<div className='form center pa4 br4  black'>
					<input className='f4 pa2 w-40 center' type='text'
					 onChange={searchChange}
					 placeholder='Enter Book Title, Author or ISBN'/>
					<button className='w-20 grow f4 link ph3 pv3 dib white ' style={{backgroundColor: '#f7797d'}}
					 onClick = {submitChange} >Search</button>
					
				</div>
			</div>

		</div>
		);
}

export default SearchBox;
