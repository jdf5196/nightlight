import React from 'react';

const Navbar = ()=>{
	return(
		<div>
			<nav className='navbar navbar-inverse navbar-fixed-top'>
				<div className='container'>
					<div className='navbar-header'>
						<p className='navbar-brand'><a href="/#/">NightLight</a></p>
					</div>
				</div>
			</nav>
			<div className='push'></div>
		</div>
	)
}

export default Navbar