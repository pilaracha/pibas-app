var { response } = require("express");


module.exports = async (req, res, next) => {
    req.session.destroy( () => {
        res.json({ success: true });
    })
};
