// variable for url
var url = "https://api.seatgeek.com/2/events?per_page=10&listing_count.gt=0&client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";

// setting elements as variables
var btn = $("#submit-btn");
var mainArea = $("#main-info");
var eventCard = $(".event-card");
var eventImg = $(".event-img");
var eventTitle = $(".event-title");
var eventType = $(".event-type");
var eventDate = $(".event-date");
var eventVenue = $(".event-venue");
var minPrice = $(".min-price");
var carouselEl = $(".carousel");
var errorMsg = $("#error-msg");
var clearBtn = $("#clear-carousel");

// Track whether the carousel is initialized
let carouselIsInitialized = false;

// Store the maximum number of carousel items
const maxCarouselLength = 5;

// Store data for recently viewed events
let recentlyViewed = [];

//var for current day date
var today = dayjs().format("YYYY-MM-DD");

// Page number of the event results
var pageNumber = 1

// Event listeners and function calls:
// Submit listener
btn.on("click", handleSubmit);
// Search clear event listener
$("#empty-search").on("click", emptySearch);
// Clear carousel event listener
clearBtn.on("click", handleClearCarousel);
// Next and previous page event listeners
$(document).on("click", "#prev-page", prevPageFunction)
$(document).on("click", "#next-page", nextPageFunction)

// Initialization function
init();

var currentUrl = "";

// Function definitions:
// Initialize the page
function init(){
    fetchEvents(url);
    recentlyViewed = getRecentlyViewedEvents();
    displayCarousel(recentlyViewed);
}

// Handle the event of the form being submitted
function handleSubmit(event) {

    pageNumber = 1

    if(event !== undefined){
        event.preventDefault();
    }
    
    // resets url so old inputs don't add onto the new one
    var url = "https://api.seatgeek.com/2/events?per_page=10&listing_count.gt=0&client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";
    
    // Clear old error message, if it exists
    clearErrorMessage();

    // selects the values of the inputs
    var userEvent = $("#event-option").val();
    var startDate = $("#start-date").val();
    var endDate = $("#end-date").val();
    var cityName = $("#city-name").val();
    var stateName = $("#state-name").val();
    
    // adds to the url if user selected an event
    if (userEvent !== null){

        // needs to get changed just for api use
        if(userEvent === "NCAA BB"){
            userEvent = "ncaa_basketball";
        };

        if(userEvent === "NCAA FB"){
            userEvent = "ncaa_football";
        };

        if(userEvent === "Monster Trucks"){
            userEvent = "monster_truck";
        }

        if(userEvent === "Auto Racing"){
            userEvent = "auto_racing";
        }

        if(userEvent === "Music Festival"){
            userEvent = "music_festival";
        }

        if(userEvent === "Broadway"){
            userEvent = "broadway_tickets_national"
        }

        if(userEvent === "Horse Racing"){
            userEvent = "horse_racing";
        }

        url += `&taxonomies.name=${userEvent}`;
    
    };

    // adds to the url if the user selected dates
    if (startDate !== "" && endDate !== ""){
        // error msg if user made the end date before the start date
        if(startDate > endDate){
            displayErrorMessage("Please Make Sure The End Date Is After The Start Date!");
            return;
        }else if(startDate === endDate){
            // error msg if user made both dates the same day
            displayErrorMessage("Please Make Sure The End Date Is At Least One Day After The Start Date!");
            return;
        }
        url += `&datetime_local.gte=${startDate}&datetime_local.lte=${endDate}`;

    // if user only selects a start date and not end date
    }else if(startDate !== "" && endDate === ""){
        url += `&datetime_local.gte=${startDate}`
    
    // if user only selects an end date    
    }else if (startDate === "" && endDate !== ""){
        //error msg if end date is before todays date
        if(endDate < today){
            displayErrorMessage("Please Make Sure The End Date Is After The Current Date!");
            return;
        }
        url += `&datetime_local.lte=${endDate}`
    };

    // adds to the url if the user selected a city
    if(cityName !== ""){
        url += `&venue.city=${cityName}`;
    };

    // adds to the url if the user selected a state
    if(stateName !== ""){
        // error mesg if user didn't enter the state abbr correct
        if(stateName.length !== 2){
            displayErrorMessage("Please Make Sure The State Abbreviation Is The Correct Length!");
            return;
        }
        url += `&venue.state=${stateName}`;
    };

    currentUrl = url;

    fetchEvents(url);
}

//Empty search bar when X is clicked
function emptySearch(){
    $("#search").val("");
}

//Handle the search
function handleSearch(event){
    // Clear existing error message
    clearErrorMessage();

    //Comes back different based on if they used auto complete or manuelly submitted
    if(event !== undefined){
        event.preventDefault()
    }
    //gets value from search
    searchVal = $("#search").val()
    if(searchVal.includes(" ")){
        searchVal = searchVal.split(" ").join("-");
    }
    //resets url from previous searches
    var url = "https://api.seatgeek.com/2/events?per_page=10&listing_count.gt=0&client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";

    //applies the api argument
    url += `&performers.slug=${searchVal}`;


    //calls function to display events
    fetchEvents(url);

}

// Fetch the events from the API and display
// Return the API data so that subsequent functions may utilize it
function fetchEvents(url) {
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(displayEvents)
    .then(function () {
        // Select the min-price class elements when created and add the event listener
        minPrice = $(".min-price");
        $(minPrice).on('click', handleMinPriceClick);
    });
}

// Populate the event cards with event data
function displayEvents(data) {
    // Stores all events into variable
    var allEvents = data.events;

    // error for if there isn't any events found
    if(allEvents.length === 0){
        displayErrorMessage("No results found");
        return;
    }

    $(mainArea).empty();

    // Creates each card and applies all the info
    for (var i = 0; i < allEvents.length; i++){
        //Make the card
        var eventCard = $("<div>");
        eventCard.addClass("event-card card ");

        $(mainArea).append(eventCard);

        // div that contains the img
        var imgHolder = $("<div>");
        imgHolder.addClass("card-image");
        $(eventCard).append(imgHolder);

        // div that has the image as background
        var img = $("<div>");
        img.addClass("event-img");

        // If the API returned an image, use that image
        // Else, choose a default image based on event type
        if (allEvents[i].performers[0].image) {
            img.css({"background-image": "url('" + allEvents[i].performers[0].image + "')"});
        } else {
            img.css({"background-image": "url('" + getImageLocation(allEvents[i].type ) + "')"});
        }
        $(imgHolder).append(img);

        // div containing the event info
        var cardContent = $("<div>");
        cardContent.addClass("card-content");
        $(eventCard).append(cardContent);

        // Event header
        var eventHeader = $("<h3>");
        eventHeader.addClass("event-title center-align");
        eventHeader.text(allEvents[i].short_title);
        $(cardContent).append(eventHeader);

        // div containing all the details
        var details = $("<div>");
        details.addClass("details");
        $(cardContent).append(details);

        // div containing the type, date and venue
        var description = $("<div>");
        description.addClass("description");
        $(details).append(description);

        // event type
        var type = $("<p>");
        type.addClass("event-type");

        // Capitalite first letter of each word and remove the underscore between space
        var typeName =  allEvents[i].type;

        if(typeName.includes("_")){
            splitWords = typeName.split("_");
            // loops over each words and capitalizes the first letter
            for (var t = 0; t < splitWords.length; t++) {
                splitWords[t] = splitWords[t].charAt(0).toUpperCase() + splitWords[t].slice(1);
            }
            //joins the words together
            typeName = splitWords.join(' ');
            type.text(typeName);

        //if event name is three letters wrong like MLB, NBA, MLS then all letters are capital
        }else if(typeName.length === 3){
            typeName = typeName.toUpperCase()
            type.text(typeName);
        
        //Everything else only capitalizes the first letter of the first word                
        }else {
            typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
            type.text(typeName);
        }
        $(description).append(type);

        // Event date
        var date = $("<p>");
        date.addClass("event-date");
        // Format date and time through dayjs
        var formatDate = dayjs(allEvents[i].datetime_local).format("ddd, MMM D, h:mm A");

        date.text(formatDate);
        $(description).append(date);

        // Event venue
        var venue = $("<p>");
        venue.addClass("event-venue");
        venue.text(allEvents[i].venue.name);
        $(description).append(venue);

        // div containing ticket price
        var ticketPrice = $("<div>");
        ticketPrice.addClass("ticket-price");
        $(details).append(ticketPrice);

        // anchor that contains the link and says the actual price
        var minPrice = $("<a>");
        minPrice.addClass("min-price");
        minPrice.attr({"target": "_blank", "href": allEvents[i].url});
        minPrice.text("From: $" + allEvents[i].stats.lowest_sg_base_price);
        $(ticketPrice).append(minPrice);

    }  

    // Previous page button if page number is greater than one
    if (pageNumber > 1) {
        var prevPageBtn = $("<button>");
        prevPageBtn.text("Previous Page")
        prevPageBtn.css({"padding": "1em", "width": "50%", "background-color": "var(--vibrant-color)", "color": "white", "margin": "0 auto 2em auto", "text-align": "center", "font-size": "16px", "border-radius": "2px", "border": "1px solid var(--vibrant-color)"});
        prevPageBtn.attr({"id": "prev-page", "type": "button"});
        $(mainArea).append(prevPageBtn);
    }
    
    // Next page button if there is the max events displayed
    console.log(data.meta.total)
    if(data.meta.total > 10){
        var nextPageBtn = $("<button>");
        nextPageBtn.text("Next Page")
        nextPageBtn.css({"padding": "1em", "width": "50%", "background-color": "var(--vibrant-color)", "color": "white", "margin": "0 auto 2em auto", "text-align": "center", "font-size": "16px", "border-radius": "2px", "border": "1px solid var(--vibrant-color)"});
        nextPageBtn.attr({"id": "next-page", "type": "button"});
        $(mainArea).append(nextPageBtn);
    }

    return data;
}

