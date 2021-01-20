/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchTerm: '',
            searchResults: {items: [], total: 0}
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
            searchTerm: '',
            searchResults: {items: [], total: 0}
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        e.preventDefault();
        this.setState({ searchTerm: e.target.value });

        // TODO refactor this and just call a search method in a 'Products' service that handles all the API calls
        if (e.target.value && e.target.value.length > 2) {
            fetch(`http://localhost:3035/products?q=${e.target.value}`)
                .then(res => res.json())
                .then(searchResults => {
                    this.setState({ searchResults })
                });
        } else {
            this.setState({ searchResults: {items: [], total: 0} });
        }
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
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
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} value={this.state.searchTerm}/>
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    { /* TODO All this should be in a SearchResults component */}
                    {this.state.searchResults.items.length > 0 && (
                        <div>
                            <p className="results-info">{`Showing ${this.state.searchResults.items.length} of ${this.state.searchResults.total} products` }</p>
                            <div className="search-results">
                            {this.state.searchResults.items.map((item) => (
                                <div key={item._id} className="result-item" >
                                    <h3 className="item-title">{item.name}</h3>
                                    <div className="item-body">
                                        <img src={item.picture} alt={`Picture of ${item.name}`} />
                                        <p className="item-description">{ item.about }</p>
                                    </div>
                                </div>))}
                            </div>
                        </div>
                    )}
                </div>
            </header>
        );
    }
}

// Export out the React Component
module.exports = Menu;
