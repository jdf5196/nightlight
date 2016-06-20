import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Navbar from './navbar.js';
import Footer from './footer.js';
import Barlist from './barlist.js';
import Auth from '../javascripts/auth.js';

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			bars: [],
			user: '',
			location: ''
		}
		this.change = this.change.bind(this);
		this.heading = this.heading.bind(this);
	}
	componentWillMount(){
		let user = Auth.currentUserName();
		let userId = Auth.currentUserId();
		let location = '';
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
					let location = Auth.location();
					this.setState({bars: data, user: updateUser, location: location})
				}
			})
		}else{
			this.setState({user: user})
		}
		
	}
	going(data){
		if(!Auth.isLoggedIn){
			return
		}else{
			let bars = this.state.bars;
			let bar = bars[bars.indexOf(data)];
			let postdata = {bar: bar, user: Auth.currentUserId()};
			$.ajax({
				type: 'POST',
				url: '/going',
				data: postdata,
				success: (newData)=>{
					bars.splice(bars.indexOf(bar), 1, newData.bar);
					this.setState({bars: bars})
				}
			})
		}
	}
	getBars(e){
		e.preventDefault();
		let user = '';
		if(!this.refs.location.value){
			return
		}
		localStorage.setItem('location', this.refs.location.value);
		if(Auth.isLoggedIn()){
			user = Auth.currentUserId();
		}
		$.ajax({
			type: 'POST',
			url: '/getbars',
			data: {location: this.refs.location.value, user: user},
			success: (data)=>{
				this.setState({bars: data})
			}
		})
	}
	heading(){
		console.log(this.state.bars.length)
		if(this.state.bars.length === 0){
			return (<hr />)
		}else{
			return (
				<div className='center'>
					<h2>Bar List</h2>
					<hr />
				</div>
			)
		}
	}
	change(e){
		this.setState({location: e.target.value})
	}
	login(e){
		e.preventDefault()
	}
	logOut(){
		Auth.logOut();
		this.setState({user: '', location: '', bars: []});
	}
	render(){
		return(
			<div>
				<Navbar logOut={this.logOut.bind(this)} currentUser={this.state.user} />
				<form>
					<input type='text' onChange={this.change} value={this.state.location} ref='location' placeholder='Location'/>
 					<button onClick={this.getBars.bind(this)} className='btn btn-danger'>Button!</button>
				</form>
				{this.heading()}
				<Barlist going={this.going.bind(this)} bars={this.state.bars} />
				<Footer />
			</div>
		)
	}
}

export default Home