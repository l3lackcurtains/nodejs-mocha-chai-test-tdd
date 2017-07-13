const validUser = () => ({
	name: 'Some name here!',
	isAdmin: false,
	canPost: false
})

const canPostUser = () => ({
	name: 'Somebody who can post',
	isAdmin: false,
	canPost: true
})

export default { validUser, canPostUser }