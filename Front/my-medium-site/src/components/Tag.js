import React from 'react'
// import Loader from 'react-loader-spinner'
import {connect} from "react-redux"
class Tag extends React.Component{
    constructor(props){
        super(props)
        this.getPosts=this.getPosts.bind(this)
        this.getProfile=this.getProfile.bind(this)
        this.scrollHandler=this.scrollHandler.bind(this)
        this.getProfileUrl="https://localhost:44361/api/user/"
        this.getPostsUrl="https://localhost:44361/api/useractions/GetSomePostsByTheme/"

        this.state={
            // profile:[],
            posts:[],
            loaded:false,
            currentPostsAmount:0
        }
    }

    componentDidMount(){

        //this.getProfile()
        //  console.log(this.props.location.aboutProps===undefined)
         try{
            document.addEventListener('scroll',this.scrollHandler)
            //  console.log(this.props.match.params.id)
            console.log(this.props.match.params.title);
            // if(this.props.match.params.title){
            //     console.log(this.props.match.params.title)
            //      this.setState({
            //          posts:this.props.location.aboutProps.posts,
            //          loaded:true
            //      })

            //      let filteredPosts=this.state.posts.filter((post)=>{
            //          return post.theme=this.props.match.title?post:null
            //      })
            //      this.setState({
            //          posts:filteredPosts
            //      })
            //  }else{
            //      this.setState({
            //          loaded:false
            //      })
                // this.getProfile(this.props.match.params.id);
                // console.log(this.props.match)
                this.getPosts(this.props.match.params.title,this.state.currentPostsAmount);
            // }
         }
         catch{

         }
        
    }
    componentWillUnmount(){
        document.removeEventListener('scroll',this.scrollHandler)
      }
      scrollHandler=(e)=>{
        if(e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop+window.innerHeight)<50){
          // console.log(this.state.loading)
         // if(this.state.loading){
            this.setState({currentPostsAmount:this.state.currentPostsAmount+3,loading:false},
              ()=>this.getPosts(this.props.match.params.title,this.state.currentPostsAmount))
          //}
          
      
          // console.log('scrollHeight', e.target.documentElement.scrollHeight)
          // console.log('scrollTop', e.target.documentElement.scrollTop)
          // console.log('innerHeight', window.innerHeight)
        }
      
      
      }
    // componentDidUpdate(prevProps) {
    //     console.log(prevProps)
    //     if(this.props.location.aboutProps!==prevProps.location.aboutProps){
    //             this.setState({
    //                 profile:prevProps.location.aboutProps.profile,
    //                 posts:prevProps.location.aboutProps.posts
    //             })
    //     }
    // }
    
        getProfile = async function(id){
            const response=await fetch(this.getProfileUrl+id)
            // console.log(response)
            const result = await response.json()
            if (response.ok === true) {
                this.setState({
                    profile:result
                })
                console.log(result)
            }
            else{
                console.log(result)
            }
        }

 getPosts = async function(theme,postsToDisplay){

                const response=await fetch(this.getPostsUrl+theme+"/"+postsToDisplay)
                if (response.ok === true) {
                    const result = await response.json()
                    this.setState({
                        posts:[...this.state.posts,...result],

                        //posts:result,
                        loaded:true
                    })
                    console.log(result)
                }
                else{
                    const errorData = await response.json()
                    console.log(errorData)
                }
            }
            
        render(){
            return(

                <div className="container">
                    {this.state.posts.map(post=>
                    <a href={"/posts/"+post.postsId} style={{textDecoration:"none",color:"black",cursor:"unset"}}>

                        <div>
                            <div className="mb-3 w-100"  style={{backgroundColor:"inherit"}}>
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
                    </a>
                    )}
                </div>
            )
        }
    }
    function mapStateToProps(state){
        return{
            credentials:state.credentials
        }
    }

 export default connect(mapStateToProps)(Tag)
            
