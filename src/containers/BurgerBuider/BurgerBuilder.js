import React,{Component} from "react"
import Aux from "../../hoc/Wrapper"
import Burger from "../../components/Burger/Burger"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import Axios from "../../axios-orders"


const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:0.4,
    bacon:0.7

}
class BurgerBuilder extends Component {

    state = {
        ingredients:{
            salad:0,
            bacon:0,
            meat:0,
            cheese:0
        },
        totalPrice: 4,
        showModal:false,
        loading:false
    }
    
    addIngredient = (type) =>{
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1;
        const updateIngredients = {...this.state.ingredients}
        updateIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice:newPrice,ingredients:updateIngredients})
    }
    removeIngredient = (type) =>{
       if(this.state.ingredients[type] > 0){
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount - 1;
        const updateIngredients = {...this.state.ingredients}
        updateIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({totalPrice:newPrice,ingredients:updateIngredients})
       }else{
           return;
       }
        
    }

    showModal = () =>{
        this.setState({showModal:true})
        
    }
    closeModal = () =>{
        this.setState({showModal:false})
        
    }
    resetOrder = () =>{
        this.setState({ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },totalPrice:4, showModal:false})
    }

    continuePurchaseHandler = () => {
        let ingredientsWithAddedPrice = {...this.state.ingredients,price:this.state.totalPrice}
        const data = Object.entries(ingredientsWithAddedPrice).map((element => `${encodeURIComponent(element[0])}=${encodeURIComponent(element[1])}`)).join("&")
        
        this.props.history.push({
            pathname:"/checkout",
            search:"?" + data 

            
        })

    }
    render(){
            let showSpinnerOrOrderSummary = <OrderSummary order={this.state.ingredients} totalPrice={this.state.totalPrice} cancel={this.closeModal} continue={this.continuePurchaseHandler}/>

            const disableInfo = {...this.state.ingredients}
            
            for ( let key in disableInfo){
                disableInfo[key] = disableInfo[key] <= 0
            }

            if(this.state.loading){
                showSpinnerOrOrderSummary = <Spinner />
            }

        return (
            <Aux >
                
                <Modal show={this.state.showModal} closeModal={this.closeModal} >
                    {showSpinnerOrOrderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded= {this.addIngredient} 
                    ingredientRemoved={this.removeIngredient}
                    disabled={disableInfo} 
                    price={this.state.totalPrice}
                    handleModal={this.showModal}
                    resetOrder={this.resetOrder}
                 
                 />
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder,Axios);