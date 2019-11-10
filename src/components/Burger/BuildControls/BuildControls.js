import React from "react"
import styles from './BuildControls.module.css'
import BuildControl from "./BuildControl/BuildControl"
const controls = [
    {label:"Salad", type:'salad'},
    {label:"Bacon", type:'bacon'},
    {label:"Meat", type:'meat'},
    {label:"Cheese", type:'cheese'}
]

const buildControls = (props) =>{
    return (
        <div className={styles.BuildControls}>
            <p><strong>Burger Price:</strong> {`$${props.price.toFixed(2)}`}</p>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={props.ingredientAdded.bind(this, ctrl.type)}
                    removed={props.ingredientRemoved.bind(this,ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
            <button
                className={styles.OrderButton} 
                disabled={Object.values(props.disabled).every((element) => element === true )}
                onClick={props.handleModal}
            >
                ORDER NOW
            </button>
            <button
                    className={styles.OrderButton} 
                    disabled={Object.values(props.disabled).every((element) => element === true )}
                    onClick={props.resetOrder}
                >
                    RESET ORDER
            </button>
        </div>
    )
}

export default buildControls