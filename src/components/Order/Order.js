import React from "react"
import styles from './Order.module.css'
const order = ({price, ingredients:{salad, bacon, cheese, meat}}) => {
    return (
        <div className={styles.Order}>
        <div>
            <ul className="list-group list-group-horizontal-lg">
                <li className="list-group-item bold pl-1"><strong>Ingredients:</strong></li>
                <li className="list-group-item"><strong>Salad:</strong>({salad})</li>
                <li className="list-group-item"><strong>Bacon:</strong>({bacon})</li>
                <li className="list-group-item"><strong>Cheese:</strong>({cheese})</li>
                <li className="list-group-item"><strong>Meat:</strong>({meat})</li>
            </ul>
                
            </div>
            <p className="p-2"><strong>Price: $</strong>{Number(price).toFixed(2)}</p>
        
        </div>
    )
}
export default order