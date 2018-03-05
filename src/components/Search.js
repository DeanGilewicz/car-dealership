import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/Search.css';

class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.updateSearch(this.state.value);
	}

  render() {
		return (
			<form className="search" onSubmit={this.handleSubmit}>
				<label htmlFor="search">Search</label>
				<input id="search" className="search__input" type="text" value={this.state.value} onChange={this.handleChange} />
				<input type="submit" value="Go" />
			</form>
		);
	}

}

Search.propTypes = {
	updateSearch: PropTypes.func.isRequired
};

export default Search;