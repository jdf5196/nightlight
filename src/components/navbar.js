import React from 'react';

const Navbar = (props)=>{
	const loggedIn = ()=>{
		if(props.currentUser != ''){
			return <p>{props.currentUser}</p>
		}else{
			return <p>Not Logged In</p>
		}
	}
	return(
		<div>
			<nav className='navbar navbar-inverse navbar-fixed-top'>
				<div className='container'>
					<div className='navbar-header'>
						<p className='navbar-brand'><a href="/#/">NightLight</a></p>
					</div>
					{loggedIn()}
				</div>
			</nav>
			<div className='push'></div>
		</div>
	)
}

export default Navbar