import React from 'react';
import {withRouter} from "react-router-dom"
import './style.css';
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import Input2 from "../../Components/Input2"
import Grid from "@mui/material/Grid"
import Headbar from '../../Components/Headbar';
import Footbar from '../../Components/Footbar';
import ProfilePicSelector from '../../Components/ProfilePicSelector/index';
import { handleInputChange } from '../../actions/helper_functions';
import { addPost } from '../../actions/post';
import { handleImageInputChange } from '../../actions/image';

class UploadPost extends React.Component {
    constructor(props){
        super(props)
        const {app}=this.props
        this.handleInputChange=(e)=>{handleInputChange(this,e)};
        this.state = {
            title: '',
            content: '',
            location: '',
            locationErrorMessage:"",
            titleErrorMessage:"",
            contentErrorMessage:"",
            imageErrorMessage:"",
            image: {
                image_url:"",
                image_id:""
            },
            userId: app.state.currentUser._id
        }
    }

    render() {
        const {app}=this.props
        return (
            <div>
                <Headbar/>
                <div className='proposalGrid'>
                    <h2>
                        <span className='up'> Upload your post </span>
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
                        <Link to={'/personalpage'} className="link"> 
                            <Button>
                                Cancel
                            </Button>
                        </Link>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => addPost(this, app)}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </div>

                <div className="uploadPostImage">
                    <ProfilePicSelector image={this.state.image.image_url} on_change={(e)=>{handleImageInputChange(this,e)}}/>
                    <span className='imageError'>{this.state.imageErrorMessage}</span>
                </div>
                <Footbar/>
            </div>
        )
    }

}

export default withRouter(UploadPost);