import React from "react"
import styles from "./Burger.module.css"
//import Typing from "react-typing-animation";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"
import TypedString from "../../containers/Typed/TypedString"

const burger = (props) => {

    const transformedingredient = Object.keys(props.ingredients).length ? 
       (Object.keys(props.ingredients)
       .map((element) =>  new Array(Number(props.ingredients[element])).fill(element)
       )
       .reduce((acc, value) => acc.concat(value))
       .map((element, index) => <BurgerIngredient type={element} key={index}/>)) : []
    
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
                { transformedingredient.length ? transformedingredient : 
                <TypedString 
                    strings={[
                        "<strong>Welcome to burgerbuilder</strong>",
                        "<strong>Please start build your burger</strong>",
                        "<strong>Hope you enjoy it !!</strong>"
                    ]} 
             />
                }
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger