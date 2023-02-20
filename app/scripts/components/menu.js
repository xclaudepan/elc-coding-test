/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React, { useState } from 'react';
import { MAX_NUM_RESULTS_SHOWING } from '../constants';
import { fetchResultsByKeyword } from '../queries';
import Card from './card';
import EmptyNote from './emptyNote';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            isPending: false,
            showingSearch: false,
            showAllResults: false,
            searchKeyword: '',
            searchResults: [],
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch,
            showAllResults: false,
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {

        // Start Here
        // ...

        const input = e.target.value.trim();
        this.setState({searchKeyword: input, showAllResults: false});
        
        if (input.length > 2) {
            // set pending for fetch
            this.setState({isPending: true});

            // do fetch
            fetchResultsByKeyword(input)
                .then((data) => this.setState({ 
                    searchResults: data, 
                    isPending: false, // reset pending state
                 }));
        } else {
            this.setState({ 
                searchResults: [], 
                isPending: false, // reset pending state
            });
        }
    }

    /**
     * Show all or MAX_NUM_RESULTS_SHOWING number of search results.
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    handleShowResults(e) {
        e.preventDefault();
        this.setState({
            showAllResults: !this.state.showAllResults,
        });
    }

    /**
     * Get search results element. Returns Cards elements which wrapped in a container if there are search result;
     * otherwise, returns empty note.
     * 
     * @returns JSX
     * @memberof Menu
    */
    getSearchResultsJsx() {
        const {searchResults, searchKeyword, showAllResults, isPending} = this.state;
        const resultLength = searchResults.length
        
        if (resultLength > 0) {
            const showResults = showAllResults ? searchResults : searchResults.slice(0, MAX_NUM_RESULTS_SHOWING);
            const resultHeaderText = `DISPLAYING ${showResults.length} OF ${resultLength} RESULTS `;
            return (
                <>
                    <div className='result-header'>
                        <a onClick={(e) => this.handleShowResults(e)}>{resultHeaderText} 
                            <u>{showAllResults ? 'SEE LESS RESULTS' : 'SEE ALL RESULTS'}</u>
                        </a>
                    </div>
                    <div className='card-container'>
                        {showResults.map((res) => <Card item={res} key={res._id} />)}
                    </div>
                </>
            );
        } else {
            return (searchKeyword.length > 2 && !isPending) && (
                <EmptyNote searchKeyword={searchKeyword} />
            );
        }
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        const searchContainerClassName = `${this.state.showingSearch ? 'showing ' : ''}search-container${this.state.isPending ? ' pending' : ''}`;

        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div>
                    <div className={searchContainerClassName}>
                        <input className={`${this.state.isPending ? 'pending' : ''}`} type="text" onChange={(e) => this.onSearch(e)} />
                        <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                            <i className="material-icons close">close</i>
                        </a>
                        {this.getSearchResultsJsx()}
                    </div>
                </div>
            </header>
        );
    }


};

// Export out the React Component
module.exports = Menu;
