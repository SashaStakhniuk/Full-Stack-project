import {createStore} from 'redux'
import SetCredentialsReducer from '../reducers/SetCredentialsReducer'

const credentials={
    tokenKey:sessionStorage.getItem("access_token"),
    email:sessionStorage.getItem("userEmail"),
}
const InitialStore={
    credentials
}

const store=createStore(SetCredentialsReducer,InitialStore)
export default store