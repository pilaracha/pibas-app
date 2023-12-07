module.exports = async (req, res) => {
    try {
        const user = req.session.user;

        res.json({user});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
