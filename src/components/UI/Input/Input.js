import React from "react"
import styles from   "./Input.module.css"

const input = (props) =>{
    let input = null
    switch(props.elementInput){
        case ("input"):
            input = <input className={styles.Input} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case ("textarea"):
            input = <textarea className={styles.Input} {...props.elementConfig} value={props.value}onChange={props.changed} />    
            break;

         case ("select"):
                input = (<select value={props.value} className={styles.Input} onChange={props.changed}>{props.elementConfig.options.map((element,index) => {
                        return <option value={element.value} key={index}>{element.displayValue}</option>
                })} 
                </select>)  
                break;    
        default:
            input = <input className={styles.Input}onChange={props.changed} />        
    }
    return (
        <div className={styles.InputContainer}>
            
            {input}
        </div>
    )
}

export default input