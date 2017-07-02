# NodeJS Test

Test steps:

* Unit Tests
* Integration Tests
* End to End

### Unit Testing Node.js Applications
The core idea with unit testing is to test a function when giving it certain set of inputs. We cann a function with certain parameters and check we got the correct result or not.

It is good practice with Javascript code to have a directory called test/ in our project's root directory.


__The Anatomy of unit Test:__

Each unit test has the following Structure

* Test Setup
* Calling the tested method
* Asserting

### For unit test modules in Nodejs

* test runner: [mocha](https://www.npmjs.com/package/mocha), alternatively [tape](https://www.npmjs.com/package/tape)
* assertion library: [chai](http://chaijs.com/), alternatively the assert module (for asserting)
* test spies, stubs and mocks: [sinon](http://sinonjs.org/) (for test setup).

### References for Mocha Chai

* [Unit Test in javascript mocha chai - sitepoint](https://www.sitepoint.com/unit-test-javascript-mocha-chai/)
* [Node Hero unit test tutorials - rising stack](https://blog.risingstack.com/node-hero-node-js-unit-testing-tutorial/)
* [Mocha Chai frontend JS - codeship](https://blog.codeship.com/mocha-js-chai-sinon-frontend-javascript-code-testing-tutorial/)

### Getting Started

```javascript
describe('Array', () => {
  it('should start empty', () => {
    // Test implementation goes here
  })

  // We can have more its here
})
```

describe is used to group individual tests, it is used to create a actual test.

__Writing the test code__
```javascript
var assert = chai.assert

describe('Array', () => {
  it('should start empty', () => {
    var arr = []
    assert.equal(arr.length, 0)
  })
})
```

assert takes two parameter ( actual value, expected value), we use expect assertion for getting more flexibility.