// Handle the event in which the next page button is clicked
function nextPageFunction(){
    // Will add 1 based on which page number it already is
    if(pageNumber === 1){
        pageNumber += 1
        currentUrl += `&page=${pageNumber}`;

    // After next page is already selected it removes that ending from the string then readds it to the string with appropriate page number 
    }else if(pageNumber >= 2){
        if(currentUrl.includes("&page=")){
            currentUrl = currentUrl.slice(0,-7);
            pageNumber += 1
            currentUrl += `&page=${pageNumber}`;
        }
        
    }else if(pageNumber >= 10){
        if(currentUrl.includes("&page=")){
            currentUrl = currentUrl.slice(0,-8);
            pageNumber += 1
            currentUrl += `&page=${pageNumber}`;
        }
    }

    url = currentUrl;
    console.log(currentUrl)
    console.log(url)
    fetchEvents(url)
}

// Handle the event in which the previous page button is clicked
function prevPageFunction() {
    // If on page 2, remove the page query parameter
    if (pageNumber === 2) {
        pageNumber -= 1
        currentUrl = currentUrl.slice(0,-7);

    // Else, replace the page query parameter with the current page
    }else if(pageNumber > 2){
        if(currentUrl.includes("&page=")){
            currentUrl = currentUrl.slice(0,-7);
            pageNumber -= 1
            currentUrl += `&page=${pageNumber}`;
        }
        
    }else if(pageNumber >= 10){
        if(currentUrl.includes("&page=")){
            currentUrl = currentUrl.slice(0,-8);
            pageNumber -= 1
            currentUrl += `&page=${pageNumber}`;
        }
    }

    url = currentUrl;
    console.log(currentUrl)
    console.log(url)
    fetchEvents(url)
}    

// Clears any existing error message
function clearErrorMessage() {
    // Hide the message
    $(errorMsg).css("display", "none");
    // Set the submit button's margin back to normal
    $(btn).css("margin-top", "3em");
}

// Sets an error message
function displayErrorMessage(errorString) {
    // Set the error message's content
    errorMsg.text(errorString);
    // Display the error message
    $(errorMsg).css({"display": "block", "color": "red", "text-align": "center", "margin": "0 auto"});
    // Reduce the submit button's margin
    $(btn).css("margin-top", "1em");
}

// Populate the carousel with event data
function displayCarousel(eventList) {
    // If the carousel is initialize, destroy it
    if (carouselIsInitialized) {
        carouselEl.carousel("destroy");
        carouselIsInitialized = false;
    }

    // Remove the existing carousel and replace it with a blank one
    carouselEl.remove();
    carouselEl = $("<div>").addClass("carousel");
    $("footer").append(carouselEl);

    if (eventList.length === 0) {
        // If there are no recently viewed events, add a default card to the carousel
        let carouselItem = $("<div>").addClass("carousel-item event-card card");
        carouselItem.attr("id", "blank-carousel-item");
        let carouselHeading = $("<h3>").addClass("carousel-title center-align").text("No recently viewed events");
        let carouselText = $("<div>").addClass("card-content").append(carouselHeading);
        carouselItem.append(carouselText);
        carouselEl.append(carouselItem);
    } else {
        // Else, add events to the carousel up to the max number
        for (let i = 0; i < maxCarouselLength && i < eventList.length; i++) {
            let carouselItem = $("<div>").addClass("carousel-item event-card card");
            let carouselImg = $("<div>").addClass("card-image").append($("<img>").attr("src", eventList[i].background));
            let carouselHeading = $("<h3>").addClass("carousel-title center-align").text(eventList[i].title);
            let carouselLink = $("<a>").attr("href", eventList[i].url).append(carouselHeading);
            let carouselText = $("<div>").addClass("card-content").append(carouselLink);
            carouselItem.append(carouselImg, carouselText);
            carouselEl.append(carouselItem);
        }
    }

    // Initialize the carousel
    carouselEl.carousel({indicators: true});
    carouselIsInitialized = true;
}

