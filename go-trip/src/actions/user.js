// Functions to help with user actions.

// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)

// Send a request to check if a user is logged in through the session cookie

const log=console.log
export const checkSession = (app) => {
    log("checkSesson")
    const url = `${API_HOST}/users/check-session`;

    if (!ENV.use_frontend_test_user) {
        fetch(url)
        .then(res => {
            log("res")
            log(res)
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            log("json")
            log(json)
            if (json) {
                app.setState({
                    currentUser: json.currentUser,
                    currentProposalId: json.currentProposalId,
                    currentPostId: json.currentPostId
                });
            }
        })
        .catch(error => {
            log("error")
            log(error);
        });
    } else {
        log("ENV.use_frontend_test_user===true")
        app.setState({ currentUser: ENV.user });
    }
};

export const getAllUsers = (app) => {
    log("getAllUsers")
    const url = `${API_HOST}/api/users`;

    fetch(url)
    .then(res => {
        log("res")
        log(res)
        if (res.status === 200) {
            return res.json();
        }
    })
    .then(json => {
        log("json")
        log(json)
        if(json){
            app.setState({
                allUsers: json
            })
        }
    })
    .catch(error => {
        log("error")
        log(error);
    });
};

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
    log("login")
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/users/login`, {
        method: "post",
        body: JSON.stringify(loginComp.state),
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
        return res.json();
    })
    .then(json => {
        log("json")
        log(json)
        if (json.currentUser) {
            app.setState({ currentUser: json.currentUser });
            getAllUsers(app)
        }
        else if(json.errorMessage){
            loginComp.setState({ errorMessage: json.errorMessage})
        }
    })
    .catch(error => {
        log("error")
        log(error);
    });
};

// to signup
export const signup = (signupComp, app) => {
    log("signup")
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/api/users`, {
        method: "post",
        body: JSON.stringify(signupComp.state),
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
                return res.json();
            } else{
                console.log("signup unsuccessful")
                return res.json()
            }
        })
        .then(json => {
            log("json")
            log(json)
            if (json && json.currentUser) {
                // json.currentUser.image=signupComp.state.image
                // app.setState({ currentUser: json.currentUser });
                signupComp.props.history.push("/login")
            }
            else if(json.errors){ 
                console.log('signup errors:', json.errors)
                let emailErrorMessage=""
                let imageErrorMessage=""
                let passwordErrorMessage=""
                let usernameErrorMessage=""
                if(json.errors["email"]){
                    emailErrorMessage='Please add email'
                }
                if(json.errors["image.image_url"]){
                    imageErrorMessage='Please add a picture'
                }
                if(json.errors["password"]){
                    passwordErrorMessage='Please add password'
                }
                if(json.errors["username"]){
                    usernameErrorMessage='Please add username'
                }
                signupComp.setState({
                    emailErrorMessage:emailErrorMessage,
                    imageErrorMessage:imageErrorMessage,
                    passwordErrorMessage:passwordErrorMessage,
                    usernameErrorMessage:usernameErrorMessage
                })
            }
        })
        .catch(error => {
            log("error")
            log(error)
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    log("logout")
    const url = `${API_HOST}/users/logout`;

    fetch(url)
        .then(res => {
            log("res")
            log(res)
            app.setState({
                currentUser: null,
                message: { type: "", body: "" }
            });
        })
        .catch(error => {
            log("error")
            log(error);
        });
};

export const changeStatus = (userId, newStatus) => {
    const request = new Request(`${API_HOST}/api/users/${userId}`, {
        method: "put",
        body: JSON.stringify({
            "status": newStatus
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    console.log(newStatus)
    console.log(`${API_HOST}/api/users/${userId}`)

    fetch(request)
    .then(res => {
        if (res.status === 200) {
            console.log("change status successful")
        }
        else{
            console.log("change status unsuccessful")
        }
    })
    .catch(error => {
        console.log(error);
    });
};