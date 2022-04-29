import React from 'react';
import Navbar from '../../Components/Navbar2';
import Headbar from '../../Components/Headbar';
import Footbar from '../../Components/Footbar';
import { uid } from 'react-uid';
import ImageButton from '../../Components/ImageButton';
import Grid from "@mui/material/Grid"
import { filterList,handleInputChange } from '../../actions/helper_functions';
import { setCurrentProposal } from '../../actions/proposal';

class AllProposals extends React.Component {
    constructor(props){
        super(props)
        this.state={
            keyword: '',
            newProposals: [],
            allProposals:[]
        }
        this.handleInputChange=(e)=>{handleInputChange(this,e)};
    }
    handleSubmit = (app)=>{
        const newProposals=filterList(app.state.proposals,this.state.keyword,["title"])
        this.setState({
            newProposals: newProposals
        })
    }
    static getDerivedStateFromProps(props, state) {
        if (props.app.state.proposals !== state.allProposals) {
          return {
            allProposals: props.app.state.proposals,
            newProposals: props.app.state.proposals
          };
        }
        return null;
    }

    render() {
        console.log("AllProposals render")
        const {app}=this.props
        const currentUser=app.state.currentUser
        const newProposals=this.state.newProposals
        return (
            <div>
                <Headbar currentUser={currentUser}/>
                <Navbar currentUser={currentUser} selectedButton = {'proposalButton'}/>
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
                    <button id='searchButton' onClick={()=>this.handleSubmit(app)}>
                        search
                    </button>
                </div>
                <Grid container spacing={1}>
                    {newProposals.map((proposal)=>{
                    return(
                        <Grid item xs={4} key={uid(proposal)}>
                        <ImageButton 
                        src={proposal.image.image_url} 
                        text={proposal.title} 
                        link_to={"/proposal"} 
                        onClick={()=>{setCurrentProposal(app,proposal)}}
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

export default AllProposals;