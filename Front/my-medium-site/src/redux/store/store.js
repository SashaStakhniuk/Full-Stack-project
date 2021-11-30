import {createStore} from 'redux'
import SetCredentialsReducer from '../reducers/SetCredentialsReducer'

const credentials={
    tokenKey:sessionStorage.getItem("access_token"),
    userId:sessionStorage.getItem("userId")
    // email:sessionStorage.getItem("userEmail"),
}
const InitialStore={
    credentials,
    posts:[]
    // credentials,
    // posts:[]
}

const store=createStore(SetCredentialsReducer,InitialStore)
export default store