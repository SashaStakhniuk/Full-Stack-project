// import AuthenticationRegistration from './AuthenticationRegistration';
import {NavLink} from "react-router-dom"
import {connect} from 'react-redux'
import loadingAnimation from "../images/loadingAnimation.gif"

import './backgroundRegister.css';

import React from 'react'
import { GetCredentialsFromSessionStorage } from "../redux/actions/GetCredentialsFromSessionStorage";
class Registration extends React.Component{
    constructor(props){
        super(props)
        this.handleForm=this.handleForm.bind(this)
        this.makeRequest=this.makeRequest.bind(this)

        this.state={
            userName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
            loading:"",
            error:[]
        }
    }
    async makeRequest(){
        try{
            const response = await fetch('https://localhost:44361/api/accountactions/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })

            const data = await response.json()
                    if (response.ok === true) {
                        sessionStorage.setItem('access_token', data.access_token);
                        sessionStorage.setItem('userId', data.userId);
                        // sessionStorage.setItem('userEmail', data.userEmail);
                        this.setState({loading:"",error:""})
                        this.props.setCredentials();
                        window.location = '/'
                    } else {
                        this.setState({loading:"",error:data})
                        // ,()=>console.log(this.state.error)
                        // console.log("error " + response.status, response.errorText)
                        console.log(data)
                    }
        }
        catch{

        }
       
    }
    async handleForm(e) {
        e.preventDefault()
        //console.log(e.target)
        const {userName, lastName, email, password,confirmPassword} = e.target
        this.setState({
            loading:loadingAnimation,
            userName:userName.value,
            lastName:lastName.value,
            email:email.value,
            password:password.value,
            confirmPassword:confirmPassword.value
        },()=>this.makeRequest())
      }


    render(){
        var animation=""
        if(this.state.loading!==""){
            animation=
            <div>
                <img style={{width:"40px"}} src={this.state.loading} alt="..."/>
            </div>
        }
        return(
            <div>
            <div className="centerRegister">
                <div className="borderRegister">
                    
                <div className="text-center" style={{fontWeight:'bolder'}}>Sign-Up</div>
                    <form onSubmit={this.handleForm}>
                                <div className="row m-1">
                                    <div className="form__group_Register field">
                                        <input type="text" className="form__field_Register" placeholder="First Name" name="userName" defaultValue="Main"/>
                                        <label htmlFor="userName" className="form__label_Register">UserName:</label>
                                    </div>
                                </div>
                                <div className="row m-1">
                                    <div className="form__group_Register field">
                                        <input type="text" className="form__field_Register" placeholder="Last Name" name="lastName" defaultValue="Admin"/>
                                        <label htmlFor="lastName" className="form__label_Register">Last Name:</label>
                                    </div>
                                </div>
                                <div className="row m-1">
                                    <div className="form__group_Register field">
                                        <input type="email" className="form__field_Register" placeholder="Email" name="email" defaultValue="MainAdmin@gmail.com"/>
                                        <label htmlFor="email" className="form__label_Register">Email</label>
                                    </div>
                                </div>

                                <div className="row m-1">
                                    <div className="form__group_Register field">
                                        <input type="password" className="form__field_Register" placeholder="Password" name="password" defaultValue="Qwerty1!" required/>
                                        <label htmlFor="password" className="form__label_Register">Password</label>
                                    </div>
                                </div>
                                <div className="row m-1">
                                    <div className="form__group_Register field">
                                    <input type="password" className="form__field_Register" placeholder="ConfirmPassword" name="confirmPassword" defaultValue="Qwerty1!"/>
                                    <label htmlFor="confirmPassword" className="form__label_Register">Confirm Password:</label>
                                    </div>
                                </div>
                            <div className="text-center">
                                <div style={{width:"200px",padding:"auto"}}>
                                    <div style={{color:"red"}}>{this.state.error.error}</div>
                                </div>
                                    {animation}
                                <button className="btn btn-success m-2" style={{minWidth:'60%'}} data-bs-dismiss="modal">Sign-Up</button>
                            </div>                
                        </form>
                        <hr/>

                        <div style={{textAlign:"center"}}>
                    <form method='POST' action={`https://localhost:44361/api/accountactions/ExternalLogin?provider=Google&returnUrl=`} >
                                    <button
                                        className="login-with-google-btn m-1"
                                        type="submit"
                                        name='provider'
                                        value='Google'
                                        title={`Login using Google`}>
                                        <img src='link-to-google-logo' alt="" />
                                        Sign Up with Google
                                    </button>
                                </form>
                    </div>
                        <hr/>
                        <div className="text-center">
                        <div>
                            <NavLink activeClassName="btn btn-secondary stretched-link" className="textDecoration" to="/authentication">I have an account</NavLink>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
                        //  <input type="text" placeholder="First Name" name="userName" defaultValue="Main"/><br />
                        // <input type="text" placeholder="Last Name" name="lastName" defaultValue="Admin"/><br />
                        // <input type="email" placeholder="Email" name="email" defaultValue="MainAdmin@gmail.com"/><br />
                        // <input type="password" placeholder="Password" name="password" defaultValue="Qwerty1!"/><br />
                        // <input type="password" placeholder="ConfirmPassword" name="confirmPassword" defaultValue="Qwerty1!"/><br />

        );
    }
}
function mapStateToProps(state){
    console.log(state.credentials)
        return {
            credentials: state.credentials
        }
    }
    function mapDispatchToProps(dispatch){
        return{
            setCredentials:()=>dispatch({type:GetCredentialsFromSessionStorage})
        }
      };
        
export default connect(mapStateToProps,mapDispatchToProps)(Registration)
// export default Registration;