// Handle the event in which the clear carousel button is clicked
function handleClearCarousel() {
    // Clear the recently viewed events locally and in storage
    storeRecentlyViewedEvents([]);
    recentlyViewed = [];
    // Display the carousel without any recent events
    displayCarousel([]);
}

// Get image location based on event type
function getImageLocation(eventType) {
    let imageLocation = "./assets/images/";

    switch (eventType) {
        case "ncaa_womens_basketball":
            imageLocation = imageLocation + "womans-bb.jpg";
            break;
        case "concert":
        case "music_festival":
            imageLocation = imageLocation + "concert.png";
            break;
        case "ncaa_hockey":
        case "hockey":
        case "minor_league_hockey":
        case "nhl":
            imageLocation = imageLocation + "hockey.png";
            break;
        case "ncaa_football":
        case "nfl":
            imageLocation = imageLocation + "football.jpg";
            break;
        case "ncaa_basketball":
        case "nba_dleague":
        case "nba":
        case "basketball":
            imageLocation = imageLocation + "mens-bb.png";
            break;
        case "comedy":
            imageLocation = imageLocation + "comedy.png";
            break;
        case "theater":
        case "dance_performance_tour":
        case "broadway_tickets_national":
        case "cirque_du_soleil":
        case "classical_opera":
        case "classical":
        case "family":
            imageLocation = imageLocation + "theater.png";
            break;
        case "horse_racing":
            imageLocation = imageLocation + "horse-racing.png";
            break;
        case "wrestling":
        case "wwe":
        case "college_wrestling":
            imageLocation = imageLocation + "wwe.png";
            break;
        case "boxing":
            imageLocation = imageLocation + "boxing.png";
            break;
        case "auto_racing":
        case "nascar":
            imageLocation = imageLocation + "car-race.png";
            break;
        case "soccer":
        case "mls":
        case "international_soccer":
        case "united_soccer_league":
            imageLocation = imageLocation + "soccer.jpg";
            break;
        case "rodeo":
            imageLocation = imageLocation + "rodeo.png";
            break;
        case "pga":
            imageLocation = imageLocation + "golf.png";
            break;
        case "college_gymnastics":
        case "college_volleyball":
        case "sports":
        case "national_womens_soccer":
            imageLocation = imageLocation + "general.png";
            break;
        case "monster_truck":
            imageLocation = imageLocation + "monster-truck.png";
            break;
        case "mma":
            imageLocation = imageLocation + "mma.jpg";
            break;
        case "motorcross":
            imageLocation = imageLocation + "motorcross.png";
            break;
        case "ncaa_baseball":
        case "mlb":
        case "baseball":
        case "minor_league_baseball":
        case "college_softball":
            imageLocation = imageLocation + "baseball.png";
            break;
        case "tennis":
            imageLocation = imageLocation + "tennis.png";
            break;
        default:
            imageLocation = imageLocation + "general.png";
    }

    return imageLocation;
}

// Handle the event in which an event's price link is clicked
function handleMinPriceClick(event) {
    // Get information about the event from the element and store in an object
    var detailsDiv = event.target.parentElement.parentElement;
    var eventType = detailsDiv.children[0].children[0].textContent;
    var eventDate = detailsDiv.children[0].children[1].textContent;
    var eventVenue = detailsDiv.children[0].children[2].textContent;
    var eventTitle = detailsDiv.previousElementSibling.textContent;
    var eventPrice = event.target.textContent;
    var eventURL = event.target.href;
    var eventBackground = detailsDiv.parentElement.previousElementSibling.children[0].style["background-image"].slice(5, -2);

    var eventObject = {type: eventType, date: eventDate, venue: eventVenue, title: eventTitle, price: eventPrice, url: eventURL, background: eventBackground};

    // Check if the event is already in the recently viewed events array
    let isRepeat = false;
    for (let i = 0; i < recentlyViewed.length; i++) {
        if (eventObject.title === recentlyViewed[i].title) {
            isRepeat = true;
        }
    }

    // If it's not, add it to the array then store the updated array and display it in the carousel
    if (!isRepeat) {
        recentlyViewed.unshift(eventObject);
        while (recentlyViewed.length > maxCarouselLength) {
            recentlyViewed.pop();
        }

        storeRecentlyViewedEvents(recentlyViewed);

        displayCarousel(recentlyViewed);
    }
}

// Retrieve recently viewed events from localStorage
function getRecentlyViewedEvents() {
    return JSON.parse(localStorage.getItem('recentlyViewed')) ?? [];
}

// Store recently viewed events in localStorage
function storeRecentlyViewedEvents(eventList) {
    localStorage.setItem("recentlyViewed", JSON.stringify(eventList));
}