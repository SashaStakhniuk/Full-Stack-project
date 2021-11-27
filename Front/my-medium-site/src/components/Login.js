//import AuthenticationRegistration from './AuthenticationRegistration';
// import {Switch,NavLink,Route, BrowserRouter as Router} from "react-router-dom"
import {NavLink} from "react-router-dom"
import {connect} from 'react-redux'
import {GetCredentialsFromSessionStorage} from '../redux/actions/GetCredentialsFromSessionStorage'
import './backgroundLogin.css';
import './buttonStyle.css';
import loadingAnimation from "../images/loadingAnimation.gif"
// import fb from '../fb.png'
// import google from '../google.png'

import React from 'react'
// import AuthenticationRegistration from "./AuthenticationRegistration";
class Login extends React.Component{
    constructor(props){
        super(props)
        this.handleForm=this.handleForm.bind(this)
        this.makeRequest=this.makeRequest.bind(this)

        this.state={
            email:"",
            password:"",
            error:"",
            loading:""
        }
    }
    async makeRequest(){
        try{

            const response = await fetch('https://localhost:44361/api/accountjwt/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                         body: JSON.stringify(this.state)
                    })
                
                    const data = await response.json()
                    if (response.ok === true) {
                        console.log(data)
                        sessionStorage.setItem('access_token', data.access_token);
                        sessionStorage.setItem('userEmail', data.userEmail);
                        this.props.setCredentials();
                        this.setState({error:""})
                        window.location = '/'
                        // <AuthenticationRegistration authorized={true}></AuthenticationRegistration>
                    } else {
                        // window.location = '/authorization'
                        this.setState({error:"Invalid email or password",loading:""})
                        console.log(response.status, response.errorText)
                    }
        
            //const data = await response.json()
        }
        catch{

        }
       
    }
    handleForm(e) {
        e.preventDefault()
        //console.log(e.target)
        const {email, password} = e.target
        this.setState({
            email:email.value,
            password:password.value,
            loading:loadingAnimation

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
                <div className="centerDiv">
                    <div className="border">
                    <div className="text-center" style={{fontWeight:'bolder'}}>Sign-In</div>
                        <form onSubmit={this.handleForm}>
                                    <div className="row m-1">
                                    <div className="form__group field">
                                            <input type="email" className="form__field" placeholder="Email" name="email" defaultValue="MainAdmin@gmail.com"/>
                                            <label htmlFor="email" className="form__label">Email</label>
                                        </div>
                                    </div>

                                    <div className="row m-1">
                                    <div className="form__group field">
                                            <input type="password" className="form__field" placeholder="Password" name="password" defaultValue="Qwerty1!" required/>
                                            <label htmlFor="password" className="form__label">Password</label>
                                        </div>
                                    </div>
                                <div className="text-center">
                                        {animation}
                                    <div style={{color:"red"}}>{this.state.error}</div>
                                    <button className="btn btn-success m-2" style={{minWidth:'60%'}}>Sign-In</button>
                                    {/* <a className="btn btn-success m-2" style={{minWidth:'60%'}} style={{textDecoration: 'none', color:'white'}} href="/">Sign-In</a> */}

                                </div>                
                            </form>
                           
                            <div className="d-flex flex-column m-1">
                                <button type="button" className="login-with-google-btn m-1" >
                                    Sign in with Google
                                </button>
                                    {/* <div class="effect aeneas">
                                        <div className="buttons">
                                        <a href={"s"}  className="fb" title="Log-In with Facebook"><i><img style={{width:"100%"}} src={fb} alt="fb"></img></i></a>
                                        <a href={"s"}  className="g-plus" title="Log-In with Google"><i><img style={{width:"100%"}} src={google} alt="google"></img></i></a>
                                        </div>
                                    </div> */}
                            </div>
                            <hr/>
                            {/* <div data-bs-dismiss="modal"> */}
                            <div className="text-center">
                                    <NavLink className="btn btn-secondary" to="/authorization">I don't have an account</NavLink>
                            </div>
                            {/* <div>
                                    <a href="/authorization">I don't have an account</a>
                            </div> */}
                        </div>

                    </div>
            </div>
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
        
export default connect(mapStateToProps,mapDispatchToProps)(Login)

// export default Login;