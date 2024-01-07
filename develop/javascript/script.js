// variable for url
var url = "https://api.seatgeek.com/2/events?per_page=50&listing_count.gt=0&client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";

// setting elements as variables
var btn = $("#submit-btn");

var eventCard = $(".event-card");
var eventImg = $(".event-img");
var eventTitle = $(".event-title");
var eventType = $(".event-type");
var eventDate = $(".event-date");
var eventVenue = $(".event-venue");
var minPrice = $(".min-price");
var carouselEl = $(".carousel");
var errorMsg = $("#error-msg");

// Track whether the carousel is initialized
let carouselIsInitialized = false;

// Store the maximum number of carousel items
const maxCarouselLength = 5;

// Store data for recently viewed events
let recentlyViewed = [];

//var for current day date
var today = dayjs().format("YYYY-MM-DD");



// Event listeners and function calls:
btn.on("click", handleSubmit);
$("#empty-search").on("click", emptySearch);
$(minPrice).on('click', handleMinPriceClick);

init();



// Function definitions:
// Initialize the page
function init(){
    fetchEvents(url);
    recentlyViewed = getRecentlyViewedEvents();
    displayCarousel(recentlyViewed);
}

// Handle the event of the form being submitted
function handleSubmit(event) {

    if(event !== undefined){
        event.preventDefault();
    }
    
    // resets url so old inputs don't add onto the new one
    var url = "https://api.seatgeek.com/2/events?per_page=50&listing_count.gt=0&client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";
    $(errorMsg).css("display", "none");

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

        url += `&taxonomies.name=${userEvent}`;
    
    };

    // adds to the url if the user selected dates
    if (startDate !== "" && endDate !== ""){
        // error msg if user made the end date before the start date
        if(startDate > endDate){
            errorMsg.text("Please Make Sure The End Date Is After The Start Date!");
            $(errorMsg).css({"display": "block", "color": "red", "text-align": "center", "margin": "0 auto"});
            $(btn).css("margin-top", "1em");
            return;
        }else if(startDate === endDate){
            // error msg if user made both dates the same day
            errorMsg.text("Please Make Sure The End Date Is Atleast One Day After The Start Date!");
            $(errorMsg).css({"display": "block","color": "red", "text-align": "center", "margin": "0 auto"});
            $(btn).css("margin-top", "1em");
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
            errorMsg.text("Please Make Sure The End Date Is After The Current Date!");
            $(errorMsg).css({"display": "block","color": "red", "text-align": "center", "margin": "0 auto"});
            $(btn).css("margin-top", "1em");
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
            errorMsg.text("Please Make Sure The State Abbreviation Is The Correct Length!");
            $(errorMsg).css({"display": "block","color": "red", "text-align": "center", "margin": "0 auto", "margin-top": "-1em", "font-size": "12px", "font-weight": "bold"});
            $(btn).css("margin-top", "1em");
            return;
        }
        url += `&venue.state=${stateName}`;
    };

    fetchEvents(url);
}

//Empty search bar when X is clicked
function emptySearch(){
    $("#search").val("");
}

//Handle the search
function handleSearch(event){
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
    var url = "https://api.seatgeek.com/2/events?per_page=50&listing_count.gt=0&client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";

    //applies the api argument
    url += `&performers.slug=${searchVal}`;
    console.log(url);

    //calls function to display events
    fetchEvents(url).then(data => {
        allEvents = data.events;
        displayEvents(data);
        displayCarousel(data);
        getRecentlyViewedEvents();
    });
}

// Fetch the events from the API and display
// Return the API data so that subsequent functions may utilize it
function fetchEvents(url) {
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(displayEvents);
}

// Populate the event cards with event data
function displayEvents(data) {
    // Stores all events into variable
    var allEvents = data.events;
    console.log(allEvents);

    // error for if there isn't any events found
    if(allEvents.length === 0){
        errorMsg.text("No results found");
        $(errorMsg).css({"display": "block","color": "red", "text-align": "center", "margin": "0 auto"})
        $(btn).css("margin-top", "1em")
        return;
    }

    // each elements text will change for the appropriate event
    for(var i = 0; i < eventTitle.length; i++){
        
        // Adds the text for each section
        eventTitle[i].innerHTML = allEvents[i].short_title;
        
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
            eventType[i].innerHTML = typeName;

        //if event name is three letters wrong like MLB, NBA, MLS then all letters are capital
        }else if(typeName.length === 3){
            typeName = typeName.toUpperCase()
            eventType[i].innerHTML = typeName;
        
        //Everything else only capitalizes the first letter of the first word                
        }else {
            typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
            eventType[i].innerHTML = typeName;
        }

        // Gets the layout for the date and time through dayjs
        var date = dayjs(allEvents[i].datetime_local).format("ddd, MMM D, h:mm A");
        eventDate[i].innerHTML = date;

        eventVenue[i].innerHTML = allEvents[i].venue.name;

        minPrice[i].innerHTML = "From: $" + allEvents[i].stats.lowest_sg_base_price;
        $(minPrice[i]).attr("href", allEvents[i].url);

        // Checks the event type and applies the photo that goes with that event
        $(eventImg[i]).css({"background-image": "url('" + getImageLocation(allEvents[i].type ) + "')"});
    }    

    return data;
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
    carouselEl.carousel();
    carouselIsInitialized = true;
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