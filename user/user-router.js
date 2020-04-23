const router = require("express").Router()

const Users = require("./user-model.js")

router.get("/", (req, res) => {
    Users.find()
})