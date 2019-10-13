import React, {Component} from "react"
import styles from "./Auth.module.css"


class Auth extends Component{
    state= {
        signinBoxShowing:true,
        signupBoxShowing:false,
        password:"",
        email:"",
        name:"",

    }
    controlAuthFormElements = () =>{
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
    render() {
        console.log(this.state)
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
                <form className={styles.formsignin}>
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

                    <button className="btn btn-lg btn-success btn-block" type="submit">Submit</button>
                    <button className="btn btn-lg btn-success btn-block" type="button" onClick={this.controlAuthFormElements}>{this.state.signinBoxShowing ? "Register" : "Sign in"}</button>
    
                </form>
            </div>
        )
    }
}
export default Auth