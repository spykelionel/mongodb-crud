const Todo = require("../models/Todo");

module.exports = {
  create: async (req, res) => {
    Todo?.exists({ title: req.body.title })
      .then(async (result) => {
        if (!result) {
          try {
            const todo = new Todo({
                ...req.body,
              });
              await todo
                .save()
                .then((result) => {
                  return res.status(201).send(result);
                })
                .catch((err) => {
                  return res.status(501).send(err);
                });
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(409).json({
            message: "Title already Exist",
          });
        }
      })
      .catch((err) => console.error(err));
  },

  getAll: async (req, res, next) => {
    await Todo.find({})
      .lean()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(503).send(err));
  },

  getOne: async (req, res) => {
    try {
      await Todo.findOne({ _id: req.params.id })
        .lean()
        .then((result) => {
          if (result) {
            return res.status(200).json({ ...result });
          }
          return res.status(404).json({
            message: "Todo Not found",
          });
        })
        .catch((err) => {
          return res.status(501).json({
            ...err,
            info: "Server Error",
          });
        });
    } catch (error) {
      res.status(501).json({
        ...error,
        info: "Server Error. Error getting the Todo",
      });
      throw new Error(error);
    }
  },

  deleteOne: async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id })
      .then((result) => {
        if (result.deletedCount == 1) {
           return res.status(200).send(result);   
        }
        res.status(404).json({
          message: "Todo Not found",
        });
      }) 
      .catch((err) =>
       res.status(501).json({
          ...err,
          message: "Not found",
        })
      );
  },

  update: async (req, res) => {
    Todo?.exists({ _id: req.params.id })
      .then(async (result) => {
        if (result) {
          try {
            await Todo.updateOne(
              { _id: req.params.id },
              {
                $set: req.body,
              }
            )
              .then((result) =>
                res.status(200).send({
                  ...result,
                  info: "successfully updated Todo",
                })
              )
              .catch((err) => res.status(301).send(err));
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(404).json({
            info: { message: "Todo not found.", valid: false },
          });
        }
      })
      .catch((err) => console.error(err));
  },
};