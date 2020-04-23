const bcrypt = require("bcryptjs")

const router = require("express").Router()

const Users = require("../user/user-model.js")

router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "error retrieving users", err })
        })
})

router.post("/register", (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 8)

    user.password = hash
    console.log(user)
    Users.add(user)
        .then(user => {
            res.status(201).json({ saved })
        })
        .catch(err => {
            res.status(500).json({ message: "Error with registration", err})
        })
})

router.post("/login", (req, res) => {
    const { username, password } = req.body
    
    Users.findBy({ username })
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.password)) {
                req.session.user = username
                res.status(200).json({ message: `Welcome ${username}`})
            } else {
                res.status(401).json({ message: "Invalid Login" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error logging in", err })
        })
})

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.send("Unable to logout")
        } else {
            res.send("You are now logged out")
        }
    })
})

module.exports = router;