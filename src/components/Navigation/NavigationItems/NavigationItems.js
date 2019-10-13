import React from "react"
import styles from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem"



const navigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link="/auth">Authentication</NavigationItem>


        </ul>
    )
}

export default navigationItems