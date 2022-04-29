import ENV from './../config.js'
const API_HOST = ENV.api_host
const log = console.log

export const getAllProposals = (app) => {
    log("getAllProposals")
    const request = `${API_HOST}/api/proposals`

    // Send the request with fetch()
    fetch(request)
    .then(res => {
        log("res")
        log(res)
        if (res.status === 200) {
            console.log("get proposal successful")
            return res.json();
        }
        else{
            console.log("get proposal unsuccessful")
        }
    })
    .then(json=>{
        log("json")
        log(json)
        if(json){
            app.setState({
                proposals: json
            })
            
        }
    }
    )
    .catch(error => {
        console.log(error);
    });
};




export const addProposal = (proposalComp, app) => {
    log("addProposal")
    log(proposalComp.state)
    const request = new Request(`${API_HOST}/api/proposals`, {
        method: "post",
        body: JSON.stringify(proposalComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            log("res")
            console.dir(res)
            if (res.status === 200) {
                console.log("add proposal successful")
                return res.json();
            }
            else{
                console.log("add proposal unsuccessful")
                return res.json()
            }
        })
        .then(json=>{
            log("json")
            log(json)
            if(json.title){
                const proposals=app.state.proposals
                proposals.push(json)
                app.setState({
                    proposals: proposals,
                    currentProposalId: json._id
                })

                proposalComp.props.history.push("/proposal")
            }
            else if(json.errors){
                const {title, location, numPeople}=json.errors
                let locationErrorMessage=""
                let titleErrorMessage=""
                let numPeopleErrorMessage=""
                let imageErrorMessage=""
                if(location){
                    locationErrorMessage='Please input location'
                }
                if(title){
                    titleErrorMessage='Please input title'
                }
                if(numPeople){
                    numPeopleErrorMessage='Please input valid number'
                }
                if(json.errors["image.image_url"]){
                    imageErrorMessage='Please add a picture'
                }
                proposalComp.setState({
                    locationErrorMessage:locationErrorMessage,
                    titleErrorMessage:titleErrorMessage,
                    numPeopleErrorMessage:numPeopleErrorMessage,
                    imageErrorMessage:imageErrorMessage
                })
            }
        }
        )
        .catch(error => {
            log("error")
            log(error)
        });
};

export const editProposal = (app,newProposal) => {
    log("editProposal")
    log("new proposal")
    log(newProposal)
    const request = new Request(`${API_HOST}/api/proposals`, {
        method: "put",
        body: JSON.stringify(newProposal),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
    .then(res => {
        log("res")
        log(res)
        if (res.status === 200) {
            console.log("edit proposal successful")
            return res.json();
        }
        else{
            console.log("edit proposal unsuccessful")
        }
    })
    .then(json=>{
        log("json")
        log(json)
        if(json && json.title){
            app.setState({
                currentProposalId: json._id
            })
        }
    }
    )
    .catch(error => {
        log("error")
        log(error)
    });
};


export const editProposalWithValidation = (editProposalComp, app) => {
    const newProposal=JSON.parse(JSON.stringify(editProposalComp.proposal))
    newProposal.title=editProposalComp.state.title
    newProposal.location=editProposalComp.state.location
    newProposal.numPeople=editProposalComp.state.numPeople
    newProposal.additionalInfo=editProposalComp.state.additionalInfo
    newProposal.image=editProposalComp.state.image
    log("editProposal")
    log("proposal")
    log(newProposal)
    const request = new Request(`${API_HOST}/api/proposals`, {
        method: "put",
        body: JSON.stringify(newProposal),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
    .then(res => {
        log("res")
        log(res)
        if (res.status === 200) {
            console.log("edit proposal successful")
            return res.json();
        }
        else{
            console.log("edit proposal unsuccessful")
            return res.json()
        }
    })
    .then(json=>{
        log("json")
        log(json)
        if(json.title){
            const proposal=editProposalComp.proposal
            proposal.title=json.title
            proposal.location=json.location
            proposal.numPeople=json.numPeople
            proposal.additionalInfo=json.additionalInfo
            proposal.image=json.image
            app.setState({
                currentProposalId: json._id
            })
            editProposalComp.props.history.push("/proposal")
        }
        else if(json.errors){
            const {title, location, numPeople}=json.errors
            let locationErrorMessage=""
            let titleErrorMessage=""
            let numPeopleErrorMessage=""
            if(location){
                locationErrorMessage='Please input location'
            }
            if(title){
                titleErrorMessage='Please input title'
            }
            if(numPeople){
                numPeopleErrorMessage='Please input valid number'
            }
            let imageErrorMessage=""
            if(json.errors["image.image_url"]){
                imageErrorMessage='Please add a picture'
            }
            editProposalComp.setState({
                locationErrorMessage:locationErrorMessage,
                titleErrorMessage:titleErrorMessage,
                numPeopleErrorMessage:numPeopleErrorMessage,
                imageErrorMessage:imageErrorMessage
            })
        }
    }
    )
    .catch(error => {
        log("error")
        log(error)
    });
};


export const deleteProposal = (app, proposal) => {
    log("deleteProposal")

    const request = new Request(`${API_HOST}/api/proposals`, {
        method: "delete",
        body: JSON.stringify(proposal),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
    .then(res => {
        log("res")
        log(res)
        if (res.status === 200) {
            console.log("delete proposal successful")
            return res.json();
        }
        else{
            console.log("delete proposal unsuccessful")
        }
    })
    .then(json=>{
        log("json")
        log(json)
        if(json){
            const proposals=app.state.proposals.filter((new_proposal)=> new_proposal._id !== proposal._id)
            app.setState({
                proposals: proposals,
                currentProposalId: -1
            })
        }
    }
    )
    .catch(error => {
        log("error")
        log(error);
    });
};

export const setCurrentProposal = (app,proposal) => {
    log("setCurrentProposal")
    log("proposal")
    log(proposal)
    let id=-1
    if(proposal){
        id=proposal._id
    }
    const request = new Request(`${API_HOST}/api/proposalId`, {
        method: "post",
        body: JSON.stringify({currentProposalId:id}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
    .then(res => {
        if (res.status === 200) {
            console.log("set proposalId successful")
            app.setState({
                currentProposalId: id
            })
        }
        else{
            console.log("set proposalId unsuccessful")
        }
    })
    .catch(error => {
        log("error")
        log(error)
    });
};