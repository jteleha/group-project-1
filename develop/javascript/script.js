// variable for url
var url = "https://api.seatgeek.com/2/events?per_page=50&listing_count.gt=0&client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";

// setting elements as variables
var btn = document.querySelector("button");

var eventCard = $(".game-card");
var eventImg = $(".event-img");
var eventTitle = $(".event-title");
var eventType = $(".event-type");
var eventDate = $(".event-date");
var eventVenue = $(".event-venue");
var minPrice = $(".min-price");

btn.addEventListener("click", function(event){
    event.preventDefault();

    // resets url so old inputs don't add onto the new one
    var url = "https://api.seatgeek.com/2/events?per_page=50&listing_count.gt=0&client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";

    // selects the values of the inputs
    var userEvent = $("#event-option").val();
    var startDate = $("#start-date").val();
    var endDate = $("#end-date").val();
    var cityName = $("#city-name").val();
    var stateName = $("#state-name").val();

    // adds to the url if user selected an event
    if (userEvent !== ""){
        url += `&taxonomies.name=${userEvent}`;
    
    };

    // adds to the url if the user selected dates
    if (startDate !== "" && endDate !== ""){
        url += `&datetime_local.gte=${startDate}&datetime_local.lte=${endDate}`;
    };

    // adds to the url if user selected a city
    if(cityName !== ""){
        url += `&venue.city=${cityName}`;
    };

    if(stateName !== ""){
        url += `&venue.state=${stateName}`;
    };

    console.log(url);
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
            
            eventTitle[i].innerHTML = allEvents[i].short_title; 
            eventType[i].innerHTML = allEvents[i].type;
            eventDate[i].innerHTML = allEvents[i].datetime_local; 
            eventVenue[i].innerHTML = allEvents[i].venue.name;
            minPrice[i].innerHTML = "From: $" + allEvents[i].stats.lowest_sg_base_price;
            
            // Checks the event type and applys the photo that goes with that event
            if(allEvents[i].type === "ncaa_womens_basketball"){
                eventImg[i].src = "./assets/images/womans-bb.jpg";

            }else if(allEvents[i].type === "concert" || allEvents[i].type === "music_festival"){
                eventImg[i].src = "./assets/images/concert.png";

            }else if(allEvents[i].type === "ncaa_hockey" || allEvents[i].type === "hockey" || allEvents[i].type === "minor_league_hockey" || allEvents[i].type === "nhl"){
                eventImg[i].src = "./assets/images/hockey.png";

            }else if(allEvents[i].type === "ncaa_football" || allEvents[i].type === "nfl"){
                eventImg[i].src = "./assets/images/football.jpg";

            }else if(allEvents[i].type === "ncaa_basketball" || allEvents[i].type === "nba_dleague" || allEvents[i].type === "nba" || allEvents[i].type === "basketball"){
                eventImg[i].src = "./assets/images/mens-bb.png";

            }else if (allEvents[i].type === "comedy"){
                eventImg[i].src = "./assets/images/comedy.png";

            }else if(allEvents[i].type === "theater" || allEvents[i].type === "dance_performance_tour" || allEvents[i].type === "broadway_tickets_national" || allEvents[i].type === "cirque_du_soleil" || allEvents[i].type === "classical_opera" || allEvents[i].type === "classical" || allEvents[i].type === "family"){
                eventImg[i].src = "./assets/images/theater.png";

            }else if(allEvents[i].type === "horse_racing"){
                eventImg[i].src = "./assets/images/horse-racing.png";

            }else if(allEvents[i].type === "wrestling" || allEvents[i].type === "wwe" || allEvents[i].type === "college_wrestling"){
                eventImg[i].src = "./assets/images/wwe.png";

            }else if(allEvents[i].type === "boxing"){
                eventImg[i].src = "./assets/images/boxing.png";

            }else if(allEvents[i].type === "auto_racing" || allEvents[i].type === "nascar"){
                eventImg[i].src = "./assets/images/car-race.png";

            }else if(allEvents[i].type === "soccer" || allEvents[i].type === "mls" || allEvents[i].type === "international_soccer" || allEvents[i].type === "united_soccer_league"){
                eventImg[i].src = "./assets/images/soccer.jpg";

            }else if(allEvents[i].type === "rodeo"){
                eventImg[i].src = "./assets/images/rodeo.png";

            }else if(allEvents[i].type === "pga"){
                eventImg[i].src = "./assets/images/golf.png";

            }else if(allEvents[i].type === "college_gymnastics" || allEvents[i].type === "college_volleyball" || allEvents[i].type === "sports" || allEvents[i].type === "national_womens_soccer"){
                eventImg[i].src = "./assets/images/general.png";

            }else if(allEvents[i].type === "monster_truck"){
                eventImg[i].src = "./assets/images/monster-truck.png";

            }else if(allEvents[i].type === "mma"){
                eventImg[i].src = "./assets/images/mma.jpg";

            }else if(allEvents[i].type === "motorcross"){
                eventImg[i].src = "./assets/images/motorcross.png";

            }else if(allEvents[i].type === "ncaa_baseball" || allEvents[i].type === "mlb" || allEvents[i].type === "baseball" || allEvents[i].type === "minor_league_baseball" || allEvents[i].type === "college_softball"){
                eventImg[i].src = "./assets/images/baseball.png";

            }else if(allEvents[i].type === "tennis"){
                eventImg[i].src = "./assets/images/tennis.png";

            }else{
                eventImg[i].src = "./assets/images/general.png";
            }  
        }    

    })

})

