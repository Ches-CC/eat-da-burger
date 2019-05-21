// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    // let newDevoured = $(this).data("newdevoured")

    // if (newDevoured === "true" || 1){
    //     $(this).hide(".change-devoured");
    // }
    
    // if ($(".data-newdevoured") === "true" || 1){
    //     $(this).hide(".data-newdevoured")
    // }

    $(".change-devoured").on("click", function(event) {
      let id = $(this).data("id");
      newDevoured = $(this).data("newdevoured");
  
      newDevoured = {
        devoured: 1
      };

    //   $(this).hide(".change-devoured");

      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevoured
      }).then(
        function() {
          console.log("changed Devoured to: ", newDevoured);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      let newBurger = {
        name: $("#burger").val().trim(),
        devoured: 0,
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });