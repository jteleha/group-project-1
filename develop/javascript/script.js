// variable for url
var url = "https://api.seatgeek.com/2/events?client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";

// setting elements as variables
var btn = document.querySelector("button");

var eventCard = $(".game-card");
var eventImg = $(".event-img");
var eventTitle = $(".event-title");
var eventType = $(".event-type");
var eventVenue = $(".event-venue");
var minPrice = $(".min-price");

btn.addEventListener("click", function(event){
    event.preventDefault();

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        // Stores all events into variable
        var allEvents = data.events;
        console.log(allEvents);

        // each elements text will change for the appropriate event
        for(var i = 0; i < eventTitle.length; i++){
            eventTitle[i].innerHTML = allEvents[i].short_title; 
            eventType[i].innerHTML = allEvents[i].type;
            eventVenue[i].innerHTML = allEvents[i].venue.name;
            minPrice[i].innerHTML = "From: " + allEvents[i].stats.lowest_sg_base_price;
            
            // Checks the event type and applys the photo that goes with that event
            if(allEvents[i].type === "ncaa_womens_basketball"){
                eventImg[i].src = "./assets/images/womans-bb.jpg";

            }else if(allEvents[i].type === "concert"){
                eventImg[i].src = "./assets/images/concert.png";

            }else if(allEvents[i].type === "ncaa_hockey" || allEvents[i].type === "hockey" || allEvents[i].type === "minor_league_hockey"){
                eventImg[i].src = "./assets/images/hockey.png";

            }else if(allEvents[i].type === "ncaa_football" || allEvents[i].type === "sports"){
                eventImg[i].src = "./assets/images/football.jpg";

            }else if(allEvents[i].type === "ncaa_basketball" || allEvents[i].type === "nba_dleague"){
                eventImg[i].src = "./assets/images/mens-bb.png";

            }else if (allEvents[i].type === "comedy"){
                eventImg[i].src = "./assets/images/comedy.png";
            }
        }    

    })

})

