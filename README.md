# team32
This website is created by Roland Gao, Hilda Wang and Jianhong Guo
## Link

https://floating-dawn-64164.herokuapp.com


Go-trip is an app that allows users to share travel experiences, initiate trips, and join/quit trips. This app can recommend you find your ideal travel partners by filling in a survey.

Please include a list of any third-party libraries you used in your project in your README.md file.
You must cite the source of any specific code that you didn't write, or which was generated for you.

Tech stack: React + Express + MongoDB + Cloudinary

third-party libraries:  Material UI (using for some input fields, and grids).
                        We installed Bootstrap, but we decided not to use it.
                        Some buttons use css button examples from https://getcssscan.com/css-buttons-examples?ref=beautifulboxshadow-bottom.

Installation:
```
git clone https://github.com/csc309-fall-2021/team32.git
cd team32
mkdir mongo-data
mongod --dbpath ./mongo-data
npm run setup
npm run build-run
```

login credentials:
    
    user: email: user@gmail.com   password: user
    user2: email: user2@gmail.com   password: user2
    user3: email: user3@gmail.com   password: user3
    You can also sign up by yourself.

    admin: email: admin@gmail.com   password: admin

features:

    Instruction for users:
        1. Signup
        You can signup for a new user account. When uploading an image, wait for it to show up because it has to be stored in Cloudinary. Input validation is implemented to ensure the correct inputs. If inputs are wrong, you will see error messages.

        2. Login
        Log in using one of the populated credentials above, or signup for a new user. You will see error messages when you input the wrong username/password or if your account is frozen by the admin. 

        3. Fill a travelling matching survey to find a partner
        Click the "Fill the travelling matching survey" button at the bottom of the personal page to fill out the survey. Based on the results of your survey, you will be matched other people that have similar interests with you. They will show up as "username: email", so you can contact them via email to further discuss your travel plans.
       
        4. Add proposal and add post
        In your personal page, you can click on the Add Proposal button to add a proposal, or on the Add Post button to add a post. Input validation is implemented to ensure the correct inputs. If inputs are wrong, you will see error messages.

        5 Edit Posts and Proposals
        After clicking the image button of your post or proposal, you can click the edit button to edit the post or proposal. In addition to the text fiels, you can also change the image by clicking on it. Input validation is implemented to ensure the correct inputs. If inputs are wrong, you will see error messages. The edited post or proposal will be shown afterwards.

        6. Delete Posts and Proposals
        You can delete posts and proposals created by youself. You cannot delete other people's posts and proposals.

        7. View Posts and Proposals:
        You can view posts created by all users in the All Posts tab, and view proposals created by all users in the All Proposals tab. You can see posts and proposals created by yourself in your personal page as well as the in All Posts and All Proposals. Click on any image button to see the detailed view of the post/proposal.
        You can only edit/delete the posts that are created by yourself.

        8. Join a proposal
        When viewing a proposal not created by yourself, you have the option to join their proposal if you are interested in their plan. Click the join button to join their proposal, and click the remove button to remove yourself if you change your mind. After joining a proposal, the proposal image button will show up on your personal page below your posts and proposals.

        9. Search for Posts and Proposals
        You can search for posts and proposals by using the search bar at the top of All Posts and All Proposals. Only results with titles that match your search input will be shown

        10. Comments Section
        You can comment underneath posts and proposals. The comments section correctly handles comments from multiple users.

        11. Navigation
        You can use the navigation bar on the left to go to All Posts, ALl Proposals, and Personal Page. You can click your profile picture to go to your personal page. You can click the logo to go to All Posts.

        12. Log out
        Click log out button at the bottom of the personal page.

        13. Multi-user support
        The website works best when there are many active users on the website. Try logging out and signing up for new users and interacting with other users through their posts and proposals, comment sections, and survey recommendations. 


    Instruction for admin:

        1. log into admin using email: admin@gmail.com and password: admin.

        2. Admin can delete any post. For example, go to Posts Management in the navigation bar, click Torrence post, and click delete post.

        3. Admin can delete any proposal. For example, go to Proposals Management in the navigation bar, click CN Tower proposal, and click delete proposal.

        4. Admin can freeze and unfreeze any user account. For example, go to Accounts Management, and click a user profile to freeze/unfreeze the user.
       
        5. Admin can log out on the Accounts Management page.

        6. If a user is freezed by the admin, it cannot log in anymore. For example, after admin freezes user2, log out, and try to log into user2 with username: user2, password: user2. An error message will be displayed saying that the user account is frozen.

        7. After a post or proposal is deleted by the admin, the post or proposal is actually deleted. You won’t find the post or proposal anymore in any user account.

