import './App.css';
import React from 'react'

class App extends React.Component {
  constructor(props){
    super(props)
    this.getPosts=this.getPosts.bind(this)
    this.showPosts=this.showPosts.bind(this)
    this.url="https://localhost:44361/api/useractions/GetAllPosts"
    this.state={
      posts:[],
      postItems:''
    }
  }
componentDidMount(){
  this.getPosts()
  //this.showPosts()
}
  async getPosts() {
    //const token = sessionStorage.getItem(tokenKey)
    try{
         await fetch(this.url)
         .then(response=> response.json())
         .then(result=> this.setState({posts:result},()=>console.log(this.state.posts)))

        //  .then(result=> console.log(result))
        }
        catch{

        }
}
showPosts(){

// const postItems = this.state.posts.map((post)=>
//       <div>{post.theme}</div> 
//     )
//     this.setState({postItems})
}
render(){
  return (
    <div className="d-flex">
      <div id="left"  className="col-md-7">
        Main Page
        {this.state.posts.map((post)=>
        <div>
          <div className="card mb-3 w-100" >
            <div className="row g-0">
              
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{post.header}</h5>
                  <p className="card-text">{post.description}</p>
                  {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                </div>
              </div>
              <div className="col-md-4">
                <img src={post.postPhoto} className="img-fluid rounded-end" alt="..."/>
              </div>
            </div>
          </div>
          
        </div>
        )}
      </div>
      <div id="right"  className="col-md-5">
        <div style={{padding: "3%"}}>
          <h4>DISCOVER MORE OF WHAT MATTERS TO YOU</h4>

          <div className="row">
            <div className="btn btn-outline-secondary col-sm m-1">col-sm</div>
            <div className="btn btn-outline-secondary col-sm m-1">col-sm</div>
            <div className="btn btn-outline-secondary col-sm m-1">col-sm</div>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default App;
