import React from 'react';
// import './style.css';
import {withRouter} from "react-router-dom"
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import Input2 from "../../Components/Input2"
import Grid from "@mui/material/Grid"
import Headbar from '../../Components/Headbar';
import Footbar from '../../Components/Footbar';
import ProfilePicSelector from '../../Components/ProfilePicSelector/index';
import { handleInputChange,findById } from '../../actions/helper_functions';
import { handleImageInputChange } from '../../actions/image';
import { editPostWithValidation } from '../../actions/post';

class EditPost extends React.Component {
    constructor(props){
        super(props)
        const {app}=this.props
        const posts=app.state.posts
        const postId=app.state.currentPostId
        const post=findById(posts,postId)
        this.state={
            title: post.title,
            content: post.content,
            location: post.location,
            image: post.image,
            locationErrorMessage:"",
            titleErrorMessage:"",
            contentErrorMessage:"",
        }
        this.post=post
        this.handleInputChange=(e)=>{handleInputChange(this,e)};
    }

    render() {
        const {app}=this.props
        return (
            <div>
                <Headbar/>
                <div className='proposalGrid'>
                    <h2>
                        <span className='up'> Edit your post </span>
                    </h2>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                        <Input2
                            name="title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            label="title"
                            errorMessage={this.state.titleErrorMessage}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <Input2
                            name="location"
                            value={this.state.location}
                            onChange={this.handleInputChange}
                            label="location"
                            errorMessage={this.state.locationErrorMessage}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <Input2
                            name="content"
                            value={this.state.content}
                            onChange={this.handleInputChange}
                            label="content"
                            extra="multiline"
                            errorMessage={this.state.contentErrorMessage}
                        />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs>
                        <Link to={'/post'} className="link"> 
                            <Button>
                                Cancel
                            </Button>
                        </Link>
                        </Grid>
                        <Grid item>
                            <Button onClick={()=>editPostWithValidation(this,app)}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </div>

                <div className="uploadPostImage">
                    <ProfilePicSelector image={this.state.image.image_url} on_change={(e)=>{handleImageInputChange(this,e)}}/>
                </div>

                <Footbar/>

            </div>
        )
    }

}

export default withRouter(EditPost);