import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    float: "right",
  },
  gridList: {
    width: "31vw",
    height: "92vh",
    marginLeft: "5px"
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class BusinessCard extends React.Component {

  state = {
    clickedHeart: false
  }

  handleClick = () => {
    console.log("hi")
    this.setState({
      clickedHeart: !this.state.clickedHeart
    })
  }

  render() {
    const { classes } = this.props;
    return (

      <div className={classes.root}>
        <GridList cellHeight={150} className={classes.gridList} style={{background: "#FDEAEA"}}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto', textAlign: "center", marginBottom: "0px"}}>
            <ListSubheader component="div" style = {{fontFamily: "Titillium Web", fontSize: "25px", position: "sticky"}}>Restaurants</ListSubheader>
          </GridListTile>
          {this.props.businesses.map(business => {
            const favorited = this.props.favorites.find(favorite => favorite.name == business.name)
            return (
            <GridListTile key={business.image_url}>
              <img src={business.image_url} alt="" onClick={()=> window.open(`${business.url}`)}/>
              <GridListTileBar
                title={business.name}
                subtitle={<span>by: {business.categories[0].title}</span>}
                actionIcon = {
                  <IconButton style={{color: favorited ? "red" : "white"}} onClick = { () => this.props.addFavorite(business)}>
                    <FavoriteIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          )})}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(BusinessCard);