var path = require("path");
const passport = require('passport');

module.exports = function(app) {
    // Pop Up Library App Routes
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/1_index.html"));
    });

    app.get("/disclaimer", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/disclaimer.html"))
    });

    app.get("/home", function(req, res) {
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/3_home.html"));
        }

        else {
            res.redirect("/")
        }
    });

    app.get("/request_book", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/4_request_book.html"))
    });

    app.get("/your_requests", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/5_pending_requests.html"))
    });

    app.get("/offer_book", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/6_offer_book.html"))
    });

    app.get("/requested_books", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/7_requested-books.html"))
    });

    app.get("/offered_books", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/8_offered_books.html"))
    });

// **************************************************************************************************************************
    // Suite Dreams Routes
    app.get("/new-dream", function(req, res) {
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/newdream.html"));
        }

        else {
            res.redirect("/")
        }
      });

    app.get("/home", function(req, res) {
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/home.html"));
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