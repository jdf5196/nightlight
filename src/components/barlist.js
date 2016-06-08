import React from 'react';

const Barlist = (props)=>{
	const bars = props.bars.map((bar)=>{
		return <p>{bar.name}</p>
	});
	return (
		<div>
			<h2>Bar List</h2>
			<hr />
			{bars}
		</div>
	)
}

export default Barlist;