import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../css/VehicleDetail.css';

class VehicleDetail extends Component {

	componentWillUnmount() {
		this.props.resetVehicles();
		this.props.resetSort();
		this.props.resetSearchTerm();
	}

	render() {
		const vehicleId = this.props.match.params.vehicleId;
		const vehicles = this.props.filteredVehicles;

		if( vehicles.length > 0 ) {
			const vehicle = vehicles[vehicleId];
			const { year, make, model, mileage, image_url } = vehicle;
			return (
				<div>
					<Link to="/" className="all__cars__trigger">View All Cars</Link>
					<div className="vehicle__detail">
						<img src={`${image_url}`} alt={`${year} ${make} ${model}`} className="vehicle__image" />
						<div className="vehicle__info">
							<h1 className="vehicle__year">{`${year}`}</h1>
							<h2 className="vehicle__title">{`${make} ${model}`}</h2>
							<h3 className="vehicle__mileage">{`${mileage}`} miles</h3>
						</div>
					</div>
				</div>
			)
		}

		return <p>Loading ... </p>;
	}

}

VehicleDetail.propTypes = {
	vehicleId: PropTypes.string,
	filteredVehicles: PropTypes.arrayOf(PropTypes.object).isRequired,
	resetVehicles: PropTypes.func.isRequired,
	resetSort: PropTypes.func.isRequired,
	resetSearchTerm: PropTypes.func.isRequired
};

export default VehicleDetail;