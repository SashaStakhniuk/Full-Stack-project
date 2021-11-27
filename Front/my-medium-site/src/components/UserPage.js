import React from "react";

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
            email:""
        }
    }
    componentDidMount(){
        this.setState({
            // email:this.props.email
            email:sessionStorage.getItem("userEmail")
        })
        this.token=sessionStorage.getItem("access_token")
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

        console.log(response.json())
    }
    
    render(){
        return(
            <div>
                <form onSubmit={this.setUserDatasForm}>
                    <input type="text" name="aboutprofile"/>
                    <input type="file" name="profilePhoto" onChange={this.handleFileInputChange}/>
                    <button className="btn btn-success">Add Datas</button>
                </form>
            </div>
        )
    }
}
export default UserPage