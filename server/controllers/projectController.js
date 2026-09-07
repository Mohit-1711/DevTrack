import Project from "../models/Project.js";

export const getProjects = async (req, res, next) => {
  try { res.json(await Project.find({ user: req.user.id }).sort({ createdAt: -1 })); }
  catch (error) { next(error); }
};

export const createProject = async (req, res, next) => {
  try {
    const { name, description, techStack, status, githubUrl } = req.body;
    if (!name) return res.status(400).json({ message: "Project name is required" });
    const project = await Project.create({ name, description, techStack, status, githubUrl, user: req.user.id });
    res.status(201).json(project);
  } catch (error) { next(error); }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, req.body,
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) { next(error); }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (error) { next(error); }
};
