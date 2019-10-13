import React, {Component} from "react"
import Burger from "../../Burger/Burger"
import styles from "./CheckoutSummary.module.css"
import {withRouter} from "react-router-dom"

class CheckoutSummary extends Component {
    
    render() {
        // Redirects to the root page if there are no ingredient added
        if(Object.values(this.props.ingredients).every(element => element === 0)){
            this.props.history.push("/")
        }
     return (
         <div className={styles.CheckoutSummary}>
             <h4 style={{backgroundColor:"#703b09", color:"#fff", padding:"10px 0px", boxShadow:"0px 2px 3px #ccc"}}>Enjoy your burger</h4>
            
             <div style={{width:'100%',margin:"auto"}}>
                { <Burger ingredients={this.props.ingredients}/>}
 
             </div>
             <button className="btn btn-md btn-danger m-1" onClick={() => this.props.history.goBack()}>Cancel</button>
             <button className="btn btn-md btn-success m-1" onClick={() => this.props.history.replace("/checkout/contact-data")}>Continue</button>
             
         </div>
     )
    }
 }
 export default withRouter(CheckoutSummary);