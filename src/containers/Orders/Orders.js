import React , {Component} from "react"
import Order from "../../components/Order/Order"
import Axios from "../../axios-orders"
import {connect} from "react-redux"


class Orders extends Component {

    state = {
        orders:[],
        loading: true,
        ordersTotal:null,
        noOrders:null
    }

     getSum = (total, num) =>  {
        return total + num;
      }

    componentDidMount(){
        Axios.get("/orders.json?auth=" + this.props.token)
         .then(response => {
            console.log(response.data)
            if(response.data === null){
                console.log(response.data)
                this.setState({noOrders:"You have no orders"})
                   
            }else{
                let ordersTotal = []
                let data =Object.entries(response.data).map(order =>{
                ordersTotal.push(Number(order[1].price))
                return {...order[1], id:order[0]} 
            })
           ordersTotal = ordersTotal.reduce(this.getSum, 0).toFixed(2)
             this.setState({loading:false, orders:data,ordersTotal:ordersTotal})
            }  
         })
         .catch((error => {
             console.log(error)
             this.setState({loading: false,noOrders:"You have no orders"})
         }))
    }

    render () {
        return (
            <div style={{position:"relative",paddingTop:"1.5rem"}}>
                {this.state.ordersTotal ?
                <span style={{position:"absolute",
                    top:"10px",
                    left:"50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow:"0 2px 3px #ccc",
                    padding:"5px"
                    }}
                >Total Amount:
                 {`$${this.state.ordersTotal}`}</span> :
                  <h4 style={{textAlign:"center", color:'red'}}>{this.state.noOrders}</h4>
                }
                {this.state.orders.map(element => {
                    return <Order price={element.price} ingredients={element.ingredients} key={element.id} />
                })}
            </div>
        )
    }
    
}
const mapStateToProps = state =>{
    return {
        token:state.authReducer.token
    }
}
export default connect(mapStateToProps)(Orders)