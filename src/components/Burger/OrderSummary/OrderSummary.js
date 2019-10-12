import React,{Component} from "react"
import Button from "../../UI/Button/Button"


class OrderSummary extends Component {


    componentWillUpdate() {
        console.log('ordersummary updated')
    }
   render() {
    return (
        <div>
             <h3>Order Summary</h3>
            <ul>  
            {Object.entries(this.props.order).map((element) =>{
                return <li key={element}><span style={{textTransform:'capitalize'}}>{`${element[0]}: ${element[1]}`}</span></li>
            })}
            </ul>
            <p><strong>Total: ${this.props.totalPrice.toFixed(2)}</strong> </p>
            <p>Continue to checkout</p>
            <Button color="Danger" clicked={this.props.cancel}>Cancel</Button>
            <Button color="Success" clicked={this.props.continue}>Continue</Button>

        </div>
    )
   }
}

export default OrderSummary