overview of the routes

Most routes have the authenticate middleware, so they only work when actually logged in.

1: POST /api/users
    This is used to uploads a new user.
    return the user object if it is succesful.
    Input: 
    {   "username": String,
        "email": String,
        "password": String
        "location": String, 
        "image": ImageSchema,
        "status": String,
        "isAdmin": Boolean,
    }
    Please refer the full schema in models.

2: Post /users/login
   This is used to login and create an session.
   return the current user who login.
   Input:
   {   "email": String
       "password": String
   }
   Please refer the full schema in models.

3: get /api/users
   This is used to get all uesers in our data base, and it will be used for admin user to handle users.
   return all user obeject as an dictionary with user id as key, and user object as value.
   No input required

4: Put /api/users/:id
   This is used to change the user status while admin can freeze an user account, and user can not login with the freezed status.
   return an user object that we change the status
   input{
       "status": "unfrozen"/"frozen"
   }
 
5: Put /api/users/survey/:id
   This is used for changing the user survey info for user with parameter id.
   return the user objects with the survey we changed.
   input{
       	"gender":String,
		"age": String,
		"attraction": String,
		"distance": String,
		"money": String,
		"spend": String,
		"duration": String,
		"time": String,
		"preferedGender": String,
		"preferedAge": String,
		"city": String
   }
   Please refer the full schema in models.

6: Post /api/proposals
   This is used to upload an proposal.
   Return the proposal we add.
   input:{
        "title": String,
        "location": String,
        "numPeople": int,
        "additionalInfo": String,
        "image":  ImageSchema,
        "userId": IdObject
   }
    Please refer the full schema in models.

7: Post /api/proposalId
    This is used to change the current proposal id.
    return "proposalId changed" if it is successful.
    input:
    {
     "currentProposalId": IdObejct
    }

8: Get /api/proposals
    This is used to get all proposals in database.
    return all proposals.
    No input required

9. Put /api/proposals
    This is used to change a proposal.
    Return the changed proposal.
    input:
    {
        "_id": IdObject,
        "title": String,
        "location": String,
        "numPeople": int,
        "additionalInfo": String,
        "image":  ImageSchema,
        "userId": IdObject
    }

10: Delete /api/proposals
    This is used to delete a proposal.
    Return the deleted proposal.
    input:
    {
        "_id": IdObeject
    }

11: Post /api/posts
   This is used to upload an post.
   Return the post we add.
   input:{
        "title": String, 
        "content":String,
        "location":String,
        "image": ImageSchema,
		"userId": IdObject
   }
    Please refer the full schema in models.

12: Post /api/postId
    This is used to change the current post id.
    return "postId changed" if it is successful.
    input:
    {
     "currentPostId": IdObejct
    }

13: Get /api/posts
    This is used to get all posts in database.
    return all posts.
    No input required
   
14: Put /api/posts
    This is used to change a post.
    Return the changed post.
    input:
    {
        "_id": IdObject,
        "title": String, 
        "content":String,
        "location":String,
        "image": ImageSchema,
		"userId": IdObject
    }

15: Delete /api/posts
    This is used to delete a post.
    Return the deleted post.
    input:
    {
        "_id": IdObeject
    }















