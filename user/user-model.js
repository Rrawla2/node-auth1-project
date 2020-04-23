const db = require("../data/db-config.js")

module.exports = {
    add,
    find,
    findBy,
    findById
}

function find() {
    return db("users")
        .select("id", "username")
}

function add(user) {
    return db("users")
        .insert(user)
}

function findBy(filter) {
    return db("users")
        .where(filter)
}

function findById(id) {
    return db("users")
        .where({ id })
        .first()
}