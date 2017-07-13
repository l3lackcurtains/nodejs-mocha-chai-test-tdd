const express = require('express')

const app = express()


app.listen(1000, function(){
	console.log('1000 ma setup')
})


require('./app')