$(document).ready(function () {
  
  var book_requests;

  // // Checks if logged in user has a set user name
  // function validateUserName() {
  //   $.get("/validate-user", function(data) {
  //     console.log("User", data);
  //     user = data;
      
  //     if (!user[0].userName) {
  //       console.log("username needed");
  //       renderModal();
  //     }

  //     else {
  //       displayedUser = user[0].userName;
  //       welcomeMessage.text("Welcome " + displayedUser)
  //       getBookRequests()
  //     }
  //   })
  // }

  // // If no userName info was found for the logged in user, it will generate the modal
  // function renderModal(new_user) {
  //   $(".modal").addClass("is-active");  
  // }

  // // When the user clicks "Save User" on the modal, it will check to see if that user name is already being used
  // function checkUsernames() {
  //   var inputtedUser = inputUser.val().trim();
  //   var inputtedZip = inputZip.val().trim();
  //   console.log("Username input: " + inputtedUser);
  //   var userString = "/" + inputtedUser;

  //   $.get("/check-user" + userString, function(data) {
  //     console.log(data);
  //     if (data === null) {
  //       updateUsername(inputtedUser, inputtedZip)
  //     }

  //     else {
  //       nameHelpText.text("Sorry. That user exists. Please try again")
  //       console.log("User exists. Try a different username")
  //       renderModal();
  //     }
  //   })
  // }

  // function updateUsername(user_input, zip_input) {
  //   displayedUser = user_input;
  //   welcomeMessage.text("Welcome " + displayedUser);
  //     $.ajax({
  //       method: "PUT",
  //       url: "/update-user/" + user_input + "/" + zip_input
  //     })
  //       .then(function() {
  //         window.location.href = "/home";
  //       });
  // }

  // This function grabs dreams from the database and updates the view
  function getBookRequests() {
    $.get("/community/requests", function (data) {
      console.log("Book requests", data);
      book_requests = data;
      if (!book_requests || !book_requests.length) {
        displayEmpty();
      }
      else {
        displayRequests(book_requests);
      }
    });
  }

  function displayRequests(results_list) {
    for (i=0; i < results_list.length; i++) {

      var dataObj = {
        id: results_list[i].id,
        title: results_list[i].title,
        category: results_list[i].category,
        publishedDate: results_list[i].publishedDate,
        description: results_list[i].description,
        author: results_list[i].author,
        thumbnail: results_list[i].thumbnail
    }

      var fullCard = $("<div>");
      fullCard.addClass("card");

      var cardContent = $("<div>");
      cardContent.addClass("card-content");

      var media = $("<div>");
      media.addClass("media");

      // Media-left content
      var mediaLeft = $("<div>");
      mediaLeft.addClass("media-left");

      var mediaLeftFigure = $("<figure>");
      mediaLeftFigure.addClass("image is-96x96");

      var mediaLeftImage = $("<img>");
      mediaLeftImage.attr("src", results_list[i].thumbnail);

      mediaLeftFigure.append(mediaLeftImage);
      mediaLeft.append(mediaLeftFigure);

      // Media content 
      var mediaContent = $("<div>");
      mediaContent.addClass("media-content");

      var title = $("<p>");
      title.addClass("title is-4");
      title.text(results_list[i].title);

      var pubDate = $("<p>");
      pubDate.addClass("subtitle is-6");
      pubDate.text(results_list[i].publishedDate)

      var author = $("<p>");
      author.addClass("subtitle is-6");
      author.text(results_list[i].author);

      var divider = $("<hr>")

      mediaContent.append(title);
      mediaContent.append(pubDate);
      mediaContent.append(author);
      mediaContent.append(divider);

      media.append(mediaLeft);
      media.append(mediaContent)

      var bookDesc = $("<div>")
      bookDesc.addClass("content");
      bookDesc.text(results_list[i].description);

      cardContent.append(media)
      cardContent.append(bookDesc);

      fullCard.append(cardContent);

      // Card Footer
      var footer = $("<footer>");
      footer.addClass("card-footer");

      var requestLink = $("<a>")
      // requestLink.attr("href", "/request");
      requestLink.addClass("card-footer-item delete-book");
      requestLink.text("Delete this Request");
      requestLink.data("book", dataObj)

      footer.append(requestLink);
      fullCard.append(footer);
      
      $("#requested_books").append(fullCard)
  }
  }


  // This function does an API call to delete dreamss
  function deleteRequest() {
    var selectedBook = $(this).data("book");
    console.log(selectedBook)
    $.ajax({
      method: "DELETE",
      url: "/book/request/delete/" + selectedBook.id
    })
      .then(function () {
        getBookRequests();
      });
  }

  // Getting the initial list of dreams
  // getDreams();
  getBookRequests();

  // **********************************************************************************************************************

  // InitializeRows handles appending all of our constructed post HTML inside
  function initializeRows() {
    dreamContainer.empty();
    var dreamsToAdd = [];
    var positiveDreams = 0;
    var negativeDreams = 0;
    var neutralDreams = 0;
    for (var i = 0; i < dreams.length; i++) {
      dreamsToAdd.push(createNewRow(dreams[i]));
      console.log(dreams[i])
      if(dreams[i].polarity === "positive") {
        positiveDreams++;
      }

      else if (dreams[i].polarity === "negative") {
        negativeDreams++;
      }

      else if (dreams[i].polarity === "neutral") {
        neutralDreams++;
      }

      else {
        continue
      }
    }
    createChart(positiveDreams, negativeDreams, neutralDreams);
    dreamContainer.append(dreamsToAdd);
  }

  // This function constructs a dream's HTML
  function createNewRow(dream) {
    console.log(dream.polarity);
    var dreamPrivacy;
    if (dream.privacy === true) {
      dreamPrivacy = "Private"
    }
    else if (dream.privacy === false) {
      dreamPrivacy = "Public"
    }
    var polcon = dream.polarity_confidence;
    var formattedPolCon = (parseFloat(polcon)*100).toFixed(1)
    console.log(typeof(dream.polarity_confidence));
    
  //   Building the container column
    var newDreamColumn = $("<div>");
    newDreamColumn.addClass("columns is-mobile");

    var actualColumn = $("<div>");
    actualColumn.addClass("column dream-column");

  //   Top header of the card
    var topHeader = $("<header>");
    topHeader.addClass("card-header");

    var topTitleHeader = $("<p>");
    topTitleHeader.text(dream.title);
    topTitleHeader.addClass("card-header-title has-text-centered");

  //   Bottom header of the card
    var bottomHeader = $("<header>");
    bottomHeader.addClass("card-header");

    var bottomSentimentHeader = $("<p>");
    bottomSentimentHeader.text("Sentiment: " + dream.polarity);
    bottomSentimentHeader.addClass("card-header-title");

    var bottomConfidenceHeader = $("<p>");
    bottomConfidenceHeader.text("Sentiment Confidence: " + formattedPolCon);
    bottomConfidenceHeader.addClass("card-header-title");

    var bottomPrivacyHeader = $("<p>");
    bottomPrivacyHeader.text("Status: " + dreamPrivacy);
    bottomPrivacyHeader.addClass("card-header-title");

    var bottomMoodHeader = $("<p>");
    bottomMoodHeader.text("Mood: " + dream.mood);
    bottomMoodHeader.addClass("card-header-title");

  //   Dream content container
    var dreamContentContainer = $("<div>");
    dreamContentContainer.addClass("card-content");

    var dreamContent = $("<div>");
    dreamContent.text(dream.dream)
    dreamContent.addClass("content");

    var timeSpace = $("<br>")

    var timeDiv = $("<time>");
    var formattedDate = new Date(dream.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    timeDiv.text(formattedDate)

  //   Card footer with edit and delete button
  var cardFooter = $("<footer>");
  cardFooter.addClass("card-footer");

  var editButton = $("<a>");
  editButton.text("Edit");
  editButton.addClass("button-edit card-footer-item");

  var deleteButton = $("<a>");
  deleteButton.text("Delete");
  deleteButton.addClass("button-delete card-footer-item");

  // Bringing all of the dream card components together 

  // Add top header sections to top header
  topHeader.append(topTitleHeader);

  // Add bottom header sections to bottom header
  bottomHeader.append(bottomSentimentHeader);
  bottomHeader.append(bottomConfidenceHeader);
  bottomHeader.append(bottomPrivacyHeader);
  bottomHeader.append(bottomMoodHeader);

  // Add dream content sections to dream container
  dreamContentContainer.append(dreamContent);
  dreamContentContainer.append(timeSpace);
  dreamContentContainer.append(timeDiv);

  // Add card footer sections to card footer
  cardFooter.append(editButton);
  cardFooter.append(deleteButton);

  // Bring together the top header, bottom header, content container, and footer under one column
  actualColumn.append(topHeader);
  actualColumn.append(bottomHeader);
  actualColumn.append(dreamContentContainer);
  actualColumn.append(cardFooter);

  // Finish building the full dream card and send data with it
  newDreamColumn.append(actualColumn);
  newDreamColumn.data("dream", dream);

  // Send the full dream card back for further use
    return newDreamColumn;
  }

  // This function figures out which dream we want to delete and then calls
  // deletePost
  function handleDreamsDelete() {
    var currentDream = $(this)
    .parent()
    .parent()
    .parent()
    .data("dream");
    deleteDream(currentDream.id);
    window.location.href = "/my-dreams";
  }
  // This function figures out which dream we want to edit and takes it to the
  // Appropriate url
  function handleDreamsEdit() {
    var currentDream = $(this)
      .parent()
      .parent()
      .parent()
      .data("dream");
    window.location.href = "/new-dream?dream_id=" + currentDream.id;
  }

  // This function displays a message when there are no dreams
  // function displayEmpty() {
  //   chartContainer.empty();
  //   dreamContainer.empty();
  //   var messageH2 = $("<h2>");
  //   messageH2.css({ "text-align": "center", "margin-top": "50px" });
  //   messageH2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new dream.");
  //   dreamContainer.append(messageH2);
  // }

  // This function handles reloading new dreams when the category changes
  function handlePrivacyChange() {
    var newDreamCategory = $(this).val();
    getDreams(newDreamCategory);
  }

});
