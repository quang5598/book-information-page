import React from 'react';
import Tilt from 'react-tilt';
import image from './magic-book.png'
import './Logo.css'
const Logo = () => {
	return (
		<div className='logo'>
	<Tilt className="Tilt" options={{ max:55 }} style={{ height: 200, width: 200 }} >
 <div className="Tilt-inner"> <img src={image} alt="" /> </div>
</Tilt>

		</div>
		)
}

export default Logo;