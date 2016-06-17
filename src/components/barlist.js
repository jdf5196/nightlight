import React from 'react';

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
			<h2>Bar List</h2>
			<hr />
			<ul className='barlist'>
			{bars}
			</ul>
		</div>
	)
}

export default Barlist;