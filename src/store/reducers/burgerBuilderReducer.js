import {ADD_INGREDIENT, REMOVE_INGREDIENT,RESET_ORDER} from "../action/actionTypes"

const initialState = {
    ingredients:{
        salad:0,
        bacon:0,
        meat:0,
        cheese:0
    },
    totalPrice: 4
}

export const burgerBuilderReducer = (state=initialState, action) => {
    switch(action.type){
        case ADD_INGREDIENT:
            let ingredients = {...state.ingredients}
            ingredients = action.ingredients
            return {...state,ingredients:ingredients, totalPrice:action.totalPrice}
        case REMOVE_INGREDIENT:
            let removedIngredients = {...state.ingredients}
            removedIngredients = action.ingredients
            return {...state,ingredients:removedIngredients, totalPrice:action.totalPrice}
        case RESET_ORDER:
            let resetOrder = {...state.ingredients}
            resetOrder = action.resetOrder
            return {...state,ingredients: resetOrder, totalPrice:action.resetPrice }
        default:
            return state    
        }
}
