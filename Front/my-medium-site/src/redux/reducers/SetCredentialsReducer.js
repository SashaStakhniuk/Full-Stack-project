//import { UpdateToDoList } from '../actions/updateToDoList';
import {GetCredentialsFromSessionStorage } from '../actions/GetCredentialsFromSessionStorage';

export default function setCredentialsReducer(state,action){
  const token="access_token";
  const userEmail="userEmail";
    switch(action.type){
      case GetCredentialsFromSessionStorage:
        console.log(action)
        // console.log(state.credentials)
        // action.credentials.email
        // action.credentials.tokenKey
        const tokenKey=sessionStorage.getItem(token)
        const email=sessionStorage.getItem(userEmail)
        const credentials={
          tokenKey,email
        }
        console.log(credentials)
        return {
          credentials
        }
      default:
        console.log('default')
        return state
    }
  };