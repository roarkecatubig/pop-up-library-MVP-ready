$(document).ready(function () {

    function createChart(positive, negative, neutral) {
    
      var ctx = $("#myChart");
      var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ["Positive", "Negative", "Neutral"],
            datasets: [{
                label: '# of Votes',
                data: [positive, negative, neutral],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)'
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          legend: {
            labels: {
              fontColor: "white",
              fontSize: 20
            }
          }
        }
    });
  };
  
    //dream container that holds all dreams posted.
    var dreamContainer = $("#dream-container");
    var chartContainer = $(".chart-container")
    var inputUser = $("#user_name_input");
    var nameHelpText = $("#user_help_text");
    var welcomeMessage = $("#welcome_message");
    var displayedUser;
    // Points to the dropdown menu for selecting what privacy setting to query 
    var privacySetting = $("#privacy");
    //click events for the edit and delete button
    $(document).on("click", ".button-delete", handleDreamsDelete);
    $(document).on("click", ".button-edit", handleDreamsEdit);
    privacySetting.on("change", handlePrivacyChange);
    $(".delete").click(function() {
      $(".modal").removeClass("is-active");
   });

   $("#save_user").on("click", checkUsernames);
    
    var dreams;

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
          getDreams()
        }
      })
    }

    // If no userName info was found for the logged in user, it will generate the modal
    function renderModal(new_user) {
      $(".modal").addClass("is-active");  
      // var userPrompt = $(".user-container");

      // var modalDiv = $("<div>");
      // modalDiv.addClass("modal");

      // var modalBackground = $("<div>");
      // modalBackground.addClass("modal-background");

      // var modalCard = $("<div>");
      // modalCard.addClass("modal-card");

      // var modalHeader = $("<header>")
      // modalHeader.addClass("modal-card-head");

      // var modalTitle = $("<p>");
      // modalTitle.text("Modal Title");
      // modalTitle.addClass("modal-card-title");

      // var exitButton = $("<button>");
      // exitButton.addClass("delete");
      // exitButton.attr("aria-label", "close");

      // var modalBody = $("<section>");
      // modalBody.addClass("modal-card-body");
      
      // var userInput = $("<input>");
      // userInput.addClass("input");
      // userInput.attr("type", "text");
      // userInput.attr("placeholder", "User Input");

      // var modalFooter = $("<footer>");
      // modalFooter.addClass("modal-card-foot");
      
      // var saveButton = $("<button>");
      // saveButton.addClass("button is-success");
      // saveButton.text("Save Changes");

      // var cancelButton = $("<button>");
      // cancelButton.addClass("button");
      // cancelButton.text("Cancel");

      // modalHeader.append(modalTitle);
      // modalHeader.append(exitButton);

      // modalBody.append(userInput);

      // modalFooter.append(saveButton);
      // modalFooter.append(cancelButton);

      // modalCard.append(modalHeader);
      // modalCard.append(modalBody);
      // modalCard.append(modalFooter);

      // modalDiv.append(modalBackground);
      // modalDiv.append(modalCard);

      // userPrompt.append(modalDiv);
    }

    // When the user clicks "Save User" on the modal, it will check to see if that user name is already being used
    function checkUsernames() {
      var inputtedUser = inputUser.val().trim();
      console.log("Username input: " + inputtedUser)
      var userString = "/" + inputtedUser;

      $.get("/check-user" + userString, function(data) {
        console.log(data);
        if (data === null) {
          updateUsername(inputtedUser)
        }

        else {
          nameHelpText.text("Sorry. That user exists. Please try again")
          console.log("User exists. Try a different username")
          renderModal();
        }
      })
    }

    function updateUsername(user_input) {
      displayedUser = user_input;
      welcomeMessage.text("Welcome " + displayedUser);
        $.ajax({
          method: "PUT",
          url: "/update-user/" + user_input
        })
          .then(function() {
            window.location.href = "/home";
          });
    }
  
    // This function grabs dreams from the database and updates the view
    function getDreams(privacy_setting) {
      var privacyString = privacy_setting || "";
      if (privacyString) {
        privacyString = "/privacy/" + privacyString;
        console.log("Privacy String:" + privacyString)
      }
      $.get("/my-feed" + privacyString, function (data) {
        console.log("Dreams", data);
        dreams = data;
        if (!dreams || !dreams.length) {
          displayEmpty();
        }
        else {
          initializeRows();
        }
      });
    }
  
  
    // This function does an API call to delete dreamss
    function deleteDream(id) {
      $.ajax({
        method: "DELETE",
        url: "/delete-dream/" + id
      })
        .then(function () {
          getDreams(privacySetting.val());
        });
    }
  
    // Getting the initial list of dreams
    // getDreams();
    validateUserName();
  
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
    function displayEmpty() {
      chartContainer.empty();
      dreamContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new dream.");
      dreamContainer.append(messageH2);
    }
  
    // This function handles reloading new dreams when the category changes
    function handlePrivacyChange() {
      var newDreamCategory = $(this).val();
      getDreams(newDreamCategory);
    }
  
  });
  
  