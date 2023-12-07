const mongoose = require('mongoose');
const fetch = require("node-fetch");
const { dehiaURL } = require("../../../config/dev");
const Dashboard = mongoose.model('dashboards');
const Graphic = mongoose.model('graphics');

async function home(req, res) {
    try {
        const userId = req.session.userId;

        const activitiesResponse = await fetch(
            `${dehiaURL}/api/v1.0/actividades/user`,
            {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + req.session.dehiaToken,
                },
            }
        );

        const activitiesJson = await activitiesResponse.json();
        let totalActivities = 0;
        if (activitiesJson.results) {
            totalActivities = activitiesJson.total;
        }              
          
        const totalDashboards = await Dashboard.countDocuments({ user: userId });

        const totalGraphics = await Graphic.countDocuments({ user: userId });

        res.json({
            totalActivities,
            totalDashboards,
            totalGraphics
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    home
};