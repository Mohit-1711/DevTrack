import Problem from "../models/Problem.js";
import Project from "../models/Project.js";

export const getDashboard = async (req, res, next) => {
  try {
    const problems = await Problem.find({ user: req.user.id });
    const projects = await Project.find({ user: req.user.id });

    const stats = {
      totalProblems: problems.length,
      solved: 0,
      inProgress: 0,
      todo: 0,
      projects: projects.length,
    };

    for (const problem of problems) {
      if (problem.status === "Solved") stats.solved++;
      else if (problem.status === "In Progress") stats.inProgress++;
      else stats.todo++;
    }

    const recentProblems = problems
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((problem) => ({
        type: "problem",
        id: problem._id,
        title: problem.title,
        status: problem.status,
        platform: problem.platform,
        createdAt: problem.createdAt,
      }));

    const recentProjects = projects
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((project) => ({
        type: "project",
        id: project._id,
        title: project.name,
        status: project.status,
        createdAt: project.createdAt,
      }));

    const activity = [...recentProblems, ...recentProjects]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.json({ ...stats, activity });
  } catch (error) {
    next(error);
  }
};
