const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const util = require('util')
const vm = require('vm')

const context = vm.createContext()

const app = express()
const static = path.join(__dirname, 'static')
const jsonParser = bodyParser.json()

app.use('/', express.static(static))

app.post('/build', jsonParser, (req, res) => {
    const { content } = req.body

    try {
        // TODO: Create context per cell
        const script = new vm.Script(content)
        script.runInContext(context, {
            console: console,
            require: require
        })

        console.log(util.inspect(context))

    } catch(err) {
        console.log(err)
    }
})

app.listen(3000, () => console.log('Neptune server listening at :3000'))