// variable for url
var url = "https://api.seatgeek.com/2/events?per_page=50&listing_count.gt=0&client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";

// setting elements as variables
var btn = document.querySelector("button");

var eventCard = $(".event-card");
var eventImg = $(".event-img");
var eventTitle = $(".event-title");
var eventType = $(".event-type");
var eventDate = $(".event-date");
var eventVenue = $(".event-venue");
var minPrice = $(".min-price");

btn.addEventListener("click", handleSubmit);

init();

// Handle the event of the form being submitted
function handleSubmit(event) {
    event.preventDefault();

    // resets url so old inputs don't add onto the new one
    var url = "https://api.seatgeek.com/2/events?per_page=50&listing_count.gt=0&client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";

    // selects the values of the inputs
    var userEvent = $("#event-option").val();
    var startDate = $("#start-date").val();
    console.log(userEvent);
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
        url += `&datetime_local.gte=${startDate}&datetime_local.lte=${endDate}`;
    };

    if(cityName !== ""){
        url += `&venue.city=${cityName}`;
    };

    if(stateName !== ""){
        url += `&venue.state=${stateName}`;
    };

    console.log(url);
    fetchEvents(url);
}

// Fetch the events from the API and display
function fetchEvents(url) {
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        // Stores all events into variable
        var allEvents = data.events;
        console.log(allEvents);

        // each elements text will change for the appropriate event
        for(var i = 0; i < eventTitle.length; i++){
            
            // Adds the text for each section
            eventTitle[i].innerHTML = allEvents[i].short_title; 
            eventType[i].innerHTML = allEvents[i].type;
            eventDate[i].innerHTML = allEvents[i].datetime_local; 
            eventVenue[i].innerHTML = allEvents[i].venue.name;
            minPrice[i].innerHTML = "From: $" + allEvents[i].stats.lowest_sg_base_price;

            
            // Checks the event type and applies the photo that goes with that event
            eventImg[i].src = getImageLocation(allEvents[i].type);
            
        }    

    })
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

// Function to show recently viewed
let recentlyViewedEvents = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
function recentlyViewed() {
    const recentlyViewedList = document.getElementById('recentlyViewedList');
    recentlyViewed.innerHTML = '';
    recentlyViewedEvents.array.forEach(event => {
        const listItem = document.createElement('li');
        listItem.textContent = event;
        recentlyViewedList.appendChild(listItem);
        
    });
}

// Function to add event to list
function addRecentlyViewed(event) {
    recentlyViewedEvents.unshift(event);
    const maxEvents = 5;
    recentlyViewedEvents = recentlyViewedEvents.slice(0, maxEvents);
    localStorage.getItem('recentlyViewed', JSON.stringify(recentlyViewedEvents));
    recentlyViewed();
}

// Function to fetch the events
function fetchEvents(url) {
    for (var i = 0; i < eventTitle.length; i++) {
        addRecentlyViewed(allEvents[i].short_title);
    }
}
// Initialize the page
function init(){
    recentlyViewedEvents();
    fetchEvents(url);
}