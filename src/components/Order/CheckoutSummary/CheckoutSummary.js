import React, {Component} from "react"
import Burger from "../../Burger/Burger"
import styles from "./CheckoutSummary.module.css"
import {withRouter} from "react-router-dom"


class CheckoutSummary extends Component {

    checkoutContinued = () =>{
        this.props.history.replace("/checkout/contact-data")
        
        
    }

    checkoutCancelled = () =>{
        this.props.history.goBack()
    }
    render() {
     return (
         <div className={styles.CheckoutSummary}>
             <h1>Enjoy your burger</h1>
             <div style={{width:'100%',margin:"auto"}}>
                 <Burger ingredients={this.props.ingredients}/>
 
             </div>
             <button className="btn btn-md btn-danger m-1" onClick={this.checkoutCancelled}>Cancel</button>
             <button className="btn btn-md btn-success m-1" onClick={this.checkoutContinued}>Continue</button>
             
         </div>
     )
    }
 }
 export default withRouter(CheckoutSummary);