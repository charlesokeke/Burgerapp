import React,{Component} from "react"
import Aux from "../../hoc/Wrapper"
import Burger from "../../components/Burger/Burger"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import {ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_ORDER} from "../../store/action/actionTypes"
import {connect} from "react-redux"
import Axios from "../../axios-orders"


const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:0.4,
    bacon:0.7

}
class BurgerBuilder extends Component {

    state = {
        showModal:false,
        loading:false
    }

    componentDidMount() {
        const price =  4
        this.props.resetIngredient({
            salad:0,
            bacon:0,
            meat:0,
            cheese:0
        },price)
    }
    
    addIngredient = (type) =>{
        const oldCount = this.props.ingredients[type]
        const updatedCount = oldCount + 1;
        const updateIngredients = {...this.props.ingredients}
        updateIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.props.totalPrice
        const newPrice = oldPrice + priceAddition
        //this.setState({totalPrice:newPrice,ingredients:updateIngredients})
        this.props.addIngredient(updateIngredients, newPrice)
    }
    removeIngredient = (type) =>{
       if(this.props.ingredients[type] > 0){
        const oldCount = this.props.ingredients[type]
        const updatedCount = oldCount - 1;
        const updateIngredients = {...this.props.ingredients}
        updateIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.props.totalPrice
        const newPrice = oldPrice - priceDeduction
        //this.setState({totalPrice:newPrice,ingredients:updateIngredients})
        this.props.deleteIngredient(updateIngredients, newPrice)
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
        const price =  4
        this.props.resetIngredient({
            salad:0,
            bacon:0,
            meat:0,
            cheese:0
        },price)
    }

    continuePurchaseHandler = () => {
        //let ingredientsWithAddedPrice = {...this.props.ingredients,price:this.props.totalPrice}
       // const data = Object.entries(ingredientsWithAddedPrice).map((element => `${encodeURIComponent(element[0])}=${encodeURIComponent(element[1])}`)).join("&")
        
        //this.props.history.push({
           // pathname:"/checkout",
           // search:"?" + data 

            
       // })
       this.props.history.push("/checkout")

    }
    render(){
            let showSpinnerOrOrderSummary = <OrderSummary order={this.props.ingredients} totalPrice={this.props.totalPrice} cancel={this.closeModal} continue={this.continuePurchaseHandler}/>

            const disableInfo = {...this.props.ingredients}
            
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
                <Burger ingredients={this.props.ingredients} />
                <BuildControls 
                    ingredientAdded= {this.addIngredient} 
                    ingredientRemoved={this.removeIngredient}
                    disabled={disableInfo} 
                    price={this.props.totalPrice}
                    handleModal={this.showModal}
                    resetOrder={this.resetOrder}
                 
                 />
            </Aux>
        )
    }
}
const mapStateToProps = state =>{
   return {
       ingredients: state.burgerBuilderReducer.ingredients,
       totalPrice: state.burgerBuilderReducer.totalPrice

   }  
}
const mapDispatchToProps = dispatch => {
    return {
        addIngredient:  (ingredients, totalPrice)  => dispatch({type:ADD_INGREDIENT, ingredients:ingredients, totalPrice:totalPrice}),
        deleteIngredient:  (ingredients, totalPrice)  => dispatch({type:REMOVE_INGREDIENT, ingredients:ingredients, totalPrice:totalPrice}),
        resetIngredient:  (resetOrder, resetPrice)  => dispatch({type:RESET_ORDER,resetOrder:resetOrder,resetPrice:resetPrice})

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,Axios));


