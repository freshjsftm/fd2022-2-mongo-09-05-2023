const Comment = require('../models/Comment');
const Task = require('../models/Task');
module.exports.createComment = async (req, res, next) => {
  try {
    const {
      params: { idTask },
      body,
    } = req;
    const comment = await Comment.create({ ...body, task: idTask });
    await Task.findByIdAndUpdate(idTask, {comments: [comment._id]})
    res.status(201).send({ data: comment });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate('task');
    res.status(200).send({ data: comments });
  } catch (error) {
    next(error);
  }
};
