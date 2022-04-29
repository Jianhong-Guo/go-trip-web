import React from 'react';
import './style.css';
import { uid } from 'react-uid';
import Navbar from '../../Components/Navbar2';
import Headbar from '../../Components/Headbar';
import Footbar from '../../Components/Footbar';
import ImageButton from '../../Components/ImageButton';
import Grid from "@mui/material/Grid"
import { filterList,handleInputChange } from '../../actions/helper_functions';
import { setCurrentPost } from '../../actions/post';

class AllPosts extends React.Component {
    constructor(props){
        super(props)
        this.state={
            keyword: '',
            newPosts:[],
            allPosts:[]
        }
        this.handleInputChange=(e)=>{handleInputChange(this,e)};
    }
    handleSubmit = (app)=>{
        const newPosts=filterList(app.state.posts,this.state.keyword,["title"])
        this.setState({
            newPosts: newPosts
        })
    }
    static getDerivedStateFromProps(props, state) {
        if (props.app.state.posts !== state.allPosts) {
          return {
            allPosts: props.app.state.posts,
            newPosts: props.app.state.posts
          };
        }
        return null;
    }

    render() {
        console.log("AllPosts render")
        const {app}=this.props
        const currentUser=app.state.currentUser
        const newPosts=this.state.newPosts
        return (
            <div>
                <Headbar currentUser={currentUser}/>
                <Navbar currentUser={currentUser} selectedButton = {'postButton'}/>
                {/* need to change this className later */}
                <div className="personal_page_container"> 
                    <div className='searchComponent'>
                        <input id='searchInput'
                            type="text" 
                            value={ this.state.keyword }
                            onChange={this.handleInputChange}
                            name="keyword"
                            placeholder="keyword"
                            onKeyDown={(event)=>{
                                if (event.key === 'Enter') {
                                    this.handleSubmit(app)
                                }
                            }}
                            />
                        <button id='searchButton' onClick={() => this.handleSubmit(app)}>
                            search
                        </button>
                    </div>
                    <Grid container>
                        {newPosts.map((post)=>{
                        return(
                            <Grid item xs={4} key={uid(post)}>
                            <ImageButton
                            src={post.image.image_url} 
                            text={post.title} 
                            link_to={"/post"} 
                            onClick={()=>{setCurrentPost(app,post)}}
                            />
                            </Grid>
                        )
                        })}
                    </Grid>
                </div>

                <Footbar/>
            </div>
        )
    }

}

export default AllPosts;