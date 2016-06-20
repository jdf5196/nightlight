import React from 'react';

const Navbar = (props)=>{
	const loggedIn = ()=>{
		if(props.currentUser != ''){
			return <ul className='nav navbar-nav navbar-inverse'>
						<li><a href='#' data-toggle='collapse' data-target='.in'>{props.currentUser}</a></li>
						<li><a href='#' onClick={props.logOut.bind(this)} data-toggle='collapse' data-target='.in'>Logout</a></li>
					</ul>
		}else{
			return <ul className='nav navbar-nav navbar-inverse'>
						<li><a href='/login/twitter' data-toggle='collapse' data-target='.in'>Login</a></li>
					</ul>
		}
	}
	return(
		<div>
			<nav className='navbar navbar-inverse navbar-fixed-top'>
				<div className='container'>
					<div className='navbar-header'>
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapse">
        					<span className="sr-only">Toggle navigation</span>
        					<span className="sr-only">Toggle navigation</span>
        					<span className="glyphicon glyphicon-align-justify"></span>
  						</button>
						<p className='navbar-brand'><a href="/#/">NightLight</a></p>
					</div>
					<div className='collapse navbar-collapse' id='collapse'>
						{loggedIn()}
					</div>
				</div>
			</nav>
			<div className='push'></div>
		</div>
	)
}

export default Navbar