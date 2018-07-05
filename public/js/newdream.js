$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var dreamId;
  var updating = false;

  if (url.indexOf("?dream_id=") !== -1) {
    dreamId = url.split("=")[1];
    getDreamData(dreamId);
  }

  // Getting jQuery references to the the form fields
  var title = $("#title");
  var mood = $("#mood");
  var dream = $("#dream_input");
  var postPrivacy = $("#privacy");
  var cmsForm = $("#cms");

  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    if (!title.val().trim() || !dream.val().trim()) {
      return;
    }
    // Building variable to be submitted to database
    var newDream = {
      title: title.val().trim(),
      mood: mood.val(),
      dream: dream.val(),
      privacy: postPrivacy.val()
    };

    if (updating) {
      console.log("Updating post")
      newDream.id = dreamId;
      updateDream(newDream);
    }
    else {
      console.log("Submitting new post")
      submitDream(newDream);
    }
  });

  // Submits dream to database with a POST request
  function submitDream(Dream) {
    $.post("/add-dream/", Dream, function() {
      window.location.href = "/my-dreams";
    });
  }

  // Gets data from db to pre-fill the newdream.html form
  function getDreamData(id) {
    $.get("/update-dream/" + id, function(data) {
      if (data) {
        title.val(data.title);
        dream.val(data.dream);
        if (data.privacy === false) {
          postPrivacy.val("0")
        }

        else if (data.privacy === true) {
          postPrivacy.val("1")
        }
        console.log("Mood: " + data.mood)
        mood.val(data.mood)

        updating = true;
      }

      else {
        window.location.href = "/my-dreams"
      }
    });
  }

  // Submits PUT request to update dream
  function updateDream(dream) {
    $.ajax({
      method: "PUT",
      url: "/add-dream",
      data: dream
    })
      .then(function() {
        window.location.href = "/my-dreams";
      });
  }
});
