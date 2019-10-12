import React, {Component} from "react"
import {Route} from "react-router-dom"
import ContactData from "./ContactData/ContactData"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"

class Checkout extends Component {
    state = {
        ingredients:null,
        price:0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for(let params of query.entries()){
            if(params[0] === "price") {
                price = params[1]
            }
            else{
                ingredients[params[0]] = parseInt(params[1])
            }
        }
        this.setState({
            ingredients:ingredients,
            totalPrice: price
        })
    }
    render() {
        return (
            <div>
                {this.state.ingredients ? <CheckoutSummary ingredients={this.state.ingredients} /> : null}
                <Route path={this.props.match.path + "/contact-data"} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        )
    }
}
export default Checkout