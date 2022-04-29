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
import { editProposalWithValidation } from '../../actions/proposal';
import { handleImageInputChange } from '../../actions/image';

class EditProposal extends React.Component {
    
    constructor(props){
        super(props)
        const proposals=this.props.app.state.proposals
        const proposalId=this.props.app.state.currentProposalId
        const proposal=findById(proposals,proposalId)
        this.state={
            title: proposal.title,
            location: proposal.location,
            numPeople: proposal.numPeople,
            additionalInfo: proposal.additionalInfo,
            image: proposal.image,
            locationErrorMessage:"",
            titleErrorMessage:"",
            numPeopleErrorMessage:"",
            imageErrorMessage:"",
            additionalInfoErrorMessage:""
        }
        this.proposal=proposal
        this.handleInputChange=(e)=>{handleInputChange(this,e)};
    }
    
    render() {
        const {app}=this.props

        return (
            <div>
                <Headbar/>
                <div className='proposalGrid'>
                    <h2>
                        <span className='up'> Edit your proposal </span>
                    </h2>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                        <Input2
                            name="title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            label="title"
                            errorMessage={this.state.titleErrorMessage}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <Input2
                            name="location"
                            value={this.state.location}
                            onChange={this.handleInputChange}
                            label="location"
                            errorMessage={this.state.locationErrorMessage}
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <Input2
                            name="numPeople"
                            value={this.state.numPeople}
                            onChange={this.handleInputChange}
                            label="number of people"
                            errorMessage={this.state.numPeopleErrorMessage}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <Input2
                            name="additionalInfo"
                            value={this.state.additionalInfo}
                            onChange={this.handleInputChange}
                            label="additional information"
                            extra="multiline"
                            errorMessage={this.state.additionalInfoErrorMessage}
                        />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs>
                        <Link to={'/proposal'} className="link"> 
                            <Button>
                                Cancel
                            </Button>
                        </Link>
                        </Grid>
                        <Grid item>
                            <Button onClick={()=>{
                                editProposalWithValidation(this,app)
                                }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </div>

                <div className="uploadProposalImage">
                    <ProfilePicSelector image={this.state.image.image_url} on_change={(e)=>{handleImageInputChange(this,e)}}/>
                    <span className='imageError'>{this.state.imageErrorMessage}</span>
                </div>

                <Footbar/>
            </div>
        )
    }

}

export default withRouter(EditProposal);