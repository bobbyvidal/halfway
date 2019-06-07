import React from 'react';
import "../home.css"
import GridListTile from '@material-ui/core/GridListTile';

export default class Tip extends React.Component {

    

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({ clicked: true });
    //     }, 3000);
    // }

    render() {
        return(
            <div>
                {this.props.clicked ? <p id = "rcorners2" style={{background: "#F28686", zIndex: "100"}} onDrag = {{cursor: "pointer"}} >Restaurant: {this.props.business.name}<br/><br/>Type: {this.props.business.categories[0].title}</p> : null }
            </div>
        )
    }
}