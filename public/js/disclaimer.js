$(document).ready(function () {
  
    //click events for the edit and delete button
    // $(document).on("click", "td.button-delete", handleDreamsDelete);
    // $(document).on("click", "td.button-edit", handleDreamsEdit);
    // privacySetting.on("change", handlePrivacyChange);
    // var dreams;

    var checkbox = $("#test");


    $("#submit").on("click", function (event) {
        event.preventDefault();
        if (!checkbox.is(":checked")) {
            console.log("Please check the checkbox")
        }

        else {
            console.log("Form submitted")
            window.location.href="/home"
        }
    });


  
  });
  
  