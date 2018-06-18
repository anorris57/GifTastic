

// Initial array of gifs
var instruments = ["Piano", "Banjo", "Flute", "Trumpet","Saxaphone", "Clarinet", "Trombone", "Violin", "Snare Drum", "Guitar"];

// displayGigInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {
  $("#gif-view").empty();
  var instrument = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+instrument+"&api_key=KIF69K3SipGPTcN1F8j2Dr1AzUta309E&limit=10";
 

  // Creating an AJAX call for the specific gif button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //console.log(response);

    for (var i = 0; i < response.data.length; i++) {
    // Creating a div to hold the gif
    var instrumentDiv = $("<div class='instrument'>");

    // Storing the rating data
    var rating = response.data[i].rating;
    

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    instrumentDiv.prepend(pOne);
    
    //This is storing url for an image
    var gifUrl = response.data[i].images.original.url;

    //This is storing and creating an img element
    var gifImage = $("<img>");

    //These are adding a src attribute of the orgininal url and an alt attribute to our new img element
    gifImage.attr("src", gifUrl);
    gifImage.attr("alt", "instrument image");
    //console.log(gifImage);

    //Appending gif
    instrumentDiv.append(gifImage);

    $("#gif-view").append(instrumentDiv);
    }
    
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
 
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < instruments.length; i++) {

    // Then dynamicaly generating buttons for each gif in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of gif-btn to our button
    a.addClass("gif-btn");
    // Adding a data-attribute
    a.attr("data-name", instruments[i]);
    // Providing the initial button text
    a.text(instruments[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events gif button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var instrument = $("#gif-input").val().trim();

  // Adding movie from the textbox to our array
  instruments.push(instrument);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();