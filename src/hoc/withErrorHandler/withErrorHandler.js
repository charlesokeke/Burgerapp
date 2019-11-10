import React,{Component} from "react"
import Modal from "../../components/UI/Modal/Modal"
import Aux  from "../../hoc/Wrapper"

const withErrorHandler = (WrappedComponent, Axios) => {
    return class extends Component  {
        state = {
            error:null
        }
        componentWillMount () {
            this.requestInterceptor = Axios.interceptors.request.use(req =>{
                this.setState({error:null})
                return req

            })
            this.responseInterceptor = Axios.interceptors.response.use(res => res, error =>{
                this.setState({error:error})
            })
        }
        componentWillUnmount () {
            Axios.interceptors.request.eject(this.requestInterceptor)
            Axios.interceptors.response.eject(this.responseInterceptor)
        }
        errorConfirmedHandler = () => {
            this.setState({error:null})
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} closeModal={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler