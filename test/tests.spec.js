const fs = require('fs')
const request = require('request')

const expect = require('chai').expect
const assert = require('chai').assert


const webpage = require('./webpage')
const example = require('./example')

describe('The webpage module', () =>{
	it('saves the content', function * () {
		const url = 'google.com'
		const content = '<h1>title</h1>'
		const writeFileStub = this.sandbox.stub(fs, 'writefile', (filePath, fileContent, cb) => {
			cb(null)
		})

		const requestStub = this.sandbox.stub(request, 'get', (url, cb) => {
			cb(null, null, content)
		})

		const result = yield webpage.saveWebpage(url)

		expect(writeFileStub).to.be.calledWith()
		expect(requestStub).to.be.calledWith(url)
		expect(result).to.rql('page')

	})
})

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1,2,3].indexOf(5))
    })
  })
})

describe('Add two numbers', () => {
	it('Should add two numbers', () => {
		const res = example.add(3,1)
		expect(res).to.be.a('Number', 4 )
	})
})


describe('Contains first and last name', () => {
	it('Should verify first and last name', () => {
		const res = example.setName({}, 'Madhav Poudel')
		expect(res).to.be.a('object').to.include({
			firstName: 'Madhav',
			lastName: 'Poudel'
		})
	})
})
