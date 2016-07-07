import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Barlist = (props)=>{
	const bars = props.bars.map((bar)=>{
		return <li className='bar' key={bar.name}>
					<div>
						<div className='yelp'>
							<img className='image' src={bar.image} />
							<p>Yelp Score: {bar.rating}</p>
						</div>
						<a href={bar.url} target='_blank'><p>{bar.name}</p></a>
						<button className='button btn' onClick={props.going.bind(this, bar)}>Going {bar.Attending.length}</button>
						<p className='snippet'>{bar.snippet}</p>
					</div>
			   </li>
	});
	return (
		<div className='container'>
			<ul className='barlist'>
				<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={1000} transitionLeaveTimeout={500}>
          			{bars}
        		</ReactCSSTransitionGroup>
			</ul>
		</div>
	)
}

export default Barlist;