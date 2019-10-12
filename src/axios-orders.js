import Axios from "axios"

const instance = Axios.create({
    baseURL: "https://react-burger-backend-ea3f7.firebaseio.com/"
})

export default instance