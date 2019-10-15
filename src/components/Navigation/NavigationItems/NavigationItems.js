import React,{Fragment} from "react"
import styles from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem"
import {NavLink , withRouter} from "react-router-dom"
import {AUTO_LOGOUT} from "../../../store/action/actionTypes"
import {connect} from "react-redux"




const navigationItems = (props) => {
    console.log(props)
    function logout (event){
        event.preventDefault()
        props.fullLogout()
        props.history.push("/")
    }
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
           { props.token ? 
           (
           <Fragment><NavigationItem link="/orders">Orders</NavigationItem>
           <li className={styles.NavigationItem}>
            <NavLink
                to={''}
                activeClassName={styles.active}
                exact
                onClick={logout}
                > Logout</NavLink>
        </li>
           </Fragment>) :
           <NavigationItem link="/auth">Authentication</NavigationItem>
           }


        </ul>
    )
}
const mapStateToProps = state => {
    return {
        token:state.authReducer.token
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        fullLogout: () => dispatch({type:AUTO_LOGOUT})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(navigationItems))