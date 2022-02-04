import React from "react";
import './writingStory.css';
import upload from '../images/upload.svg.png'
// import ChangeUserPassword from "./ChangeUserPassword";

class UserPage extends React.Component{

    constructor(props){
        super(props)
        this.setUserDatasForm=this.setUserDatasForm.bind(this)
        this.handleFileInputChange=this.handleFileInputChange.bind(this)
        this.getBase64=this.getBase64.bind(this)
        this.sendDatasOnServer=this.sendDatasOnServer.bind(this)
        this.token=""
        this.state={
            aboutprofile:"",
            profilePhoto:"",
            userId:""
        }
    }
    componentDidMount(){
        this.setState({
            // email:this.props.email
            userId:sessionStorage.getItem("userId")
        })
        this.token=sessionStorage.getItem("access_token")
        // console.log(this.props.match.params.passwordChanged)
    }
    getBase64 = file => {
        return new Promise(resolve => {
          //let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
          };
        });
      };

      handleFileInputChange = e => {
        //console.log(e.target.files[0]);
        let { file } = this.state;
        file = e.target.files[0];
        this.getBase64(file)
          .then(result => {
            file["base64"] = result;
            this.setState({
            profilePhoto:result,
            },()=>console.log(this.state));
          })
          .catch(err => {
            console.log(err);
          });
      };
    setUserDatasForm(e){
        e.preventDefault()
        //console.log(e.target)

        const {aboutprofile} = e.target
        this.setState({
            aboutprofile:aboutprofile.value,
        },()=>this.sendDatasOnServer('https://localhost:44361/api/useractions/adduserdatas'))
        // },()=>console.log(this.state))
    }
    sendDatasOnServer = async function(url){

        const response=await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token
            },
            body:JSON.stringify(this.state)
        })
        //console.log(JSON.stringify(this.state))

        console.log(await response.json())
        window.location = '/'
    }
    
    render(){
        var photo=""
        if(this.state.profilePhoto){
            photo=
           <div className="w-50 m-1">
             <img className="w-50 rounded" src={this.state.profilePhoto} alt="..."></img>
           </div>
         }
        return(
            <div>
                <form onSubmit={this.setUserDatasForm}>
                    <div className="container">
                        <div className="form-group">
                            <label for="aboutprofile">Profile description:</label>
                            <input type="text" className="form-control" name="aboutprofile"/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around">
                       
                    <div className="addImage m-1">
                        <div className="form-group">
                            <label className="label">
                                <i><img style={{maxWidth:'100%'}} src={upload} alt="..."></img></i>
                                <span className="title">Add profile photo</span>
                                <input type="file" name="profilePhoto" accept="image/image/png,image/gif,image/jpeg,image/jpg,image/svg" onChange={this.handleFileInputChange}/>
                            </label>
                        </div>
                    </div>
                        {photo}
                    </div>


                    {/* <input type="file" name="profilePhoto" onChange={this.handleFileInputChange}/> */}
                    <div className="text-center m-1">
                     <button style={{minWidth:"40%"}} className="btn btn-success">Add Datas</button>
                    </div>
                </form>
                <hr/>
                <div class='text-center'>
                    <h3>Change password</h3>
                </div>
                {/* {<ChangeUserPassword message={this.props.match.params.passwordChanged}></ChangeUserPassword>} */}
            </div>
        )
    }
}
export default UserPage