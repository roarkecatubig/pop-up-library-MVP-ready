$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var requestId;
    var updating = false;
    var requestObject;
    var respondingUserObject;
    // var respondingUser;

    // $(document).on("click", ".accept", deleteRequest);
    // $(document).on("click", ".reject", viewRequest);
  
    if (url.indexOf("?request_id=") !== -1) {
      requestId = url.split("=")[1];
    //   getUserInfo()
      getRequestData(requestId);
    //   buildRequestCard(requestObject, respondingUserObject)
    }

    // Gets data from db to pre-fill the newdream.html form
    // Works
    function getRequestData(book_id) {
        $.get("/view-request/" + book_id, function(data) {
            if (data) {
                console.log(data)
                requestObject = {
                    id: data.id,
                    title: data.title,
                    author: data.author,
                    thumbnail: data.thumbnail,
                    ISBN: data.ISBN,
                    respondingUser: data.respondingUser
                }
                console.log(requestObject)
                getUserInfo(requestObject);
            }
        })
    }

    function getUserInfo(book_object) {
        var user_id = book_object.respondingUser;
        $.ajax({
            method: "GET",
            url: "/user-info/" + user_id
          })
            .then(function(data) {
              console.log(data)
              respondingUserObject = {
                  id: data.id,
                  userName: data.userName,
                  address: data.preferredDropAddress, 
              }
              console.log(respondingUserObject)
              buildRequestCard(requestObject, respondingUserObject)
          });
    }

    function buildRequestCard(book_info, user_info) {
        console.log("book_info")
        console.log(book_info)
        console.log("user_info")
        console.log(user_info)
      
            var dataObj = {
              id: book_info.id,
              title: book_info.title,
              author: book_info.author,
              thumbnail: book_info.thumbnail,
              ISBN: book_info.ISBN,
              address: user_info.address,
              respondingUser: user_info.userName
              
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
            mediaLeftImage.attr("src", book_info.thumbnail);
      
            mediaLeftFigure.append(mediaLeftImage);
            mediaLeft.append(mediaLeftFigure);
      
            // Media content 
            var mediaContent = $("<div>");
            mediaContent.addClass("media-content");
      
            var title = $("<p>");
            title.addClass("title is-4");
            title.text(book_info.title);
      
            var offerer = $("<p>");
            offerer.addClass("subtitle is-6");
            offerer.text("Offerer: " + user_info.userName)

            var address = $("<p>");
            address.addClass("subtitle is-6");
            address.text("Address: " + user_info.address)
      
            var ISBN = $("<p>");
            ISBN.addClass("subtitle is-6");
            ISBN.text("ISBN: " + book_info.ISBN)
      
            var author = $("<p>");
            author.addClass("subtitle is-6");
            author.text("Author: " + book_info.author);
      
            var divider = $("<hr>")
      
            mediaContent.append(title);
            mediaContent.append(offerer);
            mediaContent.append(address);
            mediaContent.append(ISBN);
            mediaContent.append(author);
            // mediaContent.append(bookDesc);
            mediaContent.append(divider);
      
            media.append(mediaLeft);
            media.append(mediaContent)
      
            cardContent.append(media)
            // cardContent.append(bookDesc);
      
            fullCard.append(cardContent);
      
            // Card Footer
            var footer = $("<footer>");
            footer.addClass("card-footer");
      
            var acceptLink = $("<a>")
            // requestLink.attr("href", "/request");
            acceptLink.addClass("card-footer-item accept");
            acceptLink.text("Accept Offer");
            acceptLink.data("book", dataObj)

            var declineLink = $("<a>")
            // requestLink.attr("href", "/request");
            declineLink.addClass("card-footer-item decline");
            declineLink.text("Decline Offer");
            declineLink.data("book", dataObj)
      
            // if (results_list[i].UserId === id) {
            //   requestLink.attr("title", "Disabled button")
            // }
      
            footer.append(acceptLink);
            footer.append(declineLink);
            fullCard.append(footer);
            
            $("#result").append(fullCard)

    }
});

// ********************************************************************************************************
  
//     // Getting jQuery references to the the form fields
//     var title = $("#title");
//     var mood = $("#mood");
//     var dream = $("#dream_input");
//     var postPrivacy = $("#privacy");
//     var cmsForm = $("#cms");
  
//     // Adding an event listener for when the form is submitted
//     $(cmsForm).on("submit", function handleFormSubmit(event) {
//       event.preventDefault();
//       if (!title.val().trim() || !dream.val().trim()) {
//         return;
//       }
//       // Building variable to be submitted to database
//       var newDream = {
//         title: title.val().trim(),
//         mood: mood.val(),
//         dream: dream.val(),
//         privacy: postPrivacy.val()
//       };
  
//       if (updating) {
//         console.log("Updating post")
//         newDream.id = dreamId;
//         updateDream(newDream);
//       }
//       else {
//         console.log("Submitting new post")
//         submitDream(newDream);
//       }
//     });
  
//     // Submits dream to database with a POST request
//     function submitDream(Dream) {
//       $.post("/add-dream/", Dream, function() {
//         window.location.href = "/my-dreams";
//       });
//     }
  

  
//     // Submits PUT request to update dream
//     function updateDream(dream) {
//       $.ajax({
//         method: "PUT",
//         url: "/add-dream",
//         data: dream
//       })
//         .then(function() {
//           window.location.href = "/my-dreams";
//         });
//     }
//   });
  