import React from 'react';

const Barheading = (props) => {
    if(props.bars > 0){
        return(
            <div className='center'>
                <h2>Bar List</h2>
                <hr />
            </div>
        )
    }else{
        return(
            <div className='center'>
                <hr />
            </div>
        )
    }
}

export default Barheading;