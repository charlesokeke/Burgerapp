import React, {Component} from "react"
import {Route} from "react-router-dom"
import ContactData from "./ContactData/ContactData"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import { connect } from "react-redux"

class Checkout extends Component {
    // state = {
    //     ingredients:null,
    //     price:0
    // }

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     let price = 0
    //     for(let params of query.entries()){
    //         if(params[0] === "price") {
    //             price = params[1]
    //         }
    //         else{
    //             ingredients[params[0]] = parseInt(params[1])
    //         }
    //     }
    //     this.setState({
    //         ingredients:ingredients,
    //         totalPrice: price
    //     })
    // }
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

