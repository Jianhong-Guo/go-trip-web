import React from 'react';
import {withRouter} from "react-router-dom"
import './style.css';
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import Input2 from "../../Components/Input2"
import Grid from "@mui/material/Grid"
import Headbar from '../../Components/Headbar';
import ProfilePicSelector from '../../Components/ProfilePicSelector/index';
import { handleInputChange } from '../../actions/helper_functions';
import { handleImageInputChange } from '../../actions/image';

import { signup } from "../../actions/user";

class Signup extends React.Component {
    state={
        username:"",
        email:"",
        password:"",
        location:"",
        image:{
            image_url:"",
            image_id:""
        },
        survey: {
            gender:"",
            age:"",
            attraction:"",
            distance:"",
            money:"",
            spend:"",
            duration:"",
            time:"",
            preferedAge:"",
            city:""
        },
        status: "unfrozen",
        isAdmin: false,
        emailErrorMessage:'',
        imageErrorMessage:'',
        passwordErrorMessage:'',
        usernameErrorMessage:''
    }
    constructor(props){
        super(props)
        this.handleInputChange=(e)=>{handleInputChange(this,e)};
    }

  render() {
    const { app } = this.props
    return (
        <div>
            <Headbar/>
            <div className="signup_center">
                
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                    <Input2
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        label="username"
                        errorMessage={this.state.usernameErrorMessage}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <Input2
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        label="email"
                        errorMessage={this.state.emailErrorMessage}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <Input2
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        label="password"
                        extra="password"
                        errorMessage={this.state.passwordErrorMessage}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <Input2
                        name="location"
                        value={this.state.location}
                        onChange={this.handleInputChange}
                        label="location"
                    />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs>
                    <Link to={'/'} className="link"> 
                        <Button>
                            Cancel
                        </Button>
                    </Link>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => signup(this, app)}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                
            </div>
            <div className="signup_selector">
                <ProfilePicSelector image={this.state.image.image_url} on_change={(e)=>{handleImageInputChange(this,e)}}
                                    wanted_shape = {'round'}/>
                <span className='imageError'>{this.state.imageErrorMessage}</span>
            </div>

        </div>

        
    )
  }
}

export default withRouter(Signup);