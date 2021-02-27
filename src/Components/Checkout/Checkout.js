import React, {Component} from "react";


class Checkout extends Component {
    state = {
        checked: false
    }
    changeCheckout = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    render() {
        return (
            <div>
                <input type="checkbox" checked={this.state.checked} onClick={this.changeCheckout} onChange={()=>{}}/>
            </div>
        )
    }
}


export default Checkout;
