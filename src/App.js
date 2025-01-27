import React,{Component} from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuider/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import {Route} from "react-router-dom"
import Orders from "./containers/Orders/Orders"
import Auth from "./containers/Auth/Auth"

class App extends Component {
  render () {

    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders"  component={Orders} />
          <Route path="/checkout"  component={Checkout} />
          <Route path="/auth"  component={Auth} />
        </Layout>
        
      </div>
    );


  }
}

export default App;
