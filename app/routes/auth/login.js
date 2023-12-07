const fetch = require("node-fetch");
const mongoose = require("mongoose");
const { dehiaURL } = require("../../../config/dev");
const User = mongoose.model('users');

module.exports = async (req, res, next) => {
  try {
    const response = await fetch(`${dehiaURL}/api/v1.0/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: req.body.id_token,
      }),
    });

    const data = await response.json();

    if (data.error_code) {
      return next({
        status: data.status,
        message: "Authentication failed. User not found.",
      });
    } else {
      const token = {
        accessToken: data.access_token,
        expiresAt: data.expires_in,
      };

      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        user = new User({
          google_id: req.body.id_token,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        });
        await user.save();
      }
      req.session.user= user;
      req.session.userId = user.id;
      req.session.dehiaToken = data.access_token;
      res.json({ success: true, data: token });
    }
  } catch (error) {
    return next({
      status: 401,
      message: "Authentication failed.",
    });
  }
};