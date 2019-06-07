import React from 'react';
import InputBoxes from "../Components/InputBoxes"
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import "../home.css"
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import ChatIcon from '@material-ui/icons/Chat';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PlaceIcon from '@material-ui/icons/Place';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'


export default class HomeScreen extends React.Component {
    render() {
        return (
            <div id = "home" style={{height:"100vh", width:"100vw"}}>
                <AppBar position = "static">
                    <Toolbar>
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
                    <Grid item xs={12} style={{minHeight:"200px"}} > 
                    </Grid>
                    <Grid item xs={false} md={7}/>
                    <Grid item xs={12} md={4} >            
                        <Paper elevation20 style={{minHeight:"250px", width: "70%", background: "#F0E2E2", borderRadius: "10px"}}>
                            <Typography style = {{fontFamily: 'Titillium Web', fontSize: "50px", textAlign: "center", marginBottom: "20px" }}>Make meeting for lunch easier.</Typography>
                            <Typography style = {{fontFamily: 'Titillium Web', fontSize: "15px", textAlign: "center", marginBottom: "20px" }}>Put in any two addresses and let halfway do its magic...</Typography>
                            <Typography variant="h5" component="h3" elevation = {0} style = {{textAlign: "center"}}>
                                <InputBoxes handleClick = {this.props.handleClick} handleChange = {this.props.handleChange} address1 = {this.props.address1} address2 = {this.props.address2}/>
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item md={1} />
                </Grid>
            </div>
        );
    }
}

