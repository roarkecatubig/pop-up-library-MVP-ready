$(document).ready(function() {

    var searchBtn = $("#searchBtn");
    var searchInput = $("#searchInput");
    
    $(document).on("click", ".card-footer-item", handleBookOffer);
  
    // Adding an event listener for when the form is submitted
    $(searchBtn).on("click", function handleFormSubmit(event) {
      event.preventDefault();
      console.log("Search button clicked")
      if (!searchInput.val().trim()) {
        return;
      }
      // Building variable to be submitted to database
      var newQuery = searchInput.val().trim();
      console.log(newQuery)
      var searchURL = "/search/books/" + newQuery
      searchBooks(searchURL)
      
    });
  
    function searchBooks(query) {
        $.get(query, function(result) {
          console.log(result);
          buildSearchResults(result);
        });
    }

    function buildSearchResults(results_list) {
        for (i=0; i < results_list.length; i++) {

            var dataObj = {
                title: results_list[i].title,
                category: results_list[i].categories[0],
                publishedDate: results_list[i].publishedDate,
                description: results_list[i].description,
                author: results_list[i].authors[0],
                thumbnail: results_list[i].thumbnail,
                ISBN: results_list[i].industryIdentifiers[0].identifier
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

            var ISBN = $("<p>");
            ISBN.addClass("subtitle is-6");
            ISBN.text(results_list[i].industryIdentifiers[0].identifier)

            var author = $("<p>");
            author.addClass("subtitle is-6");
            author.text(results_list[i].authors[0]);

            var divider = $("<hr>")

            mediaContent.append(title);
            mediaContent.append(pubDate);
            mediaContent.append(ISBN)
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
            // requestLink.attr("href", "/book/offer");
            requestLink.addClass("card-footer-item");
            requestLink.text("Offer this Book");
            requestLink.data("book", dataObj)

            footer.append(requestLink);
            fullCard.append(footer);
            
            $("#result").append(fullCard)
        }
    }

    function handleBookOffer() {
        var selectedBook = $(this).data("book");
        console.log(selectedBook)
        $.post("/book/offered", selectedBook, function(result) {
            console.log(result)
            console.log("Request submitted")
            window.location.href = "/home";
        })
    //   window.location.href = "/new-dream?dream_id=" + currentDream.id;
    }

    // **************************************************************************************

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
  