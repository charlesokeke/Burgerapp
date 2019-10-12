import React from "react"
import styles from "./Burger.module.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

const burger = (props) => {

    const transformedingredient = Object.keys(props.ingredients).length ? (Object.keys(props.ingredients).map((element) => {
        return new Array(Number(props.ingredients[element])).fill(element)
    }).reduce((acc, value) => acc.concat(value)).map((element, index) => <BurgerIngredient type={element} key={index}/>)) : []
    
    
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
                { transformedingredient.length ? transformedingredient : "Please start building your Burger"}
            <BurgerIngredient type="bread-bottom" />

        </div>
    )
}

export default burger