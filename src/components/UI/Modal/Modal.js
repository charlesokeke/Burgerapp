import React,{Component} from "react"
import styles from "./Modal.module.css"
import Aux from  "../../../hoc/Wrapper"
import Backdrop from "../Backdrop/Backdrop"

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.show !== this.props.show || nextProps.children !== this.props.children){
            return true
        }
        return false
    }

   render() {
    return (
        <Aux>
            <Backdrop 
                show={this.props.show} 
                closeModal={this.props.closeModal}
            />
            <div className={styles.Modal} 
                style={{transform:this.props.show ? "translateY(0)" : "translateY(-100vh)", 
                opacity:this.props.show ? '1' : '0'}}
                >
                {this.props.children}
            </div>
        </Aux>
    )
   }
}

export default Modal