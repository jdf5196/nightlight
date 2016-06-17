import React from 'react';
import Navbar from './navbar.js';
import Footer from './footer.js';
import Barlist from './barlist.js';
import Auth from '../javascripts/auth.js';

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			bars: [],
			user: ''
		}
	}
	componentWillMount(){
		let user = Auth.currentUserName();
		let userId = Auth.currentUserId();
		let location = ''
		console.log(userId)
		if(Auth.location() == '' && !localStorage.getItem('location')){
			location = ''
		}else if(Auth.location() != ''){
			location = Auth.location()
		}else{
			location = localStorage.getItem('location')
		};
		if(location != ''){
			$.ajax({
				type: 'POST',
				url: '/initial',
				data: {location: location, user: userId},
				success: (data)=>{
					let updateUser = Auth.currentUserName();
					this.setState({bars: data, user: updateUser})
				}
			})
		}else{
			this.setState({user: user})
		}
		
	}
	going(data){
		let bars = this.state.bars;
		let bar = bars[bars.indexOf(data)];
		if(bar.Attending.indexOf(this.state.user) > -1){
			bar.Attending.splice(bar.Attending.indexOf(this.state.user), 1)
		}else{
			bar.Attending.push(currentUser);
		}
		$.ajax({
			type: 'POST',
			url: '/going',
			data: data,
			success: (data)=>{
				this.setState({bars: data})
			}
		})
	}
	getBars(e){
		e.preventDefault();
		if(!this.refs.location.value){
			console.log('Meh')
			return
		}
		localStorage.setItem('location', this.refs.location.value);
		$.ajax({
			type: 'POST',
			url: '/getbars',
			data: {location: this.refs.location.value},
			success: (data)=>{
				this.setState({bars: data})
				console.log(data)
			}
		})
	}
	login(e){
		e.preventDefault()
		console.log(Auth.currentUserName());
	}
	logOut(e){
		e.preventDefault();
		Auth.logOut();
		this.setState({user: '', location: ''});
	}
	render(){
		return(
			<div>
				<Navbar currentUser={this.state.user} />
				<form>
					<input type='text' ref='location' placeholder='Location'/>
 					<button onClick={this.getBars.bind(this)} className='btn btn-danger'>Button!</button>
				</form>
				<a href='/login/twitter'><button className='btn btn-info'>Login</button></a>
				<button className='btn btn-danger' onClick={this.logOut.bind(this)}>LogOut</button>
				<Barlist going={this.going.bind(this)} bars={this.state.bars} />
				<Footer />
			</div>
		)
	}
}

export default Home