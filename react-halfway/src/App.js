import React from 'react';
import HomeScreen from './Containers/HomeScreen'
import MapScreen from './Containers/MapScreen'
import Text from './Containers/Text'
import {BrowserRouter, Route} from 'react-router-dom'

//to start run npm start

export default class App extends React.Component {
  state = {
    address1: "",
    address2: "",
    favorites: []
  }

  addFavorite = (business) => {
    const alreadyInFavorites = this.state.favorites.find(favorite => favorite.name === business.name)
    if (alreadyInFavorites === undefined) {
      this.setState({
        favorites: [...this.state.favorites, business]
      })
    }
  }

  handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact path = "/" render = {(props) => <HomeScreen {...props} handleChange = {this.handleChange} handleClick = {this.handleClick} address1 = {this.state.address1} address2 = {this.state.address2}/> }/>
        <Route exact path = "/restaurants" render = {(props) => <MapScreen {...props} businesses = {this.state.businesses} centerPoint = {this.state.centerPoint} location1 = {this.state.location1} location2 = {this.state.location2} addFavorite = {this.addFavorite} favorites = {this.state.favorites}/> } />
        <Route exact path = "/text" render = {(props) => <Text {...props} favorites = {this.state.favorites} address1 = {this.state.address1} address2 = {this.state.address2}/> } />
      </BrowserRouter>
    );
  }
}