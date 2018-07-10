$(document).ready(function () {
  
    // //dream container that holds all dreams posted.
    // var dreamContainer = $("#dream-container");
    // var chartContainer = $(".chart-container")
    var inputUser = $("#user_name_input");
    var inputZip = $("#zip_code_input");
    var nameHelpText = $("#user_help_text");
    var formattedAddress = $("#formatted_address");
    var inputAddress = $("#address_input");
    var welcomeMessage = $("#welcome_message");
    var displayedUser;
    $(document).on("click", ".delete-book", deleteRequest);
    $(document).on("click", ".confirm-book", viewRequest);
    // // Points to the dropdown menu for selecting what privacy setting to query 
    // var privacySetting = $("#privacy");
    // //click events for the edit and delete button
    // $(document).on("click", ".button-delete", handleDreamsDelete);
    // $(document).on("click", ".button-edit", handleDreamsEdit);
    // privacySetting.on("change", handlePrivacyChange);
    $(".delete").click(function() {
      $(".modal").removeClass("is-active");
   });

   $("#save_user").on("click", checkUsernames);
   $("#confirm_address").on("click", searchAddress);
    
    var book_requests;

    function searchAddress() {
      var inputtedAddress = {
        address: inputAddress.val().trim()
      };
      console.log(inputtedAddress)
      $.post("/check-address", inputtedAddress, function(data) {
        console.log(data)
        formattedAddress.text("Your Formatted Address: " + data[0].formatted_address)
        var addressObject = {
          address: data[0].formatted_address,
          lat: data[0].location.lat,
          lng:data[0].location.lng, 
        }
        console.log("vvv Address Object vvv")
        console.log(addressObject)
        
      })

    }

    function saveAddress() {
      var inputtedAddress = {
        address: inputAddress.val().trim()
      };
      console.log(inputtedAddress)
      $.ajax({
        method: "PUT",
        url: "/save-address",
        data: inputtedAddress
      })
        .then(function() {
          window.location.href = "/home";
      });
    }

    // Checks if logged in user has a set user name
    function validateUserName() {
      $.get("/validate-user", function(data) {
        console.log("User", data);
        user = data;
        
        if (!user[0].userName) {
          console.log("username needed");
          renderModal();
        }

        else {
          displayedUser = user[0].userName;
          welcomeMessage.text("Welcome " + displayedUser)
          getBookRequests()
          getBookOffers()
        }
      })
    }

    // If no userName info was found for the logged in user, it will generate the modal
    function renderModal(new_user) {
      $(".modal").addClass("is-active");  
    }

    // When the user clicks "Save User" on the modal, it will check to see if that user name is already being used
    function checkUsernames() {
      var inputtedUser = inputUser.val().trim();
      var inputtedZip = inputZip.val().trim();
      console.log("Username input: " + inputtedUser);
      var userString = "/" + inputtedUser;

      $.get("/check-user" + userString, function(data) {
        console.log(data);
        if (data === null) {
          updateUsername(inputtedUser, inputtedZip)
        }

        else {
          nameHelpText.text("Sorry. That user exists. Please try again")
          console.log("User exists. Try a different username")
          renderModal();
        }
      })
    }

    function updateUsername(user_input, zip_input) {
      displayedUser = user_input;
      welcomeMessage.text("Welcome " + displayedUser);
        $.ajax({
          method: "PUT",
          url: "/update-user/" + user_input + "/" + zip_input
        })
          .then(function() {
            saveAddress();
          });
    }
  
    // This function grabs dreams from the database and updates the view
    function getBookRequests() {
      $.get("/profile/requests", function (data) {
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

    function getBookOffers() {
      $.get("/profile/offers", function (data) {
        console.log("Book offers", data);
        book_offers = data;
        if (!book_offers || !book_offers.length) {
          displayEmpty();
        }
        else {
          displayOffers(book_offers);
        }
      });
    }

    function displayOffers(results_list) {
      for (i=0; i < results_list.length; i++) {

        var dataObj = {
          id: results_list[i].id,
          title: results_list[i].title,
          category: results_list[i].category,
          publishedDate: results_list[i].publishedDate,
          description: results_list[i].description,
          author: results_list[i].author,
          thumbnail: results_list[i].thumbnail,
          address: results_list[i].User.preferredDropAddress,
          username: results_list[i].User.userName
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

        var offerer = $("<p>");
        offerer.addClass("subtitle is-6");
        offerer.text("Offerer: " + results_list[i].User.userName)
  
        var address = $("<p>");
        address.addClass("subtitle is-6");
        address.text("Preferred Drop Address: " + results_list[i].User.preferredDropAddress)

        var pubDate = $("<p>");
        pubDate.addClass("subtitle is-6");
        pubDate.text(results_list[i].publishedDate)

        var author = $("<p>");
        author.addClass("subtitle is-6");
        author.text(results_list[i].author);

        var bookDesc = $("<div>")
        bookDesc.addClass("content");
        bookDesc.text("Status: " + results_list[i].postStatus);

        var divider = $("<hr>")

        mediaContent.append(title);
        mediaContent.append(offerer);
        mediaContent.append(address);
        mediaContent.append(pubDate);
        mediaContent.append(author);
        mediaContent.append(bookDesc)
        mediaContent.append(divider);

        media.append(mediaLeft);
        media.append(mediaContent)

        cardContent.append(media)
        // cardContent.append(bookDesc);

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
        
        $("#offered_books").append(fullCard)
    }
    }

    function getBookOffers() {
      $.get("/profile/offers", function (data) {
        console.log("Book offers", data);
        book_offers = data;
        if (!book_offers || !book_offers.length) {
          displayEmpty();
        }
        else {
          displayOffers(book_offers);
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
          thumbnail: results_list[i].thumbnail,
          respondingUser: results_list[i].respondingUser
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

        var requester = $("<p>");
        requester.addClass("subtitle is-6");
        requester.text("Requester: " + results_list[i].User.userName)
  
        var zipCode = $("<p>");
        zipCode.addClass("subtitle is-6");
        zipCode.text("Zip Code: " + results_list[i].User.zipCode)

        var pubDate = $("<p>");
        pubDate.addClass("subtitle is-6");
        pubDate.text(results_list[i].publishedDate)

        var author = $("<p>");
        author.addClass("subtitle is-6");
        author.text(results_list[i].author);

        var bookDesc = $("<div>")
        bookDesc.addClass("content");
        bookDesc.text("Status: " + results_list[i].postStatus);

        var divider = $("<hr>")

        mediaContent.append(title);
        mediaContent.append(requester);
        mediaContent.append(zipCode);
        mediaContent.append(pubDate);
        mediaContent.append(author);
        mediaContent.append(bookDesc)
        mediaContent.append(divider);

        media.append(mediaLeft);
        media.append(mediaContent)

        cardContent.append(media)
        // cardContent.append(bookDesc);

        fullCard.append(cardContent);

        // Card Footer
        var footer = $("<footer>");
        footer.addClass("card-footer");

        var requestLink = $("<a>")
        // requestLink.attr("href", "/request");
        if (results_list[i].postStatus === "REQUESTED") {
          requestLink.addClass("card-footer-item delete-book");
          requestLink.text("Delete this Request");
          requestLink.data("book", dataObj)
        }

        else if (results_list[i].postStatus === "PENDING") {
          requestLink.addClass("card-footer-item confirm-book");
          requestLink.text("Accept / Decline Book Offer");
          requestLink.data("book", dataObj)
        }


        footer.append(requestLink);
        fullCard.append(footer);
        
        $("#requested_books").append(fullCard)
    }
    }

    function viewRequest() {
      var selectedRequest = $(this).data("book");
      window.location.href = "/view_request?request_id=" + selectedRequest.id;

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
    validateUserName();

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
  
  