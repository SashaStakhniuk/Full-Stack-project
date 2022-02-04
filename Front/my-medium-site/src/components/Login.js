//import AuthenticationRegistration from './AuthenticationRegistration';
// import {Switch,NavLink,Route, BrowserRouter as Router} from "react-router-dom"
import {NavLink} from "react-router-dom"
import {connect} from 'react-redux'
import {GetCredentialsFromSessionStorage} from '../redux/actions/GetCredentialsFromSessionStorage'
import './backgroundLogin.css';
import './buttonStyle.css';
import loadingAnimation from "../images/loadingAnimation.gif"
// import SetUserCredentials from "../redux/action_creators/SetUserCredentials"
// import fb from '../fb.png'
// import google from '../google.png'

import React from 'react'
// import GoogleLoginClass from "./GoogleLogin";
// import AuthenticationRegistration from "./AuthenticationRegistration";
class Login extends React.Component{
    constructor(props){
        super(props)
        this.handleForm=this.handleForm.bind(this)
        this.makeRequest=this.makeRequest.bind(this)
        // this.getCookie=this.getCookie.bind(this)

        this.state={
            email:"",
            password:"",
            error:"",
            loading:""
        }
    }
    //  getCookie(cookieName) {
    //     let cookie = {};
    //     document.cookie.split(';').forEach(function(el) {
    //       let [key,value] = el.split('=');
    //       cookie[key.trim()] = value;
    //     })
    //     return cookie[cookieName];
    //   }
      
       componentDidMount() {
           if(this.props.match.params.userId && this.props.match.params.access_token)
           {
            console.log(this.props.match.params.userId);
            sessionStorage.setItem('userId', this.props.match.params.userId);
            sessionStorage.setItem('access_token', this.props.match.params.access_token);

            window.location="/";
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
                         sessionStorage.setItem('userId', data.userId);
                        //  sessionStorage.setItem('userEmail', data.userEmail);
                        //this.props.setCredentials(data.access_token,data.userId);
                        this.setState({error:""})
                        window.location = '/'
                        // <AuthenticationRegistration authorized={true}></AuthenticationRegistration>
                    } else {
                        // window.location = '/authorization'
                        // this.setState({error:"Invalid email or password",loading:""})
                        this.setState({error:data.error,loading:""})
                        console.log(data);
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
                           
                            {/* <div className="d-flex flex-column m-1"> */}
                            <div className="d-flex flex-row justify-content-around m-1">
                                {/* <GoogleLoginClass/> */}
                                {/* <GoogleLoginClass/> */}
                                <form method='POST' action={`https://localhost:44361/api/accountactions/ExternalLogin?provider=Google&returnUrl=`} >
                                    <button
                                        className="login-with-google-btn m-1"
                                        type="submit"
                                        name='provider'
                                        value='Google'
                                        title={`Login using Google`}>
                                        <img src='link-to-google-logo' alt="" />
                                        Sign in with Google
                                    </button>
                                </form>
                                {/* <a href="https://www.google.com/accounts/Logout">
                                    <button >Logout</button>
                                </a> */}
                                
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
                                        <a href="/passwordreset">
                                            <button className="btn btn-warning">Forgot password</button>
                                        </a>
                                    </div>
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
            // setCredentials:(tokenKey,userId)=>dispatch(SetUserCredentials(tokenKey,userId))
            setCredentials:()=>dispatch({type:GetCredentialsFromSessionStorage})
        }
      };
        
export default connect(mapStateToProps,mapDispatchToProps)(Login)

// export default Login;