import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import '../css/App.css';

import VehicleList from './VehicleList';
import VehicleDetail from './VehicleDetail';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      vehicles: [],
      filteredVehicles: [],
      sortBy: '',
      searchTerm: ''
    }
    this.resetVehicles = this.resetVehicles.bind(this);
    this.resetSort = this.resetSort.bind(this);
    this.resetSearchTerm = this.resetSearchTerm.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    this.getVehicles();
  }

  getVehicles() {
    fetch('https://gist.githubusercontent.com/creatifyme/2a334c00a117097bfdb47f031edf292c/raw/efb52ecf1cf92e2261f504ec7639c68b5ff390bd/cars.json')
      .then( response => response.json() )
      .then( vehicles => this.setState({ vehicles, filteredVehicles: vehicles }) )
  }

  resetVehicles() {
    this.setState({filteredVehicles: this.state.vehicles});
  }

  resetSort() {
    this.setState({sortBy: ''});
  }

  resetSearchTerm() {
    this.setState({searchTerm: ''});
  }

  updateSort(sortValue) {
    const filteredVehicles = [...this.state.filteredVehicles];
    switch (sortValue) {
      case 'year-new-to-old-year':
        const sortedNewToOld = this.sortYrNewToOld(filteredVehicles);
        this.setState({ filteredVehicles: sortedNewToOld, sortBy: sortValue });
        break;
      case 'year-old-to-new':
        const sortedOldToNew = this.sortYrOldToNew(filteredVehicles);
        this.setState({ filteredVehicles: sortedOldToNew, sortBy: sortValue });
        break;
      case 'mileage-high-to-low':
        const sortedMileageHighToLow = this.sortMileageHighToLow(filteredVehicles);
        this.setState({ filteredVehicles: sortedMileageHighToLow, sortBy: sortValue });
        break;
      case 'mileage-low-to-high':
        const sortedMileageLowToHigh = this.sortMileageLowToHigh(filteredVehicles);
        this.setState({ filteredVehicles: sortedMileageLowToHigh, sortBy: sortValue });
        break;
      case 'date-new-to-old':
        const sortedDateOldToNew = this.sortDateHighToLow(filteredVehicles);
        this.setState({ filteredVehicles: sortedDateOldToNew, sortBy: sortValue });
        break;
      case 'date-old-to-new':
        const sortedDateNewToOld = this.sortDateLowToHigh(filteredVehicles);
        this.setState({ filteredVehicles: sortedDateNewToOld, sortBy: sortValue });
        break;
      default:
        this.setState({ filteredVehicles, sortBy: '' });
    }

  }

  sortYrNewToOld(data) {
    return data.sort( (a, b) => b.year - a.year );
  }

  sortYrOldToNew(data) {
    return data.sort( (a, b) => a.year - b.year );
  }

  sortMileageHighToLow(data) {
    return data.sort( (a, b) => b.mileage - a.mileage );
  }

  sortMileageLowToHigh(data) {
    return data.sort( (a, b) => a.mileage - b.mileage );
  }

  sortDateHighToLow(data) {
    return data.sort( (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime() );
  }

  sortDateLowToHigh(data) {
    return data.sort( (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime() );
  }
  

  updateSearch(searchTerm) {
    // get all vehicles 
    const vehicles = [...this.state.vehicles];
    // split search term from user input
    const searchTermParts = searchTerm.split(" ");
    // fitler vehicles
    const searchedVehicles = vehicles.filter( (vehicle) => {
      // combine obj properties into a string to check against based on user input term
      const vehicleStr = `${vehicle.year.toString().toLowerCase()} ${vehicle.make.toLowerCase()} ${vehicle.model.toLowerCase()}`;
      // use flag to determine if user input exists in comparison string
      let match = true;
      // loop through each part of text and update flag only if user input does not exist in comparison string
      searchTermParts.forEach( term => {
        if( vehicleStr.indexOf(term.toLowerCase()) === -1 ) {
          match = false;
        }
      });
      // only if there is a match return the vehicle
      if( match ) {
        return vehicle;
      }
      return false;
    });
    this.setState({ filteredVehicles: searchedVehicles, searchTerm });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App__header">
            <Link to="/">
              <h1>Car Dealership</h1>
            </Link>
          </header>
          <Switch>
            <Route
              exact path="/"
              render={ props => <VehicleList 
                                  {...props}
                                  filteredVehicles={this.state.filteredVehicles}
                                  updateSearch={this.updateSearch}
                                  sortBy={this.state.sortBy}
                                  updateSort={this.updateSort}
                                /> }
            />
            <Route
              path="/vehicle/:vehicleId"
              render={ props => <VehicleDetail 
                                  {...props}
                                  filteredVehicles={this.state.filteredVehicles}
                                  resetVehicles={this.resetVehicles}
                                  resetSort={this.resetSort}
                                  resetSearchTerm={this.resetSearchTerm}
                                 /> }
            />
            <Route component={() => <h1>Oh no, nothing found here!</h1>}/>
           </Switch>
        </div>
      </Router>
    )
  }

}

export default App;
