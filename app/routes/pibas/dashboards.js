const mongoose = require("mongoose");
const Dashboard = mongoose.model("dashboards");

module.exports = {
  findAll(req, res) {
    Dashboard.find({ user: req.session.userId }) 
      .populate("graphics")
      .then((dashboards) => res.json(dashboards))
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  findOne(req, res) {
    Dashboard.findById(req.params.id)
      .populate("graphics")
      .then((dashboard) => {
        if (!dashboard) {
          return res
            .status(404)
            .json({ error: `Dashboard not found with id: ${req.params.id}` });
        }
        return res.json(dashboard);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  updateDashboard(req, res) {
    const dashboardId = req.params.id;
    const updateFields = {};

    if (req.body.name !== undefined) {
        updateFields.name = req.body.name;
    }

    if (req.body.graphics && req.body.graphics.length > 0) {
        updateFields.graphics = req.body.graphics;
    }

    Dashboard.findByIdAndUpdate(
      dashboardId,
      updateFields,
      { new: true }
    )
      .populate("graphics")
      .then((updatedDashboard) => {
        if (!updatedDashboard) {
          return res
            .status(404)
            .json({ error: `Dashboard not found with id: ${dashboardId}` });
        }
        return res.json(updatedDashboard);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  save(req, res) {
    const dashboard = new Dashboard({
      ...req.body,
      user: req.session.userId,
    });
    dashboard
      .save()
      .then((savedDashboard) => res.json({ success: true, dashboardId: savedDashboard._id }))
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  markAsFavorite(req, res) {
    const dashboardId = req.params.id;

    Dashboard.findById(dashboardId)
      .populate("graphics")
      .then((dashboard) => {
        if (!dashboard) {
          return res
            .status(404)
            .json({ error: `Dashboard not found with id: ${dashboardId}` });
        }
        dashboard.is_favorite = !dashboard.is_favorite;
        return dashboard.save();
      })
      .then((updatedDashboard) => {
        return res.json(updatedDashboard);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  getFavoriteDashboards(req, res) {
    Dashboard.find({ user: req.session.userId, is_favorite: true })
      .populate("graphics")
      .then((favoriteDashboards) => res.json(favoriteDashboards))
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  delete(req, res) {
    const dashboardId = req.params.id;
    const userId = req.session.userId;

    Dashboard.findOne({
      _id: dashboardId,
      user: userId,
    })
      .then((dashboard) => {
        if (!dashboard) {
          return res
            .status(404)
            .json({ error: `Dashboard not found with id: ${dashboardId}` });
        }

        dashboard
          .remove()
          .then(() => {
            res.status(204).send();
          })
          .catch((err) => res.status(500).json({ error: err.message }));
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  },
};
