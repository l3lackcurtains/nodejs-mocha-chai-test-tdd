import mongoose from 'mongoose'
import chai from 'chai'
import sinon from 'sinon'
import User from '../models/user'
import { allUsers } from '../app/user'
import factories from './factories'

const expect = chai.expect

describe('Mongoose Database test', () => {
	// Before starting this test, we will create a sandboxed database connection
	// Once connection is done, invoke done()

	before((done) => {
		mongoose.Promise = require('bluebird')
		// mongodb://madhavp:madhav7@ds133981.mlab.com:33981/bakapp
		mongoose.connect('mongodb://localhoost/bakapp')
		const db = mongoose.connection
		db.on('error', () => console.error.bind(console, 'connection error!!'))
			.once('open', () => {
				console.log('We are connected to database.')
				done()
			})
	})

	// Test mongoose model ( required: true )
	describe('Mongoose model test', () => {
		it('Should be invalid if name is empty', done => {
			var user = new User()
			user.validate(err => {
				expect(err.errors.name).to.exist
				done()
			})
		})
	
		// if canPost = true, isAdmin = false then, canPost is required
		it('Should have validation error for canPost if not isAdmin', (done) => {
			const user = new User({ canPost: true })

			user.validate(err => {
				expect(err.errors.canPost).to.exist
				done()
			})
		})

		// if canPost = true, isAdmin = true then, canPost is not required
		it('should be valid canPost when isAdmin', done => {
			const user = new User({ isAdmin: true, canPost: true})
			
			user.validate(err => {
				expect(err.errors.canPost).to.not.exist
				done()
			})
		})
	})


	// Testing model instance methods
	describe('Testing model instance methods', () => {
		/*
		*  You’d typically have two kinds of instance methods on your models:
		*  1) Instance methods which do not access the database
		*  2) Instance methods which access the database
		*/

		beforeEach(function() {
			sinon.stub(User, 'findOne')
		})
	
	
		afterEach(function() {
			User.findOne.restore()
		})

		// Testing the checkForCanPost method
		it('Should check for canpost with the same name', () => {
			
			/*
			 *  This is the function that would get called,
			 *  so we stub it out so it doesn’t do any database access.
			 *  Stubbing it also allows us to use Sinon to check whether it was called with the
			 *  correct parameters.
			*/
			User.findOne

			const expectedName = 'This name should be used in the check'
			const user = new User({ name: expectedName })

			user.checkForCanPost(() => {})
			
			/*
			 *  we use sinon.assert.calledWith to check the stubbed finder was called correctly.
			*/
			sinon.assert.calledWith(User.findOne, {
				name: expectedName,
				canPost: true
			})
		})
		
		//  another test for this to confirm the result from findOne is handled correctly
		it('should call back with true when canPost exists', done => {
			const canPostObject = { name: 'Madhav'}

			/*
			 *  The yields function on a stub makes it automatically call any callback function
			 *  with a certain set of parameters – in this case, we’re passing null to signify
			 *  no error, and the cannPostObject to act as a found Mongoose model.
			*/
			User.findOne.yields(null, canPostObject)
			const user = new User({ name: 'Some name' })

			/*
			 *  This time we use a callback in checkForCanPost to do the assertion, as we want to
			 *  ensure it was called with the correct value.
			*/
			user.checkForCanPost(function(hasCanPost) {
				expect(hasCanPost).to.be.true
				done()
			})
		})



	})

	describe('Mongoose database external functions test', () => {
		beforeEach(function() {
			sinon.stub(User, 'find')
		})
	
	
		afterEach(function() {
			User.find.restore()
		})
		// Should send all users
		it('Should send all users', () => {
			const a = factories.validUser
			const b = factories.validUser
			const expectedModels = [a, b]
			User.find.yields(null, expectedModels)
			const req = { params: { } }
			const res = {
				send: sinon.stub()
			}

			allUsers(req, res)
			sinon.assert.calledWith(res.send, expectedModels)
		})

		/*
		 * In this one we’re setting up some expeced data – in this case, the expected list of models
		 *  the find function should return. We also set up the stub to yield the result.
		*/
		it('Should query for cannot post if set as request parameter', () => {
			User.find.yields(null, [])
			const req = {
				params: {
					canPost: true
				}
			}

			const res = { send: sinon.stub() }

			allUsers(req, res)
			sinon.assert.calledWith(User.find, { canPost: true })
		})
	})


	// Now we test the database
	describe('Mongoose Database Test', () => {
		
		// save object with 'name' value of 'John'
		it('Should save new name to test database', (done) => {
			const testUser = User({
				name: 'John'
			})
			testUser.save(done)
		})

		// Dont save incorrect object to database
		it('Should not save wrong object data', (done) => {
			const wrongUser = User({
				notName: 'Somebody else'
			})

			wrongUser.save(err => {
				if (err) return done()
				throw new Error('Should generate error..')
			})
		})

		// Retrieve data from test database
		it('Should retrieve data from test database', (done) => {
			User.find({ name: 'John' }, (err, user) => {
				if (err) throw err
				if(user.length == 0) throw new Error('No data')
				done()
			})
		})

		// After all test is done drop database and close connection
		after(done => {
			mongoose.connection.db.dropDatabase(() => {
				mongoose.connection.close(done)
			})
		})
	})
})


