var path = require("path");
const passport = require('passport');

module.exports = function(app) {
    
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/new-dream", function(req, res) {
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/newdream.html"));
        }

        else {
            res.redirect("/")
        }
      });

    app.get("/my-dreams", function(req, res) {
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/new_mydreams.html"));
        }

        else {
            res.redirect("/")
        }
    });

    app.get("/insights", function(req, res) {
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/new_insights.html"));
        }

        else {
            res.redirect("/")
        }
    });

    app.get("/social-feed", function(req, res) {
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/new_dreamsfeed.html"));
        }

        else {
            res.redirect("/")
        }
    });
};
