require('dotenv').config();
var db = require("../models");
var keys = require("../config/keys.js");
var books = require('google-books-search');

module.exports = function (app) {

    // Library API routes
    app.get("/validate-user", function(req, res) {
        db.User.findAll({
            where: {
                id: req.user.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.get("/check-user/:user_name", function(req, res) {
        db.User.findOne({
            where: {
                userName: req.params.user_name
            }
        }).then(function (dbUser) {
            console.log(dbUser);
            res.json(dbUser);
        });
    });

    app.put("/update-user/:user_name/:zip_code", function(req, res) {
        db.User.update({
            userName: req.params.user_name,
            zipCode: req.params.zip_code
          },
          {
            where: {
              id: req.user.id
            }
          }).then(function(dbUser) {
            res.json(dbUser);
        })
    })

    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect('/')
    });

    app.get("/search/books/:query", function (req, res) {
        // $.get("https://www.googleapis.com/books/v1/volumes?q=" + req.params.query, function(result) {
        //     res.json(result)
        // })
        books.search(req.params.query, function(error, results) {
            if ( ! error ) {
                res.json(results);
            } else {
                console.log(error);
            }
        });
        
    });

    app.post("/book/request", function(req, res) {
        db.User.findOne({
            where: {
                id: req.user.id,
            }
        }).then(function (user_info) {
            db.Book.create({
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                description: req.body.description,
                postType: "REQUEST",
                postStatus: "REQUESTED",
                thumbnail: req.body.thumbnail,
                UserId: req.user.id
            })
          .then(function(postedBook) {
            res.json(postedBook);
          });
        });
    });

    // Get route for returning posts of a specific category
    app.get("/profile/requests", function(req, res) {
        db.Book.findAll({
        where: {
            UserId: req.user.id,
            postType: "REQUEST"
        }
        })
        .then(function(book_requests) {
            res.json(book_requests);
        });
    });

    // DELETE route for deleting Dream
    app.delete("/book/request/delete/:id", function (req, res) {
        db.Book.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            res.json(result);
        });
    });

// ******************************************************************************
    //GET route for getting all of the dreams
    app.get("/social-feed/all", function (req, res) {
        db.Dream.findAll({
            where: {
                privacy: 0
            },
            include: {
                model: db.User,
                attributes: ['userName']
            }
        }).then(function (dbDreams) {
            res.json(dbDreams);
        });
    });

    //GET route for getting all of the dreams
    app.get("/my-feed/", function (req, res) {
        db.Dream.findAll({
            where: {
                UserId: req.user.id
            }
        }).then(function (dbDreams) {
            res.json(dbDreams);
        });
    });



    //GET route for retrieving a single dream
    app.get("/update-dream/:id", function (req, res) {
        db.Dream.findOne({
            where: {
                id: req.params.id,
                UserId: req.user.id
            }
        }).then(function (dbDreams) {
            console.log(dbDreams);
            res.json(dbDreams);
        });
    });

    // POST route for saving a new Dream
    app.post("/add-dream", function(req, res) {
        console.log("User ID (Line 41 dreams-api-routes.js): " + req.user.id)
        console.log(req.body);
        var textPolarity = "";
        var confPolarity = "";
        var AYLIENTextAPI = require('aylien_textapi');
        var textapi = new AYLIENTextAPI({
        application_id: keys.aylien.application_id,
        application_key: keys.aylien.application_key
        });
    
        textapi.sentiment({
            'text': req.body.dream
        }, function(error, response) {
            if (error === null) {
            console.log("Sentiment Response: " + response);
            textPolarity = response.polarity;
            confPolarity = response.polarity_confidence;
            db.Dream.create({
                title: req.body.title,
                mood: req.body.mood,
                dream: req.body.dream,
                privacy: req.body.privacy,
                polarity: textPolarity,
                polarity_confidence: confPolarity,
                UserId: req.user.id
            })
          .then(function(dbDream) {
            res.json(dbDream);
          });
        };
      });
    });

    //PUT route for updating Dream
    app.put("/add-dream", function (req, res) {
        console.log(req.body);
        var textPolarity = "";
        var confPolarity = "";
        var AYLIENTextAPI = require('aylien_textapi');
        var textapi = new AYLIENTextAPI({
        application_id: keys.aylien.application_id,
        application_key: keys.aylien.application_key
        });
    
        textapi.sentiment({
            'text': req.body.dream
        }, function(error, response) {
            if (error === null) {
            console.log("Sentiment Response: " + response);
            textPolarity = response.polarity;
            confPolarity = response.polarity_confidence;
        db.Dream.update(
          {
            title: req.body.title,
            mood: req.body.mood,
            dream: req.body.dream,
            privacy: req.body.privacy,
            polarity: textPolarity,
            polarity_confidence: confPolarity,
            UserId: req.user.id
          },
          {
            where: {
              id: req.body.id
            }
          })
          .then(function(dbPost) {
            res.json(dbPost);
          });
        };
      });
    });
};