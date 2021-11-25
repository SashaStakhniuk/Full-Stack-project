
import React from 'react'
import './writingStory.css';
import upload from '../upload.svg.png'
class WriteAStory extends React.Component{
    constructor(props){
        super(props)
        this.handleForm=this.handleForm.bind(this)
        this.handleFileInputChange=this.handleFileInputChange.bind(this)
        this.sendDatasOnServer=this.sendDatasOnServer.bind(this)
        this.getBase64=this.getBase64.bind(this)
        this.tokenKey = "access_token"
        this.token=""
        this.url='https://localhost:44361/api/useractions/addnewstory'

        this.state={
            theme:"",
            header:"",
            description:"",
            postphoto:"",
            article:"",
            email:""
            // usernickname:"example",
            // userid:"example"
            // file: null
            // base64URL: ""
        }
    }
    componentDidMount(){
      this.token=sessionStorage.getItem(this.tokenKey)
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

                const response=await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'bearer ' + this.token
                    },
                    body:JSON.stringify(this.state)
                })
                console.log(JSON.stringify(this.state))

                console.log(response.json())
            }
            
async handleForm(e) {
    e.preventDefault()
    //console.log(e.target)
    const {theme,header,description,article} = e.target
    const email=sessionStorage.getItem("userEmail")

    // console.log(email)
    this.setState({
        theme:theme.value,
        header:header.value,
        description:description.value,
        article:article.value,
        email:email
      // },()=>console.log(this.state))
    },()=>this.sendDatasOnServer(this.url))
}

        render(){

            return(

                <div>
                        <form onSubmit={this.handleForm} className="text-center p-3">
                                <div className="text-end">
                                    <button className="btn btn-success m-2" style={{minWidth:'25%'}}>Publish</button>
                                </div>    
                                    <input type="text" defaultValue="example" placeholder="Theme" className="otherText" name="theme"/>

                                    <div className="article">
                                            <input type="text" defaultValue="example" className="myText" placeholder="Title" name="header"/>
                                            <input type="text" defaultValue="example" className="otherText" placeholder="Chort description" name="description"/>

                                            <div className="addImage">
                                                <div className="form-group">
                                                    <label className="label">
                                                        <i><img style={{maxWidth:'100%'}} src={upload} alt="..."></img></i>
                                                        <span className="title">Add an image</span>
                                                        <input type="file" name="postPhoto" accept="image/image/png,image/gif,image/jpeg,image/jpg,image/svg" onChange={this.handleFileInputChange}/>
                                                    </label>
                                                </div>
                                            </div>
                                           
                                            {/* <input name="photo_Base64" type="file" className="form-control" /> */}
                                            <textarea className="myTextarea" defaultValue="example"  placeholder="Article" name="article"/>
                                    </div>
                                          
                            </form>
                </div>
            )
        }
    }
 export default WriteAStory
            

//import React from 'react'
// import './writingStory.css';
// import upload from '../upload.svg.png'
// class WriteAStory extends React.Component{
//     constructor(props){
//         super(props)
//         this.handleForm=this.handleForm.bind(this)
//         this.handleFileInputChange=this.handleFileInputChange.bind(this)
//         this.sendDatasOnServer=this.sendDatasOnServer.bind(this)
//         this.getBase64=this.getBase64.bind(this)
//         this.parseJwt=this.parseJwt.bind(this)
//         this.tokenKey = "access_token"
//         this.token=""
//         this.url='https://localhost:44361/api/useractions/addnewstory'

//         this.state={
//             theme:"",
//             header:"",
//             description:"",
//             postphoto:"",
//             article:"",
//             email:""
//             // usernickname:"example",
//             // userid:"example"
//             // file: null
//             // base64URL: ""
//         }
//     }
//     componentDidMount(){
//       this.token=sessionStorage.getItem(this.tokenKey)
//     }

//     getBase64 = file => {
//         return new Promise(resolve => {
//           //let fileInfo;
//           let baseURL = "";
//           // Make new FileReader
//           let reader = new FileReader();
    
//           // Convert the file to base64 text
//           reader.readAsDataURL(file);
    
//           // on reader load somthing...
//           reader.onload = () => {
//             // Make a fileInfo Object
//             //console.log("Called", reader);
//             baseURL = reader.result;
//             //console.log(baseURL);
//             resolve(baseURL);
//           };
//           //console.log(fileInfo);
//         });
//       };

//       handleFileInputChange = e => {
//         //console.log(e.target.files[0]);
//         let { file } = this.state;
//         file = e.target.files[0];
//         this.getBase64(file)
//           .then(result => {
//             file["base64"] = result;
//             //console.log("File Is", file);
//             this.setState({
//             //   base64URL: result,
//               postphoto:result,
//               // file
//             },()=>console.log(this.state));
//           })
//           .catch(err => {
//             console.log(err);
//           });
    
//         // this.setState({
//         //   file: e.target.files[0]
//         // });
//       };
//       parseJwt (token) {
//         var base64Url = token.split('.')[1];
//         var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));
//           // console.log(JSON.parse(jsonPayload)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][0])
//         return JSON.parse(jsonPayload);
//       };
//  sendDatasOnServer = async function(url){

//                 const response=await fetch(url, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': 'bearer ' + this.token
//                     },
//                     body:JSON.stringify(this.state)
//                 })
//                 console.log(JSON.stringify(this.state))

//                 //console.log(response.json())
//             }
            
// async handleForm(e) {
//     e.preventDefault()
//     //console.log(e.target)
//     const {theme,header,description,article} = e.target
//     const email=this.parseJwt(this.token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][0]
//     // console.log(email)
//     this.setState({
//         theme:theme.value,
//         header:header.value,
//         description:description.value,
//         article:article.value,
//         email:email
//       },()=>console.log(this.state))
//     // },()=>this.sendDatasOnServer(this.url))
// }

//         render(){

//             return(

//                 <div>
//                         <form onSubmit={this.handleForm} className="text-center p-3">
//                                 <div className="text-end">
//                                     <button className="btn btn-success m-2" style={{minWidth:'25%'}}>Publish</button>
//                                 </div>    
//                                     <input type="text" defaultValue="example" placeholder="Theme" className="otherText" name="theme"/>

//                                     <div className="article">
//                                             <input type="text" defaultValue="example" className="myText" placeholder="Title" name="header"/>
//                                             <input type="text" defaultValue="example" className="otherText" placeholder="Chort description" name="description"/>

//                                             <div className="addImage">
//                                                 <div className="form-group">
//                                                     <label className="label">
//                                                         <i><img style={{maxWidth:'100%'}} src={upload} alt="..."></img></i>
//                                                         <span className="title">Add an image</span>
//                                                         <input type="file" name="postPhoto" accept="image/image/png,image/gif,image/jpeg,image/jpg,image/svg" onChange={this.handleFileInputChange}/>
//                                                     </label>
//                                                 </div>
//                                             </div>
                                           
//                                             {/* <input name="photo_Base64" type="file" className="form-control" /> */}
//                                             <textarea className="myTextarea" defaultValue="example"  placeholder="Article" name="article"/>
//                                     </div>
                                          
//                             </form>
//                 </div>
//             )
//         }
//     }
//  export default WriteAStory
            
