import React from 'react';
import Map from "../Components/Map"
import BusinessCard from "../Components/BusinessCard"
import queryString from 'query-string'
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import ChatIcon from '@material-ui/icons/Chat';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PlaceIcon from '@material-ui/icons/Place';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'


export default class MapScreen extends React.Component {

    state = {
        address1: "",
        address2: "",
        businesses: [],
        centerPoint: undefined,
        location1: undefined,
        location2: undefined,
        // isLoading: true
    }

    componentDidMount = () => {
        const values = queryString.parse(this.props.location.search)
        // console.log(this.props.location.search.split("?")[1].split("&"))
        fetch('http://localhost:3000/addresses', 
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              address1: values.address1,
              address2: values.address2
            })
          })
        .then((res)=> {
            if (res.ok){
                return res.json();
            }})
        .then((json) => this.setState({
            businesses: json.restaurants.businesses,
            centerPoint: json.coordAverage,
            location1: json.location1,
            location2: json.location2,
            address1: values.address1,
            address2: values.address2

        }))
        // setTimeout(this.setState({
        //     isLoading: false
        // }), 1000)
    }

    render() {
        // console.log(this.state)
        return (
            this.state.isLoading ? <h1>hi</h1> :

            
            <div style = {{background: "white"}}>
                <AppBar position = "static">
                    <Toolbar style={{backgroundColor: grey}}>
                        <Link to = "/" style = {{color: "white"}}>
                            <RestaurantIcon style = {{float: "left"}}/>
                            <Typography variant="h6" noWrap style = {{fontFamily: "Titillium Web", color: "white", float: "left" }}>halfway</Typography>
                            <PlaceIcon style = {{float: "left"}}/>
                        </Link>
                        <IconButton style = {{color: "white", left: "88vw"}}>
                            <Link to = "/text" style = {{color: "white"}}><ChatIcon /></Link>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Grid container >
                    <Grid item xs={12} style = {{minHeight: "10px"}}></Grid>
                    <Map businesses = {this.state.businesses} center={this.state.centerPoint} location1 = {this.state.location1} location2 = {this.state.location2}/> 
                    <BusinessCard businesses = {this.state.businesses} addFavorite = {this.props.addFavorite} favorites = {this.props.favorites}/>
                </Grid>
            </div>
        );
    }
}
