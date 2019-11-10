import React, {Component} from "react"
import {Route} from "react-router-dom"
import ContactData from "./ContactData/ContactData"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import { connect } from "react-redux"

class Checkout extends Component {
    
    render() {
        return (
            <div>
                {this.props.ingredients ? <CheckoutSummary ingredients={this.props.ingredients} /> : null}
                <Route 
                path={this.props.match.path + "/contact-data"} 
                render={(props) => (<ContactData ingredients={this.props.ingredients} price={this.props.totalPrice} {...props}/>)}/>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        ingredients:state.burgerBuilderReducer.ingredients,
        totalPrice:state.burgerBuilderReducer.totalPrice
    }
}
export default connect(mapStateToProps)(Checkout)

