/* server.js for react-express-authentication */
"use strict";


const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

//////

const log = console.log;
const path = require('path')

const express = require("express");
// starting the express server
const app = express();

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");

// import the mongoose models
const { User } = require("./models/User");
const { Post } = require("./models/Post");
const { Proposal } = require("./models/Proposal");
const { Image } = require("./models/image");

// to validate object IDs
const { ObjectId } = require("mongodb");

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser') 
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)


// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo'); // to store session information on the database in production
const { ObjectID } = require('mongoose/node_modules/mongodb');


function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    // if (env !== 'production' && USE_TEST_USER)
    //     req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

    if (req.session.currentUser) {
        User.findById(req.session.currentUser._id).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}


/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 6000000, // 100 mins
            httpOnly: true
        },
        // store the sessions on the database in production
        store: env === 'production' ? MongoStore.create({
                                                mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/StudentAPI'
                                 }) : null
    })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {
	log("/users/login post")
    const email = req.body.email;
    const password = req.body.password;
	
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByEmailPassword(email, password)
        .then(user => {
            req.session.currentUser=user
			res.send({ currentUser: user });
        })
        .catch((error) => {
            res.send({ errorMessage: error})
        });
});


// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
	log("/users/check-session get")

    if (req.session.currentUser) {
		log("req.session.currentUser")
		log(req.session.currentUser)
        res.send({
			currentUser: req.session.currentUser, 
			currentPostId: req.session.currentPostId,
			currentProposalId: req.session.currentProposalId
		});
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** API Routes below ************************************/
// sign up
app.post('/api/users', mongoChecker, (req, res) => {
	log("/api/users post")

	// Create a new restuarant using the Resturant mongoose model
	const survey=({
		"gender": "",
		"age": "",
		"attraction": "",
		"distance":"",
		"money":"",
		"spend":"",
		"duration":"",
		"time":"",
		"preferedGender":"",
		"preferedAge":"",
		"city":"",
	})
	const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
        image: req.body.image,
		status: req.body.status,
		isAdmin: req.body.isAdmin,
        survey: survey
	})

    log(user)

	// normal promise version:
	user.save().then((result) => {
		res.send({currentUser: result})
	}).catch((error) => {
		console.log("error")
		console.dir(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send(error) // 400 for bad request gets sent to client.
		}
	}) 

})

// A route to login and create a session
app.post("/users/login", (req, res) => {
	log("/users/login post")
    const email = req.body.email;
    const password = req.body.password;

    // log(email, password);
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByEmailPassword(email, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            // req.session.user = user._id;
            // req.session.email = user.email; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            req.session.currentUser=user
			res.send({ currentUser: user });
        })
        .catch((error) => {
            res.send({ errorMessage: error})
        });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
    // Remove the session
	log("/users/logout get")
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});


app.get('/api/users', (req, res) => {
	log("/api/users get")
	User.find({}).then(function (users) {
		const users_dic={}
		for(let i=0;i<users.length;i++){
			const user=users[i]
			users_dic[user._id]={
				username: user.username,
				email: user.email,
				location: user.location,
				image: user.image,
				survey: user.survey,
				status: user.status,
				isAdmin: user.isAdmin
			}
		}
		res.send(users_dic);
	})
	.catch((error)=> {
		log(error)
		res.status(500).send("Internal Server Error")
	})
})

//id is the user id, change the status state of user
// TODO: id is currently undefined
app.put('/api/users/:id', mongoChecker, (req, res) => {
	// Add code here
    const id = req.params.id
	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send('Resource not found')  // could not find this restaurant
		} else {
			user.status = req.body.status,
			user.save()
			res.send(user)
		}
	}).catch((error) => {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}) 
})


// change survey
app.put('/api/users/survey/:id', mongoChecker, authenticate, (req, res) => {
	// Add code here
	log('/api/users/:id patch')
    const id = req.params.id
	if (!ObjectId.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}
	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send('Resource not found')  // could not find this restaurant
		} else {
			user.survey = req.body
			user.save()
			res.send(user)
		}
	}).catch((error) => {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}) 
})


app.post('/api/proposals',mongoChecker, authenticate, (req, res) => {
	log('/api/proposals post')
	const proposal = new Proposal({
        // "user": req.user._id,
        "title": req.body.title,
        "location": req.body.location,
        "numPeople": req.body.numPeople,
        "additionalInfo": req.body.additionalInfo,
        "image": req.body.image,
		"userId": req.body.userId,
		"all_comments": [],
		"joinedPeople": []
	})

	// normal promise version:
	proposal.save().then((result) => {
		req.session.currentProposalId=result._id
		res.send(result)
	}).catch((error) => {
		console.log("error")
		console.dir(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send(error) // 400 for bad request gets sent to client.
		}
	}) 

})

