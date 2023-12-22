var url = "https://api.seatgeek.com/2/events?client_id=MzkwMDkzNjl8MTcwMjk1Mzk0My43ODAyNDM5";
var btn = document.querySelector("button");

btn.addEventListener("click", function(event){
event.preventDefault();

fetch(url)
    .then(function(response){
        console.log(response);
    return response.json();
    })
    .then(function(data){
    console.log(data);

    })
    // .catch(function(error){
    //     console.error(error);
    // })

})

