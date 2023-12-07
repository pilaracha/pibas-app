const mongoose = require("mongoose");
const Graphic = mongoose.model("graphics");

module.exports = {
  findAll(req, res) {
    Graphic.find({ user: req.session.userId })
      .then((graphics) => {
        res.json(graphics);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  findOne(req, res) {
    Graphic.findById(req.params.id)
      .then((graphic) => {
        if (!graphic) {
          return res
            .status(404)
            .json({ error: `Graphic not found with id: ${req.params.id}` });
        }
        return res.json(graphic);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  findByActivity(req, res) {
    Graphic.find({ activity: req.params.id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  save(req, res) {
    const graphicsData = req.body;
    const userId = req.session.userId;

    const graphicsToSave = graphicsData.map((graphic) => ({
      ...graphic,
      user: userId,
    }));

    Graphic.insertMany(graphicsToSave)
      .then(() => res.json({ success: true }))
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  markAsFavorite(req, res) {
    const graphicId = req.params.id;

    Graphic.findById(graphicId)
      .then((graphic) => {
        if (!graphic) {
          return res
            .status(404)
            .json({ error: `Graphic not found with id: ${graphicId}` });
        }
        graphic.is_favorite = !graphic.is_favorite;
        return graphic.save();
      })
      .then((updatedGraphic) => {
        return res.json(updatedGraphic);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  getFavoriteGraphics(req, res) {
    Graphic.find({ user: req.session.userId, is_favorite: true })
      .then((favoriteGraphics) => res.json(favoriteGraphics))
      .catch((err) => res.status(500).json({ error: err.message }));
  },


  search(req, res) {
    const { name, activity, is_favorite } = req.query;
    const userId = req.session.userId; 

    const searchCriteria = { user: userId }; 

    if (name) {
      searchCriteria.name = { $regex: new RegExp(name, "i") };
    }
    if (activity) {
      searchCriteria.activity = activity;
    }
    if (is_favorite) {
      searchCriteria.is_favorite = is_favorite === "true";
    }

    Graphic.find(searchCriteria)
      .then((graphics) => {
        res.json(graphics);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  },

  delete(req, res) {
    const graphicId = req.params.id;
    const userId = req.session.userId;

    Graphic.findOne({
      _id: graphicId,
      user: userId,
    })
      .then((graphic) => {
        if (!graphic) {
          return res
            .status(404)
            .json({ error: `Graphic not found with id: ${graphicId}` });
        }

        graphic
          .remove()
          .then(() => {
            res.status(204).send(); 
          })
          .catch((err) => res.status(500).json({ error: err.message }));
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  },
};
