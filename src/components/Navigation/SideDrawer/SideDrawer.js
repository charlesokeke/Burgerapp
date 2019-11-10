import React from "react"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import styles from "./SideDrawer.module.css"
import Backdrop from "../../UI/Backdrop/Backdrop"
import Aux from "../../../hoc/Wrapper"

const sideDrawer = (props) => {

    return (
        <Aux >
            <Backdrop show={props.open} closeModal={props.closeDrawer}/>
            <div className={props.open ? styles.SideDrawer + " " + styles.Open : styles.SideDrawer + " " + styles.Close } onClick={props.closeDrawer} >
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
         </Aux>
    )
}

export default sideDrawer