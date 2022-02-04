import React from "react";
import GoogleLogin from "react-google-login";
class GoogleLoginClass extends React.Component{
  // constructor(props){
  //   super(props)
  // }
  responseGoogle=(response)=>{
    console.log(response);
    //console.log(response.ProfileObj);
    // sessionStorage.setItem('access_token', response.accessToken);
    // sessionStorage.setItem('userId', response.googleId);
    // window.location = '/';
  }
  render(){
    return(
      <div>
        <GoogleLogin
        clientId="338527283984-4obsta667or3gv1da803kpjk7p6g2rec.apps.googleusercontent.com"
        // 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
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
        />
      </div>
    )
  }
}
export default GoogleLoginClass