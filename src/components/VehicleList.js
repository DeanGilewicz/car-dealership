import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../css/VehicleList.css';

import Sort from './Sort';
import Search from './Search';

const VehicleList = props => {
	const { filteredVehicles: vehicles, updateSearch, sortBy, updateSort } = props;

	return (
		<div className="vehicles__container">
			<div className="vehicles__filter">
				<Search updateSearch={updateSearch}/>
				<Sort sortBy={sortBy} updateSort={updateSort}/>
			</div>
		    <ul className="vehicles__list">
				{
					vehicles.map( (vehicle, i) => 
						<li key={i}>
							<Link className="vehicle__link" to={`/vehicle/${i}`}>
								<article className="vehicle">
									<header>
										<h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
									</header>
									<p>mileage: {vehicle.mileage}</p>
									<button className="vehicle__details__trigger">View Details</button>
								</article>
							</Link>
						</li>
					)
				}
			</ul>
		</div>
	)
}

VehicleList.propTypes = {
	vehicles: PropTypes.arrayOf(PropTypes.object),
	updateSearch: PropTypes.func.isRequired,
	sortBy: PropTypes.string,
	updateSort: PropTypes.func.isRequired
};

export default VehicleList;
