import fs from 'fs'
import chai from 'chai'
import request from 'request'

import webpage from '../app/webpage'
import example from '../app/example'


const expect = chai.expect
const assert = chai.assert

// Test with some file operation
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


// Test with some basic arthemetic
describe('Simple arthemetic test', () => {
  describe('# indexOf ', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1,2,3].indexOf(5))
    })
  })

	describe('# Add two numbers', () => {
		it('Should add two numbers', () => {
			const res = example.add(3,1)
			expect(res).to.be.a('Number', 4 )
		})
	})

	describe('# Object include', () => {
		it('Should verify first and last name', () => {
			const res = example.setName({}, 'Madhav Poudel')
			expect(res).to.be.a('object').to.include({
				firstName: 'Madhav',
				lastName: 'Poudel'
			})
		})
	})
})




	
