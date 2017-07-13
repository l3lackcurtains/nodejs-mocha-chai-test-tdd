import User from '../models/user'

export const allUsers = (req, res) => {
	User.find({ canPost: req.params.canPost }, (err, users) => {
		res.send(users)
	})
}