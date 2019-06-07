import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import "../home.css"
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { grey } from '@material-ui/core/colors';
import ChatIcon from '@material-ui/icons/Chat';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PlaceIcon from '@material-ui/icons/Place';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Map'
import {Link} from 'react-router-dom'

 

export default class Text extends React.Component {
    state = {
        message: {
          to: '',
          body: this.props.favorites.map(favorite => `${favorite.name}-${favorite.location.address1}`).join(',\n')
        },
        submitting: false,
        error: false,
        url: `/restaurants?address1=${this.props.address1}&address2=${this.props.address2}`

      };

    onHandleChange = (event) => {
        const name = event.target.getAttribute('name');
        this.setState({
            message: { ...this.state.message, to: event.target.value }
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.setState({ submitting: true });
        fetch('http://localhost:3000/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.message)
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              this.setState({
                error: false,
                submitting: false,
                message: {
                  to: '',
                  body: ''
                }
              });
            } else {
              this.setState({
                error: true,
                submitting: false
              });
            }
          });
      }

    render() {
        console.log(this.state)
        return(
            <div id = "text-page" style = {{height:"100vh", width:"100vw"}}>


                <AppBar position = "static">
                    <Toolbar style={{backgroundColor: grey}}>
                        <Link to = "/" style = {{color: "white"}}>
                            <RestaurantIcon style = {{float: "left"}}/>
                            <Typography variant="h6" noWrap style = {{fontFamily: "Titillium Web", color: "white", float: "left" }}>halfway</Typography>
                            <PlaceIcon style = {{float: "left"}}/>
                        </Link>
                        <IconButton style = {{color: "white", right: "40px", position: "fixed"}}>
                            <Link to = {this.state.url} style = {{color: "white"}}><MapIcon /></Link>
                        </IconButton>
                        <IconButton style = {{color: "white", right: "5px", position: "fixed"}}>
                            <Link to = "/text" style = {{color: "white"}}><ChatIcon /></Link>
                        </IconButton>
                    </Toolbar>
                </AppBar>


                <Grid container >    
                    <Grid item xs={12} style={{minHeight:"150px"}} > 
                    </Grid>
                    <Grid item xs={false} md={2}/>
                    <Grid item xs={12} md={3} >            
                        <Paper elevation24 style={{minHeight:"350px", background: "#F0E2E2", borderRadius: "10px"}}>
                            <Typography style = {{fontFamily: 'Titillium Web', fontSize: "35px", textAlign: "center", marginBottom: "20px" }}>Send your midpoints.</Typography>
                            <Typography variant="h5" component="h3" elevation = {0} style = {{textAlign: "center"}}>
                                <form
                                onSubmit={this.onSubmit}
                                className={this.state.error ? 'error sms-form' : 'sms-form'}>
                                    <div style = {{fontFamily: 'Titillium Web', fontSize: "20px"}}>
                                        <label htmlFor="to">To:</label><br/>
                                        <input type="tel" name="to" id="to" value = {this.state.message.to} onChange={this.onHandleChange}/><br />

                                        <label htmlFor="body">Restaurants:</label><br />
                                        <textarea style = {{maxWidth: "90%"}} name="body" id="body" value = {this.state.message.body}/>
                                    </div>
                                    <button type="submit" onSubmit={this.onSubmit}>Send message</button>
                                </form>
                            </Typography>
                            <Paper style = {{width: "40%", margin: "5%", fontFamily: 'Titillium Web'}}>
                                <Typography>Enter a valid phone number.</Typography><br/>
                                <Typography>Share your restaurants with your friend.</Typography>
                            </Paper>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


