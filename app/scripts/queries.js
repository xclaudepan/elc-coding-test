/**
 * This file holds queries that are used in the APP.
 * 
 */
import { URL } from './constants';

/**
 * Send query and fetch result from server.
 * 
 * @param keyword [string] - search keyword for the query 
 * @returns Promise
 */
export const fetchResultsByKeyword = (keyword) => {
    const url = `${URL}${keyword}`;
    return fetch(url, {
      method: 'GET',
    })
    .then((response) => response.json())
    .catch ((error) => {
        console.error('Error occured when fetch data.', error);
        return [];
    });
};
