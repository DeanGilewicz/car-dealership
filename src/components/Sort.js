import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/Sort.css';

class Sort extends Component {

	constructor(props) {
	    super(props);
	    this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.updateSort(event.target.value);
	}

	render() {
		return (
			<form className="sort" onSubmit={this.handleSubmit}>
		        <label htmlFor="sort">Sort</label>
				<select id="sort" className="sort__input" value={this.props.sortBy} onChange={this.handleChange}>
					<option value=""></option>
					<option value="year-new-to-old-year">Year: Newest-Oldest</option>
					<option value="year-old-to-new">Year: Oldest-Newest</option>
					<option value="mileage-high-to-low">Mileage: High-Low</option>
					<option value="mileage-low-to-high">Mileage: Low-High</option>
					<option value="date-new-to-old">Date: Newest-Oldest</option>
					<option value="date-old-to-new">Date: Oldest-Newest</option>
				</select>
			</form>
		)
	}
}

Sort.propTypes = {
	sortBy: PropTypes.string.isRequired,
	updateSort: PropTypes.func.isRequired
};

export default Sort;