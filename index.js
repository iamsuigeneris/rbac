const express = require("express")
const cors = require("cors")
const bp = require("body-parser")
const passport = require("passport")
const { success, error } = require("consola")
const { connect } = require("mongoose")

// import the app constants
const { DB, PORT } = require('./config')

// Initialize the application
const app = express()

// Middlewares
app.use(cors())
app.use(bp.json())
app.use(passport.initialize())

require("./middlewares/passport")(passport)

//Use Router Middleware
app.use('/api/users', require("./routes/users"))

const startApp = async () =>{
    try {
        // Connect to the DB
        await connect(DB, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        success({ 
            message:`Successfully connected to Database!`, badge: true
        })
        // Listening to the server
        app.listen(PORT, () => 
            success({message:`Server started on PORT ${PORT}`, badge: true}))
    }
    catch (err) {
        error({ message:`Error connecting to Database \n${err}`, badge: true})
        startApp()
    }
}
 startApp()

