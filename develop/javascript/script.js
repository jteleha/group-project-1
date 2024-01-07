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

// Store the maximum number of carousel items
const maxCarouselLength = 5;
var errorMsg = $("#error-msg");

//var for current day date
var today = dayjs().format("YYYY-MM-DD");

btn.on("click", handleSubmit);
$("#empty-search").on("click", emptySearch);

init();

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
    
    const eventDetails = {
        type:userEvent,
        date: startDate,
        venue: cityName + ', ' + stateName,
        title: allEvents[0].short_title,
        price: allEvents[0].stats.lowest_sg_base_price,
        url: allEvents[0].url,
    };

    addRecentlyViewed(eventDetails);


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
async function fetchEvents(url) {
    return fetch(url)
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
function displayCarousel(data) {
    // Stores all events into variable
    var allEvents = data.events;

    // Add events to the carousel up to the max number
    for (let i = 0; i < maxCarouselLength && i < allEvents.length; i++) {
        let carouselItem = $("<div>").addClass("carousel-item event-card card");
        let carouselImg = $("<div>").addClass("card-image").append($("<img>").attr("src", getImageLocation(allEvents[i].type)));
        let carouselHeading = $("<h3>").addClass("carousel-title center-align").text(allEvents[i].short_title);
        let carouselLink = $("<a>").attr("href", allEvents[i].url).append(carouselHeading);
        let carouselText = $("<div>").addClass("card-content").append(carouselLink);
        carouselItem.append(carouselImg, carouselText);
        carouselEl.append(carouselItem);
    }

    // Initialize the carousel
    carouselEl.carousel();
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

$(minPrice).on('click', handleMinPriceClick);

function handleMinPriceClick(event) {
    var parentElement = event.target.parentElement.parentElement;
    console.log(parentElement);
    var eventType = parentElement.children[0].children[0].textContent;
    console.log(eventType);
    var eventDate = parentElement.children[0].children[1].textContent;
    console.log(eventDate); 
    var eventVenue = parentElement.children[0].children[2].textContent;
    console.log(eventVenue);
    var eventTitle = parentElement.previousElementSibling.textContent;
    console.log(eventTitle);
    var eventPrice = event.target.textContent;
    console.log(eventPrice);
    getRecentlyViewedEvents();

    var eventObject = {type: eventType, date: eventDate, venue: eventVenue, title: eventTitle, price: eventPrice};
    var storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    storedEvents.push(eventObject);
    localStorage.setItem('events', JSON.stringify(storedEvents));
    getRecentlyViewedEvents();

}

function getRecentlyViewedEvents() {
    var storedEvents = JSON.parse(localStorage.getItem('events'));
    console.log(storedEvents);  

}
let eventArray = [];

function addRecentlyViewed(eventDetails) {
    eventArray.unshift(eventDetails);
    const maxEvents = 5;
    eventArray = eventArray.slice(0, maxEvents);
    localStorage.setItem('recentlyViewed', JSON.stringify(eventArray));
    displayRecentlyViewed();
}

function displayRecentlyViewed() {
    const carouselEl = $(".carousel");
    carouselEl.empty();

    let storedEvents = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    eventArray = storedEvents;

    eventArray.forEach(event => {
        let carouselItem = $("<div>").addClass("carousel-item event-card card");
        let carouselImg = $("<div>").addClass("card-image").append($("<img>").attr("src", getImageLocation(event.type)));
        let carouselHeading = $("<h3>").addClass("carousel-title center-align").text(event.title);
        let carouselLink = $("<a>").attr("href", event.url).append(carouselHeading);
        let carouselText = $("<div>").addClass("card-content").append(carouselLink);
        carouselItem.append(carouselImg, carouselText);
        carouselEl.append(carouselItem);
    });

    carouselEl.carousel();
}

// Initialize the page
function init(){
    fetchEvents(url)
    .then(displayCarousel);
}
