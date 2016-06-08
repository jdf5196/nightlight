import React from 'react';
import Navbar from './navbar.js';
import Footer from './footer.js';
import Barlist from './barlist.js';

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			bars: {businesses: [{name: ''}]}
		}
	}
	getBars(e){
		e.preventDefault();
		console.log(this.refs.location.value)
		$.ajax({
			type: 'POST',
			url: '/getbars',
			data: {location: this.refs.location.value},
			success: (data)=>{
				this.setState({bars: data})
			}
		})
	}
	render(){
		return(
			<div>
				<Navbar />
				<p>Hello</p>
				<form>
					<input type='text' ref='location' placeholder='Location'/>
 					<button onClick={this.getBars.bind(this)} className='btn btn-danger'>Button!</button>
				</form>
					<Barlist bars={this.state.bars.businesses} />
				<Footer />
			</div>
		)
	}
}

export default Home