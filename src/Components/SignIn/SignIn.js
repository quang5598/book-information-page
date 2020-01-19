/*
  Filename: SignIn.js
  Author: Quang Nguyen
  Date: Jan 09, 2020
  Purpose: SignIn Component allows users to sign in and use the reading list function 
*/
import React from 'react';
import Button from '@material-ui/core/Button';

class SignIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			error: false,
		}
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	
	}
	onPassWordChange = (event) => {
		this.setState({password: event.target.value})
	}
	onSubmitSignIn = ()=>{

		fetch('https://secure-refuge-83591.herokuapp.com/signin' , {
			method:'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
			})
		}).then(response => response.json())
		.then(user =>  {
			if(user.id){
			this.props.onClickSetFilter()
			this.props.loadUser(user)
			this.props.onRouteChange("signedIn")
			this.setState({error:false})
			} else {
				this.setState({error:true})
			}
			})
	}
	render(){
		return (
			<div>
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
	<main className="pa4 black-80">
	  <div className="measure">
	    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
	      <div className="mt3">
	        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
	        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email"
	         name="email-address"  id="email-address" onChange ={this.onEmailChange}  />
	      </div>
	      <div className="mv3">
	        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
	        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
	        type="password" name="password"  id="password" onChange = {this.onPassWordChange}  />
	      </div>
	      { this.state.error?
	      <div className="mv3">
	        <label className="db fw6 lh-copy f6" style={{color:'red'}} htmlFor="warning">Wrong username or password</label>
	      </div>
	      :
	      <div></div>
	 	 }
	    </fieldset>

	    <div className="">
	      <Button variant="contained"
            color="secondary" className='w-100'
            onClick= {this.onSubmitSignIn}>Sign In</Button>
	    </div>
	    <div className="lh-copy mt3">
	    <p>Don't have an account?</p>
	    <Button 
            color="primary" onClick={() => this.props.onRouteChange('register')}>Register Now</Button>
	    </div>
	  </div>
	</main>
	</article>
	
			</div>
			)
	}

}


export default SignIn;