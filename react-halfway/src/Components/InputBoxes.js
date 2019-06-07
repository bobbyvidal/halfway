import React from 'react';
import {withRouter} from 'react-router-dom'




class InputBoxes extends React.Component {
    handleClick = (e) => {
        e.preventDefault()
        this.props.history.push(`/restaurants?address1=${this.props.address1}&address2=${this.props.address2}`)
    }

    render() {
        // console.log(this.state)
        return (
            <div >
               
                <form>          
                    <input style = {{margin: "5px", borderRadius: "5px"}} type="text" id="address-one" name="address1" placeholder="Example: 2121 Yu..." onChange = {this.props.handleChange} />
                    <input style = {{margin: "5px", borderRadius: "5px"}} type="text" id="address-two" name="address2" placeholder="Example: 4800 Calh..." onChange = {this.props.handleChange} /><br />
                    <button onClick = {this.handleClick}>Submit</button>
                </form>
                
            </div>
        );
        }
}

export default withRouter(InputBoxes)