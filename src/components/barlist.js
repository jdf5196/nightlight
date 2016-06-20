import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Barlist = (props)=>{
	const bars = props.bars.map((bar)=>{
		return <li className='bar' key={bar.name}>
					<div>
						<a href={bar.url} target='_blank'>
							<img className='image' src={bar.image} />
							<p>{bar.name}</p>
						</a>
						<button onClick={props.going.bind(this, bar)}>Going {bar.Attending.length}</button>
					</div>
			   </li>
	});
	return (
		<div className='center container'>
			<ul className='barlist'>
				<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={1000} transitionLeaveTimeout={500}>
          			{bars}
        		</ReactCSSTransitionGroup>
			</ul>
		</div>
	)
}

export default Barlist;