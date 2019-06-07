import React from 'react';
import GoogleMapReact from 'google-map-react';
import Tip from "./Tip"
 
export default class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 29.7604,
      lng: -95.3698
    },
    zoom: 10
  };

  state = {
    clickedBusiness: null
  }

  suspicious = (neverInUse, latLong) => {
    const clickedBusiness = this.props.businesses.find(business => latLong.lat === business.coordinates.latitude)
    console.log(clickedBusiness, !this.state.clicked)
    this.setState({
      clickedBusiness
    })
  }



  render() {
    // console.log(this.props.centerPoint)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '88vh', width: '65%', margin: "1%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAJz4DTBi9a5cInCXNmP_CWly2cr0YlfIw" }}
          center={this.props.center}
          defaultZoom={this.props.zoom}
          onChildClick={this.suspicious}>
        
        {this.props.businesses.map( business => ( <Marker lat = {business.coordinates.latitude} lng = {business.coordinates.longitude} clickedBusiness = {this.state.clickedBusiness} business={business}/> ))}
        {this.props.center !== undefined ? <CenterMarker lat = {this.props.center.lat} lng = {this.props.center.lng}/> : null}
        {this.props.location1 !== undefined ? <UserOne lat = {this.props.location1.lat1} lng = {this.props.location1.long1} /> : null}
        {this.props.location2 !== undefined ? <UserTWo lat = {this.props.location2.lat2} lng = {this.props.location2.long2} /> : null}

        </GoogleMapReact>
      </div>
    );
  }
}
class Marker extends React.Component {

  state = {
    clicked: true
  }

  handleToggle = () => {
    console.log("test")
      this.setState({
          clicked: !this.state.clicked
      })
  }

  render() {
      return (
        <div className="SuperAwesomePin" onClick = {this.handleToggle}>
          <img src = {require("./images/icons8-marker-30.png")} alt = "markers"/>
          {this.props.clickedBusiness === this.props.business ? <Tip business = {this.props.business} clicked = {this.state.clicked} /> : null}
        </div>
        )
  }
}
class CenterMarker extends React.Component {
  render() {
      return ( <div className="center-pin"><img src = {require("./images/icons8-marker-40.png")} alt = "center-marker"></img></div> )
  }
}

class UserOne extends React.Component {

  

  render() {
      return ( <div className="center-pin"><img src = {require("./images/icons8-street-view-64.png")} alt = "user1-marker" ></img></div> )
  }
}
class UserTWo extends React.Component {
  render() {
    return ( <div className="center-pin"><img src = {require("./images/icons8-street-view-64.png")} alt = "user2-marker"></img></div> )
  }
}