const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const session = require("express-session")
const restricted = require("../auth/restricted-middleware.js")
const knexSessionStore = require("connect-session-knex")(session)

const userRouter = require("../users/user-router.js")
const authRouter = require("../auth/auth-router.js")

const server = express()

const sessionConfig = {
    name: "user-session",
    secret: "secretsecret",
    cookie: {
        maxAge: 3600 * 1000,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore (
        {
            knex: require("../data/db-config.js"),
            tablename: "sessioins",
            sidfilename: "sid",
            createtable: true,
            clearInterval: 3600 * 1000
        }
    )
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

server.use("/users", restricted, userRouter)
server.use("/auth", authRouter)

server.get("/", (req, res) => {
    res.json({ api: "up" })
})

module.exports = server;