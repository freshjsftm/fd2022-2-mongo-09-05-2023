const createHTTPError = require('http-errors');
const Task = require('../models/Task');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body } = req;
    const task = await Task.create(body);
    if (!task) {
      return next(createHTTPError(400, 'Bad request!'));
    }
    res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    if (tasks.length === 0) {
      return next(createHTTPError(404, 'Tasks not found'));
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.findTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    const task = await Task.findById(idTask);
    if (!task) {
      return next(createHTTPError(404, 'Task not found!'));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
      body,
    } = req;
    const task = await Task.findByIdAndUpdate(idTask, body, { new: true , runValidators: true});
    if (!task) {
      return next(createHTTPError(404, 'Task not found!'));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    const task = await Task.findByIdAndDelete(idTask);
    if (!task) {
      return next(createHTTPError(404, 'Task not found!'));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};
