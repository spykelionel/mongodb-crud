const express = require("express");
const router = express.Router({ strict: true });
const todo = require('../controllers/todo.controller')

router
  .get("/", todo.getAll)
  .get("/:id", todo.getOne)
  .post("/", todo.create)
  .patch("/:id", todo.update)
  .delete("/:id", todo.deleteOne)

module.exports = router;