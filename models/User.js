/* Restaurant and Reservation Models */
// DO NOT CHANGE THIS FILE

const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const ImageSchema = mongoose.Schema({
    image_id: {
        type: String,
        require: true
    },
    image_url: {
        type: String,
        required: true
    },
});

const SurveySchema = new mongoose.Schema({
    gender:{
        type: String, 
        // required: true,
    },
    age:{
        type: String, 
        // required: true,
    },
    attraction:{
        type: String, 
        // required: true,
    },
    distance:{
        type: String, 
        // required: true,
    },
    money:{
        type: String, 
        // required: true,
    },
    spend:{
        type: String, 
        // required: true,
    },
    duration:{
        type: String, 
        // required: true,
    },
    time:{
        type: String, 
        // required: true,
    },
    preferedGender:{
        type: String, 
        // required: true,
    },
    preferedAge:{
        type: String, 
        // required: true,
    },
    city:{
        type: String, 
        // required: true,
    }

})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
		required: true,
        minlength: 1,
    },
    email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,  
			message: 'Not valid email'
		}
    },
    password: {
        type: String, 
        required: true,
        minlength: 1,
    },  
    location: {
        type: String, 
    },
    image: ImageSchema,
    status: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    survey: SurveySchema
});


UserSchema.pre('save', function(next) {
	const user = this; 
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})


// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByEmailPassword = function(email, password) {
	const User = this // binds this to the User model

	// First find the user by their email
	return User.findOne({ email: email }).then((user) => {
		if (!user) {
			return Promise.reject('User Not Found')  
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
                    // check status
                    if (user.status === 'unfrozen') {
                        resolve(user)
                    } else { reject('This user is frozen') }
				} else {
					reject('Wrong Password')
				}
			})
		})
	})
}


const User = mongoose.model('User', UserSchema);

module.exports = { User };
