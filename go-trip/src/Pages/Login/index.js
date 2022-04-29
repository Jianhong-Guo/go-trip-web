import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'
import {withRouter} from "react-router-dom"
import Button from "@mui/material/Button";
import Input2 from "../../Components/Input2"
import Grid from "@mui/material/Grid"
import Headbar from '../../Components/Headbar';
import { handleInputChange } from '../../actions/helper_functions';

import { login } from "../../actions/user";

class Login extends React.Component {

    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            errorMessage: '',
        }
        this.handleInputChange=(e)=>{this.state.errorMessage="";handleInputChange(this,e)};
        this.props.history.push("/login");
    }

    render() {
        const { app } = this.props
        return (
            <div>
                <Headbar/>
                <div className="login_center">
                    <h1 className="login_h1">
                        LogIn
                    </h1>
                    <Input2
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        label="email"
                        errorMessage={this.state.errorMessage}
                    />
                    <Input2
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        label="password"
                        extra="password"
                        errorMessage={this.state.errorMessage}
                        onKeyDown={(event)=>{
                            if (event.key === 'Enter') {
                                login(this, app)
                            }
                        }}
                    />
                    <Button onClick={() => login(this, app)} fullWidth variant="contained">
                        Log in
                    </Button>

                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                        <Link to={'/signup'} className="link"> 
                            <Button>
                                Sign up
                            </Button>
                        </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

}

export default withRouter(Login);