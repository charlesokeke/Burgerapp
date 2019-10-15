import React, {Component} from "react"
import styles from "./ContactData.module.css"
import Axios from "../../../axios-orders"
import Input from "../../../components/UI/Input/Input"
import Spinner from "../../../components/UI/Spinner/Spinner"
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"


class ContactData extends Component {
    state={
        orderForm:{
            name:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Your Name"
                },
                value:""
            },
            street:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Street"
                },
                value:""
            },
            zipcode:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Zipcode"
                },
                value:""
            },
            country:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Country"
                },
                value:""
            },
            email:{
                elementType:"input",
                elementConfig:{
                    type:"email",
                    placeholder:"Your Email"
                },
                value:""
            },
            deliveryMethod:{
                elementType:"select",
                elementConfig:{
                    options:[
                        {value:"fastest",displayValue:"Fastest"},
                        {value:"cheapest",displayValue:"Cheapest"}
                ]
                },
                value:"Fastest"
            },
        },
       loading:false,
       PlacingOrderWithoutAuthenticationError:null
    }
    checkUserInputForValue = (data) =>{
       return data.value.trim() === ""   
    }
    placeOrder = (event) => {
        event.preventDefault()
        if(Object.values(this.state.orderForm).some(this.checkUserInputForValue)){
            alert("Please fill out all fields in the form")
            return null
        }
        if(!this.props.token){
            this.setState({PlacingOrderWithoutAuthenticationError:true})
            return false
        }
        this.setState({
            loading:true
        })
        let transformedData = {}
        const formData = Object.entries(this.state.orderForm).map(element => ({[element[0]]:element[1].value}))
        for(var i = 0; i< formData.length; i++){
            transformedData = {...transformedData,...formData[i]}
        }
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.price,
            orderData: transformedData    
        }
        Axios.post("/orders.json?auth=" + this.props.token,order)
        .then(response =>{
            console.log(response)
            this.setState({
                loading:false,
                showModal:false
            })
            this.props.history.push("/")
        })
        .catch(error =>{
            this.setState({
                loading:false,
                showModal:false
            })
            console.log(error)
        })
    }
    inputChanged = (event, inputidentifier) =>{
        const updatedOrderForm= {...this.state.orderForm}
        const updatedElement = {...updatedOrderForm[inputidentifier]}
        updatedElement.value = event.target.value
        updatedOrderForm[inputidentifier]= updatedElement
        this.setState({orderForm:updatedOrderForm})
    }
    render(){
        let error =null
        if(this.state.PlacingOrderWithoutAuthenticationError){
            error =(
            <React.Fragment>
                    <div className="alert alert-danger">
                       <strong>Please login or signup to place order</strong> 
                    </div>
                 <NavLink  to={{
                     pathname:"/auth",
                     signupToOrder:true
                    }}
                    style={{color:"#006400",fontWeight:"bold", textDecoration:"none", cursor:"pointer"}}
                 >
                      Got to signup/signin
                 </NavLink>
             </React.Fragment>
                 )
        }
        const formElement = Object.entries(this.state.orderForm).map(element => ({id:element[0],config:element[1]})).map(element =>{
            return <Input 
                        key={element.id}
                        elementInput={element.config.elementType}
                        value={element.config.value}
                        elementConfig={element.config.elementConfig}
                        changed={(event) => this.inputChanged(event,element.id)}
                    />
        })
        
        let form =(
                    <form className={styles.Form} onSubmit={this.placeOrder}>
                        {formElement}
                        <button className="btn btn-md btn-success mt-2" >PLACE ORDER</button>
                    </form>
                    )
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={styles.ContactData}> 
                    {error}
                <h4>Enter Contact Data</h4>

                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.authReducer.token
    }
}
 export default connect(mapStateToProps)(ContactData)