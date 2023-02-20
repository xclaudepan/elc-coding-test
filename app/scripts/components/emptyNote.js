/**
 * This file holds the EmptyNote that lives in the search container.
 * 
 */
import React from 'react';

const EmptyNote = ({searchKeyword}) => {
    const title = 'Hmmm...';
    const body = `We couldn't find any matches for "${searchKeyword}".`;
    const foot = 'Double check your search for any typos or spelling errors - or try a different search term. Also keep in mind, some products may only be available in our stores, not online.';
    return (
        <div className='note'>
            <div className='note-title'>
                <h2>{title}</h2>
            </div>
            <div className='note-body'>
                <p>{body}</p>
            </div>
            <div className='note-foot'>
                <p>{foot}</p>
            </div>
        </div>
    );
};

export default EmptyNote;