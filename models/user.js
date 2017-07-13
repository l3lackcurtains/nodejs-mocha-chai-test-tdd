import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	location: {
		type: String
	},
	isAdmin: {
		type: Boolean
	},
	canPost: {
		type: Boolean,
		validate: function(v) {
			return v === true && this.isAdmin === true
		}
	}
})

userSchema.methods.checkForCanPost = function(cb) {
	this.model('User').findOne({
		name: this.name,
		canPost: true
	}, function(err, val) {
		cb(!!val)
	})
}


const User = mongoose.model('User', userSchema)

export default User