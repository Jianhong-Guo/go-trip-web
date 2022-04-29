import ENV from './../config.js'
const API_HOST = ENV.api_host
const log = console.log

export const getAllPosts = (app) => {
    log("getAllPosts")
    const request = `${API_HOST}/api/posts`

    // Send the request with fetch()
    fetch(request)
    .then(res => {
        log("res")
        log(res)
        if (res.status === 200) {
            console.log("get post successful")
            return res.json();
        }
        else{
            console.log("get post unsuccessful")
        }
    })
    .then(json=>{
        log("json")
        log(json)
        if(json){
            app.setState({
                posts: json
            })
        }
    }
    )
    .catch(error => {
        log("error")
        log(error)
    });
};

export const addPost = (postComp, app) => {
    log("addPost")
    log(postComp.state)
    const request = new Request(`${API_HOST}/api/posts`, {
        method: "post",
        body: JSON.stringify(postComp.state),
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
                console.log("add post successful")
                return res.json();
            }
            else{
                console.log("add post unsuccessful")
                return res.json()
            }
        })
        .then(json=>{
            log("json")
            log(json)
            if(json.userId){
                const posts=app.state.posts
                posts.push(json)
                app.setState({
                    posts: posts,
                    currentPostId: json._id
                })
                postComp.props.history.push("/post")
            }
            else if(json.errors){
                const {title, location, content}=json.errors
                let locationErrorMessage=""
                let titleErrorMessage=""
                let contentErrorMessage=""
                if(location){
                    locationErrorMessage='Please input location'
                }
                if(title){
                    titleErrorMessage='Please input title'
                }
                if(content){
                    contentErrorMessage='Please input content'
                }
                let imageErrorMessage=""
                if(json.errors["image.image_url"]){
                    imageErrorMessage='Please add a picture'
                }
                postComp.setState({
                    locationErrorMessage:locationErrorMessage,
                    titleErrorMessage:titleErrorMessage,
                    contentErrorMessage:contentErrorMessage,
                    imageErrorMessage:imageErrorMessage
                })
            }
        }
        )
        .catch(error => {
            log("error")
            log(error);
        });
};

export const editPostWithValidation = (editPostComp, app) => {
    const newPost=JSON.parse(JSON.stringify(editPostComp.post))
    newPost.title=editPostComp.state.title
    newPost.location=editPostComp.state.location
    newPost.content=editPostComp.state.content
    newPost.image=editPostComp.state.image
    log("editPost")
    log("post")
    log(newPost)
    const request = new Request(`${API_HOST}/api/posts`, {
        method: "put",
        body: JSON.stringify(newPost),
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
            console.log("edit post successful")
            return res.json();
        }
        else{
            console.log("edit post unsuccessful")
            return res.json()
        }
    })
    .then(json=>{
        log("json")
        log(json)
        if(json.userId){
            const post=editPostComp.post
            post.title=json.title
            post.location=json.location
            post.content=json.content
            post.image=json.image
            app.setState({
                currentPostId: json._id
            })
            editPostComp.props.history.push("/post")
        }
        else if(json.errors){
            const {title, location, content}=json.errors
            let locationErrorMessage=""
            let titleErrorMessage=""
            let contentErrorMessage=""
            if(location){
                locationErrorMessage='Please input location'
            }
            if(title){
                titleErrorMessage='Please input title'
            }
            if(content){
                contentErrorMessage='Please input content'
            }
            editPostComp.setState({
                locationErrorMessage:locationErrorMessage,
                titleErrorMessage:titleErrorMessage,
                contentErrorMessage:contentErrorMessage
            })
        }
    }
    )
    .catch(error => {
        log("error")
        log(error)
    });
};

export const editPost = (app, newPost) => {
    log("editPost")
    log("new post")
    log(newPost)
    const request = new Request(`${API_HOST}/api/posts`, {
        method: "put",
        body: JSON.stringify(newPost),
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
            console.log("edit post successful")
            return res.json();
        }
        else{
            console.log("edit post unsuccessful")
        }
    })
    .then(json=>{
        log("json")
        log(json)
        if(json && json.userId){
            app.setState({
                currentPostId: json._id
            })
        }
    }
    )
    .catch(error => {
        log("error")
        log(error);
    });
};

export const deletePost = (app, post) => {
    log("deletePost")
    const request = new Request(`${API_HOST}/api/posts`, {
        method: "delete",
        body: JSON.stringify(post),
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
            console.log("delete post successful")
            return res.json();
        }
        else{
            console.log("delete post unsuccessful")
        }
    })
    .then(json=>{
        log("json")
        log(json)
        if(json){
            const posts=app.state.posts.filter((new_post)=> new_post._id !== post._id)
            app.setState({
                posts: posts,
                currentPostId: -1
            })
        }
    }
    )
    .catch(error => {
        log("error")
        log(error);
    });
};


export const setCurrentPost = (app,post) => {
    log("setCurrentPost")
    log("post")
    log(post)
    let id=-1
    if(post){
        id=post._id
    }
    const request = new Request(`${API_HOST}/api/postId`, {
        method: "post",
        body: JSON.stringify({currentPostId:id}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
    .then(res => {
        if (res.status === 200) {
            console.log("set postId successful")
            app.setState({
                currentPostId: id
            })
        }
        else{
            console.log("set postId unsuccessful")
        }
    })
    .catch(error => {
        log("error")
        log(error)
    });
};