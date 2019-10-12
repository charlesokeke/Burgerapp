import React , {Component} from "react"
import Order from "../../components/Order/Order"
import Axios from "../../axios-orders"


class Orders extends Component {

    state = {
        orders:[],
        loading: true,
        ordersTotal:null
    }
     getSum =(total, num) =>  {
        return total + num;
      }
    componentDidMount(){
        Axios.get("/orders.json")
         .then(response => {
            let ordersTotal = []
            let data =Object.entries(response.data).map(order =>{
                ordersTotal.push(Number(order[1].price))
                return {...order[1], id:order[0]} 
            })
           ordersTotal = ordersTotal.reduce(this.getSum, 0).toFixed(2)
            console.log(ordersTotal)
             this.setState({loading:false, orders:data,ordersTotal:ordersTotal})
         })
         .catch((error => {
             this.setState({loading: false})
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
                }}>Total Amount:
                 {`$${this.state.ordersTotal}`}</span> :
                  null
                }
                {this.state.orders.map(element => {
                    return <Order price={element.price} ingredients={element.ingredients} key={element.id} />
                })}
            </div>
        )
    }
    
}
export default Orders