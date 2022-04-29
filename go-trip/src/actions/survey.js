import ENV from './../config.js'
const API_HOST = ENV.api_host
const log = console.log


export const editSurvey = (app, survey) => {
    log("editSurvey")
    log(survey)
    const request = new Request(`${API_HOST}/api/users/survey/${app.state.currentUser._id}`, {
        method: "put",
        body: JSON.stringify(survey),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
    .then(res => {
        if (res.status === 200) {
            console.log("edit survey successful")
            return res.json();
        }
        else{
            console.log("edit survey unsuccessful")
        }
    })
    .then(json=>{
        log("json")
        log(json)

        if(json){
            app.setState({
                currentUser: json
            })
        }

    }
    )
    .catch(error => {
        log("error")
        log(error);
    });
};