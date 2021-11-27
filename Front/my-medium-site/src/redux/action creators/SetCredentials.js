import {SetCredentials} from '../actions/SetCredentials';

export function SetCredentials(credentials){
console.log(credentials)
    return{
        type:SetCredentials,
        credentials
    }
}