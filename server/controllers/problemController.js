import Problem from "../models/Problem.js";

export const getProblems = async (req, res, next) => {
  try {
    const { search = "", status, difficulty } = req.query;
    const filter = { user: req.user.id };
    if (status) filter.status = status;
    if (difficulty) filter.difficulty = difficulty;
    if (search) filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { topic: { $regex: search, $options: "i" } },
      { platform: { $regex: search, $options: "i" } }
    ];
    const problems = await Problem.find(filter).sort({ createdAt: -1 });
    res.json(problems);
  } catch (error) { next(error); }
};

export const getProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findOne({ _id: req.params.id, user: req.user.id });
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    res.json(problem);
  } catch (error) { next(error); }
};

export const createProblem = async (req, res, next) => {
  try {
    const { title, platform, difficulty, status, topic, notes } = req.body;
    if (!title || !platform) return res.status(400).json({ message: "Title and platform are required" });
    const problem = await Problem.create({ title, platform, difficulty, status, topic, notes, user: req.user.id });
    res.status(201).json(problem);
  } catch (error) { next(error); }
};

export const updateProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    res.json(problem);
  } catch (error) { next(error); }
};

export const deleteProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    res.json({ message: "Problem deleted" });
  } catch (error) { next(error); }
};
