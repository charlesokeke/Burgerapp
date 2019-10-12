import React,{Component} from "react"
import Aux from '../../hoc/Wrapper'
import styles from  "./Layout.module.css"
import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

class Layout extends Component {
        state = {
            showSideDrawer:false
        }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer:false})

    }

    sideDrawerOpenHandler =  () =>{
        this.setState((prevState) => {
           return  {showSideDrawer:!prevState.showSideDrawer}
        })

    }
    
    render() {
        return (
        <Aux>
            <Toolbar showDrawer={this.sideDrawerOpenHandler} />
            <SideDrawer closeDrawer={this.sideDrawerClosedHandler}  open={this.state.showSideDrawer}/>
            <main className={styles.content}>
                {this.props.children}
            </main>
        </Aux>

        )

    }
    
}

export default Layout;