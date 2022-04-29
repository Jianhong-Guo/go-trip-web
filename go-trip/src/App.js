import React from 'react';
import './App.css';
import PersonalPage from './Pages/PersonalPage';
import Post from './Pages/Post'
import Proposal from './Pages/Proposal'
import Signup from './Pages/Signup'
import UploadProposal from './Pages/UploadProposal';
import UploadPost from './Pages/UploadPost';
import EditPost from './Pages/EditPost';
import EditProposal from './Pages/EditProposal';
import AllProposals from './Pages/AllProposals';
import AllPosts from './Pages/AllPosts';
import Admin from './Pages/Admin';
import Login from './Pages/Login';
import Survey from './Pages/Survey/survey'
import SurveyResult from './Pages/Survey/surveyResult';
import { Switch, Route, BrowserRouter } from 'react-router-dom';


// import { getAllProposals } from '../../actions/proposal';
// import { getAllPosts } from '../../actions/post';
import { getAllPosts } from './actions/post';
import { getAllProposals } from './actions/proposal';
import { checkSession, getAllUsers } from "./actions/user";

class App extends React.Component {

    componentDidMount() {
        checkSession(this) // sees if a user is logged in
        getAllUsers(this)
        getAllProposals(this)
        getAllPosts(this)
    }
    
    constructor(props){
        super(props)
        this.state={
            currentProposalId: -1,
            currentPostId:-1,
            currentUser: null,
            allUsers:{},
            proposals:[],
            posts:[],
        }
    }

    changeSurvey = (survey) => {
        this.state.currentUser.survey = survey
        this.forceUpdate()
      };
 
    render() {
        const { currentUser } = this.state;
        console.log("App render")
        console.log(this.state)
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact path={["/", "/login", "/personalpage", "/admin"]}
                        render={ props => (
                            <div className="app">
                                { !currentUser ? <Login {...props} app={this} /> 
                                    : currentUser.isAdmin===false ? <PersonalPage {...props} app={this} />
                                    : <Admin {...props} app={this} />
                                } 
                            </div>
                        )}
                    />
                
                    <Route exact path='/signup' 
                        render = {() => <Signup app={this} /> } 
                    />

                    <Route exact path='/uploadproposal' 
                        render = {() => <UploadProposal app={this}/> } 
                    />
                    <Route exact path='/editproposal' 
                        render = {() => <EditProposal app={this}/> } 
                    />
                    <Route exact path='/uploadpost' 
                        render = {() => <UploadPost app={this}/> } 
                    />
                    <Route exact path='/editpost' 
                        render = {() => <EditPost app={this}/> } 
                    />
                    <Route exact path='/post' 
                        render = {() => <Post app={this}/> }
                    />
                    <Route exact path='/proposal' 
                        render = {() => <Proposal app={this}/> }
                    />
                    <Route exact path='/allposts' 
                        render = {() => <AllPosts app={this} />} 
                    />
                    <Route exact path='/allproposals' 
                        render = {() => <AllProposals app={this}/> } 
                    />
                    <Route exact path='/admin' 
                        render = {() => <Admin app={this} /> } 
                    />
                    <Route exact path='/survey' 
                        render = {() => <Survey app={this}/> } 
                    />
                    <Route exact path='/surveyresult' 
                        render = {() => <SurveyResult app={this}/> } 
                    />
                    
                </Switch>
            </BrowserRouter>
        )
    }

}

export default App;