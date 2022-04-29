const log=console.log

export const addImage = (filename, pageComp) => {
    log("addImage")
    // the URL for the request
    const url = "/images";

    // The data we are going to send in our request
    const imageData = new FormData()
    imageData.append("image",filename)
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: imageData,
    });

    // Send the request with fetch()
    fetch(request)
    .then(function (res) {
        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 200) {
            log("add image successful")
            return res.json();
        } else {
            log("add image unsuccessful")
        }
    })
    .then(json => {
        log("json")
        log(json)
        if(json){
            pageComp.setState({
                image:json
            })
        }
    })
    .catch(error => {
        console.log(error);
    });
};

export const handleImageInputChange = (p,event) => {
    event.preventDefault()
    const name = event.target.name 
    console.assert(name==="image")
    if(event.target.files.length>0){
        log("file")
        log(event.target.files[0])
        addImage(event.target.files[0],p)
    }
};

export const getImageById = (imageId, pageComp) => {
    
    const url = `/images/${imageId}`;

    const request = new Request(url, {
        method: "get",
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get image");
            }
        })
        .then(json => {
            pageComp.setState({ image: json.image });
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to send a DELETE request with an image PUBLIC id (id on cloudinary)
export const deleteImage = (imageId, pageComp) => {

    const url = `/images/${imageId}`;

    const request = new Request(url, {
        method: "delete",
    });

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                console.log("Delete successful")
                pageComp.setState(
                    { image: "" }
                );
            } else {
                alert("Could not delete image");
            }
        })
        .catch(error => {
            console.log(error);
        });
}