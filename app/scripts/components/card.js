/**
 * This file holds the Card that lives in the search container.
 * 
 */
import React from 'react';

const Card = ({item}) => {
    const {name, picture, tags} = item;

    const handleClick = () => {
        // Add click event if required. E.g. redirect the page to item detail page
    };

    return (
        <div className='card' onClick={handleClick}>
            {picture && (<div className='card-img'>
                <img src={picture} alt={name} />
            </div>)}
            <div className='card-title'>
                <p>{name}</p>
            </div>
            {tags.length > 0 && (<div className='card-note'>
                <p>{tags.join(', ')}</p>
            </div>)}
        </div>
    );
};

export default Card;