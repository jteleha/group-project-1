// variable for url
var url = "https://api.seatgeek.com/2/events?per_page=50&listing_count.gt=0&client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";

// setting elements as variables
var btn = $("#submit-btn");

var eventCard = $(".event-card");
var cardImg = $(".card-image")
var eventImg = $(".event-img");
var cardText = $(".card-content");
var eventTitle = $(".event-title");
var eventType = $(".event-type");
var eventDate = $(".event-date");
var eventVenue = $(".event-venue");
var minPrice = $(".min-price");

btn.on("click", handleSubmit);

init();

// Handle the event of the form being submitted
function handleSubmit(event) {

    if(event !== undefined){
        event.preventDefault();
    }
    
    // resets url so old inputs don't add onto the new one
    var url = "https://api.seatgeek.com/2/events?per_page=50&listing_count.gt=0&client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";

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
        url += `&datetime_local.gte=${startDate}&datetime_local.lte=${endDate}`;
    };

    // adds to the url if the user selected a city
    if(cityName !== ""){
        url += `&venue.city=${cityName}`;
    };

    // adds to the url if the user selected a state
    if(stateName !== ""){
        url += `&venue.state=${stateName}`;
    };

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
            $(eventImg[i]).css({"background-image": "url('" + getImageLocation(allEvents[i].type ) + "')", 
            // Applies the css for the image
            "width": "100%", 
            "height": "100%", 
            "display": "flex", 
            "background-repeat": "no-repeat", 
            "background-size": "100% 100%", 
            "background-position": "center center",
            "border-radius": "25px 0 0 25px"});

            // Allows the image to cover the entire card
            $(cardImg[i]).css("padding", "0");

            // css for the title of event
            $(cardText[i]).css("padding-top", "0");

        }    

    })
}

// Get image location based on event type
function getImageLocation(eventType) {
    let imageLocation = "/assets/images/";

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

// Initialize the page
function init(){
    fetchEvents(url);
}

