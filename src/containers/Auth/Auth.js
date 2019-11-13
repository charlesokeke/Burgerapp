import React, {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import styles from "./Auth.module.css"
import * as actions from '../../store/action/auth'
import Spinner from "../../components/UI/Spinner/Spinner"

class Auth extends Component{
    state= {
        signinBoxShowing:true,
        signupBoxShowing:false,
        password:"",
        email:"",
        name:"",
    }
    componentDidMount(){
        this.props.resetError()
    }
    componentDidUpdate() {
        //this code is for redirection when a user log in or signs up.
        //the else if part of the conditional statement is to redirect user.
        //who already has an order but needed to signup or in to place order
        if(this.props.token && this.props.location.signupToOrder){
            this.props.history.push("/checkout")
        }else if(this.props.token){
            this.props.history.push("/")
        }
    }
    controlAuthFormElements = (event) =>{
        event.stopPropagation();
        if(this.state.signinBoxShowing){
            this.setState({
                signinBoxShowing:false,
                signupBoxShowing:true,
                password:"",
                email:"",
                name:""
            })
        }else if(this.state.signupBoxShowing){
            this.setState({
                signupBoxShowing:false,
                signinBoxShowing:true,
                password:'',
                email:'',
                name:'',
            })
        }
    }
    setFormValues = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    submitHandler = (event) =>{
        event.preventDefault()
        this.setState({password:"",email:"",name:""})
        let baseURL = null
        if(this.state.signinBoxShowing){
            //sigin code
            baseURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoRsVT0451sgjqtUH0zvOQed02IsLxKGA"
            this.props.onAuth(this.state.email,this.state.password,baseURL)
        }else if (this.state.signupBoxShowing){
            //sign up code
            baseURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoRsVT0451sgjqtUH0zvOQed02IsLxKGA"
            this.props.onAuth(this.state.email,this.state.password,baseURL)  
        }
    }
    render() {
        let error = null
        if(this.props.error){
            error = (<div className="alert alert-danger">
                        <strong>Login failed. Please try again</strong> 
                   </div>
                )
        }
        const controledFormElement = (
             <div className={styles.formlabelgroup}>
                <input value={this.state.name} 
                    name="name" 
                    type="text" id="inputPassword" 
                    className="form-control" 
                    placeholder="Your name"  
                    onChange={this.setFormValues} 
                    required
                />
                <label htmlFor="inputPassword">name</label>
            </div>
        )
        return(
            <div className={styles.AuthContainer}>
               
                
                { this.props.loading ? <Spinner/> : (<form className={styles.formsignin} onSubmit={this.submitHandler}>
                    <h2 style={{textAlign:"center"}}>Authentication</h2>
                    {error}
                    <div className={styles.formlabelgroup}>
                        <input 
                            value={this.state.email}
                            name="email"
                            type="email" 
                            id="inputEmail" 
                            className="form-control" 
                            placeholder="Email address"  
                            autoFocus="" 
                            onChange={this.setFormValues} 
                            required
                        />
                        <label htmlFor="inputEmail">Email address</label>
                    </div>

                    <div className={styles.formlabelgroup}>
                        <input 
                            value={this.state.password}
                            name="password" 
                            type="password" 
                            id="inputPassword"
                            className="form-control" 
                            placeholder="Password"  
                            onChange={this.setFormValues} 
                            required
                          />
                        <label htmlFor="inputPassword">Password</label>
                    </div>
                        {this.state.signupBoxShowing ? controledFormElement : null}

                    <button className={styles.authButton} type="submit">Submit</button>
                    <button className={styles.authButton} type="button" onClick={this.controlAuthFormElements}>{this.state.signinBoxShowing ? "Register here" : "Signin here"}</button>
    
                </form>)}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error:state.authReducer.error,
        token:state.authReducer.token
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email, password,baseURL) => dispatch(actions.auth(email,password,baseURL)),
        resetError: () => dispatch ({type:"RESET_ERROR"})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Auth))

