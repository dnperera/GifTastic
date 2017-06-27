//Initialise the array with popular movie stars
var topics = ["Russell Crowe","Denzel Washington","Brad Pitt","Leonardo DiCaprio",
				"Charlize Theron","Matt Damon","George Clooney","Scarlett Johansson","Nicole Kidman",
				"Gerard Butler"];

function renderButtons(){
	// Deleting the movie stars prior to adding new movies
	// (this is necessary otherwise you will have repeat buttons)
	$(".buttons-view").empty();

	for( var i=0; topics.length > i;i++) {
		//create button
		var movieBt = $("<button>");
		//add bootstrap classes and other classes
		movieBt.addClass("btn btn-primary btn-md moviestar");

		movieBt.attr("data-name", topics[i]);
		movieBt.text(topics[i]);

		$(".buttons-view").append(movieBt);

	}
	//<button class="btn btn-primary btn-md">Clive Owen</button>
}


// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {
	var starName = $(this).attr("data-name");

	//make sure Main previous images gone
	$(".gallery").empty();

	//build quiery url
	var queryURL ="https://api.giphy.com/v1/gifs/search?api_key=f191f9153b4140f1b759fc7633b43e50&q="+starName+"&limit=10";

	//console.log(queryURL);
	//Make AJAX call

	$.ajax({
	  url: queryURL,
	  method: 'GET'
	}).done(function(response) {
	  console.log(response);

	  //var actorData = ;
	  
	  //Loop through the results
	  for(var i=0;response.data.length >i;i++){

	  	 var galleryDiv = $("<div>");
	  	 galleryDiv.addClass("col-md-4");
	  	 //Create P tag for Ragings
	  	  galleryDiv.append( $("<p>").text("Raging :"+response.data[i].rating.toUpperCase()));
	  	 //create an image tag
	  	 var img = $("<img>");
	  	 img.addClass("img-thumbnail actorimage");
	  	 img.attr("src",response.data[i].images.fixed_height_still.url);
	  	 img.attr("data-still",response.data[i].images.fixed_height_still.url);
	  	 img.attr("data-animate",response.data[i].images.fixed_height.url);
	  	 img.attr("data-state","still");
	  	 galleryDiv.append(img);

	  	 $(".gallery").append(galleryDiv);
	  }	
	});
	 
}

//execute button rendering on page load;
renderButtons();

// Adding a click event listener to all elements with a class of "moviestar"

$(document).on("click", ".moviestar", displayMovieInfo);

//Animate loaded images

$(document).on("click",".actorimage", function() {
	var state = $(this).attr("data-state");
	console.log(state);
	if(state ==="still"){
	  var animate = ($(this).attr("data-animate"));
	  state = 'animate';
	  $(this).attr("src",animate);
	  //$(this).attr("data-state" ,state);
	  $(this).attr("data-state" ,state);
	  // debugger;
	}
	else {  //if(state === "animate")
		console.log("Reset to still");
	  var still = ($(this).attr("data-still"));
	  state = 'still';
	  $(this).attr("src",still);
	  $(this).attr("data-state" ,state);
	}
});


//Add new Actor Button
$("#newactorbutton").on("click",function(){

		var newactor = $('input[type="text"]').val().trim();
		
		console.log(newactor);

		if(newactor != ""){
			//push the new value to topics array
			topics.push(newactor);

			//call button render function
			renderButtons();

			$('input[type="text"]').val("");
		}
		else {
			alert("Please enter the name of the Actor or Actress !")
		}


});