app.post('/api/proposalId',mongoChecker, authenticate, (req, res) => {
	log('/api/proposalId post')
	req.session.currentProposalId=req.body.currentProposalId
	res.send("proposalId changed")
})

app.get('/api/proposals',mongoChecker, (req, res) => {
	log('/api/proposals get')
	Proposal.find({}).then(function (proposals) {
		res.send(proposals);
	})
	.catch((error)=> {
		log(error)
		res.status(500).send("Internal Server Error")
	})
})

app.put('/api/proposals', mongoChecker, authenticate, async (req, res) => {
	// Add code here
	log('/api/proposals put')
	const proposal_id=req.body._id
	if (!ObjectId.isValid(proposal_id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}
	try{
		const proposal= await Proposal.findOneAndReplace({_id: proposal_id},req.body,{new: true})
		if (!proposal) {
			res.status(404).send('Resource not found')  // could not find this restaurant
		}
		else{
			req.session.currentProposalId=proposal._id
			res.send(proposal)
		}
	}
	catch(error){
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send(error)
		}
	}

})


// returns the deleted proposal
app.delete('/api/proposals',mongoChecker, authenticate, (req, res) => {
	// Add code here
	log('/api/proposals delete')
    const id = req.body._id
	// Validate id
	if (!ObjectId.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	Proposal.findByIdAndRemove(id).then((proposal) => {
		if (!proposal) {
			res.status(404).send()
		} else {
			req.session.currentProposalId=-1
			res.send(proposal)
		}
	})
	.catch((error) => {
		log(error)
		res.status(500).send() // server error, could not delete.
	}) 

})


app.post('/api/posts', mongoChecker, authenticate, (req, res) => {
	log("/api/posts post")

	const post = new Post({
        // "user": req.user._id,
        "title": req.body.title, 
        "content": req.body.content,
        "location":req.body.location,
        "image": req.body.image,
		"userId": req.body.userId,
		"all_comments": []
	})
	// normal promise version:
	post.save().then((result) => {
		req.session.currentPostId=result._id
		res.send(result)
	}).catch((error) => {
		log("error")
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send(error) // 400 for bad request gets sent to client.
		}
	}) 

})

app.post('/api/postId',mongoChecker, authenticate, (req, res) => {
	log('/api/postId post')
	req.session.currentPostId=req.body.currentPostId
	res.send("postId changed")
})

app.get('/api/posts', mongoChecker, (req, res) => {
	log('/api/posts get')
	Post.find({}).then(function (posts) {
		res.send(posts);
	})
	.catch((error)=> {
		log(error)
		res.status(500).send("Internal Server Error")
	})
}) 

app.put('/api/posts', mongoChecker, authenticate, async (req, res) => {
	// Add code here
	log('/api/posts put')
	const post_id=req.body._id
	if (!ObjectId.isValid(post_id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}
	try{
		const post= await Post.findOneAndReplace({_id: post_id},req.body,{new: true})
		if (!post) {
			res.status(404).send('Resource not found')  // could not find this restaurant
		}
		else{
			req.session.currentPostId=post._id
			res.send(post)
		}
	}
	catch(error){
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send(error)
		}
	}
})

app.delete('/api/posts',mongoChecker, authenticate, (req, res) => {
	log('/api/posts delete')
    const id = req.body._id
	// Validate id
	if (!ObjectId.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}
	
	Post.findByIdAndRemove(id).then((post) => {
		if (!post) {
			res.status(404).send()
		} else {
			req.session.currentPostId=-1
			res.send(post)
		}
	})
	.catch((error) => {
		log(error)
		res.status(500).send() // server error, could not delete.
	}) 
})

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'daqpm95y9',
    api_key: '786182466961967',
    api_secret: '1yR8wG_tQDShlX3fJdgh2PtuFi8'
});


/*** Image API Routes below ************************************/

// a POST route to *create* an image
app.post("/images", multipartMiddleware, (req, res) => {

    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {

            // Create a new image using the Image mongoose model
            const img = new Image({
                image_id: result.public_id, // image id on cloudinary server
                image_url: result.url, // image url on cloudinary server
            });

            // Save image to the database
            img.save().then(
                saveRes => {
					log('saveRes', saveRes)
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
});

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/go-trip/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {

    // send index.html
    res.sendFile(path.join(__dirname, "/go-trip/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5001;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});