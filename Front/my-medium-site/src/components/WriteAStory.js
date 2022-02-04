
import React from 'react'
import {connect} from "react-redux"

import './writingStory.css';
import upload from '../images/upload.svg.png'
class WriteAStory extends React.Component{
    constructor(props){
        super(props)
        this.handleForm=this.handleForm.bind(this)
        this.handleFileInputChange=this.handleFileInputChange.bind(this)
        this.sendDatasOnServer=this.sendDatasOnServer.bind(this)
        this.getBase64=this.getBase64.bind(this)

        this.url='https://localhost:44361/api/useractions/addnewstory'

        this.state={
            theme:"",
            header:"",
            description:"",
            postphoto:"",
            article:"",
            userId:""
            // email:""
            // usernickname:"example",
            // userid:"example"
            // file: null
            // base64URL: ""
        }
    }
    componentDidMount(){
    }

    getBase64 = file => {
        return new Promise(resolve => {
          //let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            //console.log("Called", reader);
            baseURL = reader.result;
            //console.log(baseURL);
            resolve(baseURL);
          };
          //console.log(fileInfo);
        });
      };

      handleFileInputChange = e => {
        //console.log(e.target.files[0]);
        let { file } = this.state;
        file = e.target.files[0];
        this.getBase64(file)
          .then(result => {
            file["base64"] = result;
            //console.log("File Is", file);
            this.setState({
            //   base64URL: result,
              postphoto:result,
              // file
            },()=>console.log(this.state));
          })
          .catch(err => {
            console.log(err);
          });
    
        // this.setState({
        //   file: e.target.files[0]
        // });
      };
 sendDatasOnServer = async function(url){
  //console.log(this.props.credentials.tokenKey)
  console.log(this.state);
                const response=await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'bearer ' + this.props.credentials.tokenKey
                    },
                    body:JSON.stringify(this.state)
                });
               // console.log(JSON.stringify(this.state))

                console.log(await response.json())
                window.location = '/'
              }
            
async handleForm(e) {
    e.preventDefault()
    //console.log(e.target)
    const {theme,header,description,article} = e.target

    // console.log(email)
    this.setState({
        theme:theme.value,
        header:header.value,
        description:description.value,
        article:article.value,
        userId:this.props.credentials.userId
        // email:this.props.credentials.email
      // },()=>console.log(this.state))
    },()=>this.sendDatasOnServer(this.url))
}

        render(){
          var photoHere=""

          if(this.state.postphoto){
             photoHere=
            <div className="w-50">
              <img className="w-50 rounded" src={this.state.postphoto} alt="..."></img>
            </div>
          }
           
            return(

                <div>
                        <form onSubmit={this.handleForm} className="text-center p-3">
                                <div className="text-end">
                                    <button className="btn btn-success m-2" style={{minWidth:'25%'}}>Publish</button>
                                </div>    
                                    <input type="text"  placeholder="Theme" className="otherText" name="theme"/>

                                    <div className="article">
                                            <input type="text"  className="myText" placeholder="Title" name="header"/>
                                            <input type="text"  className="otherText" placeholder="Chort description" name="description"/>
                                              <div className="d-flex justify-content-around">
                                                <div className="addImage">
                                                    <div className="form-group">
                                                        <label className="label">
                                                            <i><img style={{maxWidth:'100%'}} src={upload} alt="..."></img></i>
                                                            <span className="title">Add an image</span>
                                                            <input type="file" name="postPhoto" accept="image/image/png,image/gif,image/jpeg,image/jpg,image/svg" onChange={this.handleFileInputChange}/>
                                                        </label>
                                                    </div>
                                                </div>
                                                  {photoHere}
                                                </div>
                                            {/* <input name="photo_Base64" type="file" className="form-control" /> */}
                                            <textarea className="myTextarea"  placeholder="Article" name="article"/>
                                    </div>
                                          
                            </form>
                </div>
            )
        }
    }
    function mapStateToProps(state){
      return{
        credentials:state.credentials
      }
    }
 export default connect(mapStateToProps)(WriteAStory)
 