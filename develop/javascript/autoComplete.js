$(document).ready(function(){
    $('#search').autocomplete({
      data: {
        //nfl
        "Arizona Cardinals": null,
        "Atlanta Falcons": null,
        "Baltimore Ravens": null,
        "Buffalo Bills": null,
        "Carolina Panthers": null,
        "Chicago Bears": null,
        "Cincinnati Bengals": null,
        "Cleveland Browns": null,
        "Dallas Cowboys": null,
        "Denver Broncos": null,
        "Detroit Lions": null,
        "Green Bay Packers": null,
        "Houston Texans": null,
        "Indianapolis Colts": null,
        "Jacksonville Jaguars": null,
        "Kansas City Chiefs": null,
        "Las Vegas Raiders": null,
        "Los Angeles Chargers": null,
        "Los Angeles Rams": null,
        "Miami Dolphins": null,
        "Minnesota Vikings": null,
        "New England Patriots": null,
        "New Orleans Saints": null,
        "New York Giants": null,
        "New York Jets": null,
        "Philadelphia Eagle": null,
        "Pittsburgh Steeler": null,
        "San Francisco 49er": null,
        "Seattle Seahawks": null,
        "Tampa Bay Buccaneers": null,
        "Tennessee Titans": null,
        "Washington Command": null,
        //nba
        "Atlanta Hawks": null,
        "Boston Celtics": null,
        "Brooklyn Nets": null,
        "Charlotte Hornets": null,
        "Chicago Bulls": null,
        "Cleveland Cavaliers": null,
        "Dallas Mavericks": null,
        "Denver Nuggets": null,
        "Detroit Pistons": null,
        "Golden State Warriors": null,
        "Houston Rockets": null,
        "Indiana Pacers": null,
        "Los Angeles Clippers": null,
        "Los Angeles Lakers": null,
        "Memphis Grizzlies": null,
        "Miami Heat": null,
        "Milwaukee Bucks": null,
        "Minnesota Timberwolves": null,
        "New Orleans Pelicans": null,
        "New York Knicks": null,
        "Oklahoma City Thunder": null,
        "Orlando Magic": null,
        "Philadelphia 76ers": null,
        "Phoenix Suns": null,
        "Portland Trail Blazers": null,
        "Sacramento Kings": null,
        "San Antonio Spurs": null,
        "Toronto Raptors": null,
        "Utah Jazz": null,
        "Washington Wizards": null,
        //nhl
        "Anaheim Ducks": null,
        "Arizona Coyotes": null,
        "Boston Bruins": null,
        "Buffalo Sabres": null,
        "Calgary Flames": null,
        "Carolina Hurricanes": null,
        "Chicago Blackhawks": null,
        "Colorado Avalanche": null,
        "Columbus Blue Jackets": null,
        "Dallas Stars": null,
        "Detroit Red Wings": null,
        "Edmonton Oilers": null,
        "Florida Panthers": null,
        "Los Angeles Kings": null,
        "Minnesota Wild": null,
        "Montreal Canadiens": null,
        "Nashville Predators": null,
        "New Jersey Devils": null,
        "New York Islanders": null,
        "New York Rangers": null,
        "Ottawa Senators": null,
        "Philadelphia Flyers": null,
        "Pittsburgh Penguins": null,
        "San Jose Sharks": null,
        "Seattle Kraken": null,
        "St. Louis Blues": null,
        "Tampa Bay Lightning": null,
        "Toronto Maple Leafs": null,
        "Vancouver Canucks": null,
        "Vegas Golden Knights": null,
        "Washington Capitals": null,
        "Winnipeg Jets": null,
        //mls
        "Atlanta United FC": null,
        "Austin FC": null,
        "Charlotte FC": null,
        "Chicago Fire FC": null,
        "Colorado Rapids": null,
        "Columbus Crew": null,
        "CF Montreal": null,
        "D.C. United": null,
        "FC Cincinnati": null,
        "FC Dallas": null,
        "Houston Dynamo FC": null,
        "Inter Miami CF": null,
        "LA Galaxy": null,
        "Los Angeles Football Club": null,
        "Minnesota United FC": null,
        "Montreal Impact": null,
        "Nashville SC": null,
        "New England Revolution": null,
        "New York City FC": null,
        "New York Red Bulls": null,
        "Orlando City SC": null,
        "Philadelphia Union": null,
        "Portland Timbers": null,
        "Real Salt Lake": null,
        "San Jose Earthquakes": null,
        "Seattle Sounders FC": null,
        "Sporting Kansas City": null,
        "Toronto FC": null,
        "Vancouver Whitecaps FC": null,
        //artists
        "Taylor Swift": null,
        "Adele": null,
        "Billy Joel": null,
        "Chris Stapleton": null,
        "Drake": null,
        "Eagles": null,
        "Gracie Abrams": null,
        "Hozier": null,
        "Kenny Chesney": null,
        "Levi Turner": null,
        "Megan Moroney": null,
        "Morgan Wallen": null,
        "Olivia Rodrigo": null,
        "U2": null,
        "Uncle Kracker": null,
        "Zac Brown Band": null,
        "Zach Bryan": null,
        "Luke Bryan": null,
        "Luke Combs": null,
        "Sheryl Crow": null,
        "Steely Dan": null,
        "Journey": null,
        "Def Leppard": null,
        "Tool": null,
        "Travis Scott": null,
        "Isaiah Rashad": null,
        "Post Malone": null,
        "Pouya": null,
        "Lil Tecca": null,
        "Phora": null,
        "Rae Sremmurd": null,
        "Luis Miguel": null,
        "Enrique Iglesias": null,
        "Pitbull": null,
        "Ricky Martin": null,
        "Don Omar": null,
        "Los Tigres del Norte": null,
        "Calibash": null,
        "Marc Anthony": null,
        "Boyz II Men": null,
        "Allen Stone": null,
        "Keith Sweat": null,
        "Charlie Wilson": null,
        "SWV": null,
        "Pretty Ricky": null,
        "Keyshia Cole": null,
        "Dallas Symphony Orchestra": null,
        "Mozart": null,
        "Kronos Quartet": null,
        "Uli Jon Roth": null,
        "Jelly Roll": null,
        //NCAA Mens Basketball
        "Arkansas Razorbacks Mens Basketball": null,
        "Auburn Tigers Mens Basketball": null,
        "Duke Blue Devils Mens Basketball": null,
        "Houston Cougars Mens Basketball": null,
        "Illinois Fighting Illini Mens Basketball": null,
        "Indiana Hoosiers Mens Basketball": null,
        "Kansas Jayhawks Mens Basketball": null,
        "Kentucky Wildcats Mens Basketball": null,
        "Michigan State Spartans Mens Basketball": null,
        "Michigan Wolverines Mens Basketball": null,
        "NC State Wolfpack Mens Basketball": null,
        "NCAA Mens Basketball Tournament": null,
        "NCAA Tournament First and Second Round": null,
        "Oklahoma Sooners Mens Basketball": null,
        "Ohio State Buckeyes Mens Basketball": null,
        "Penn State Nittany Lions Mens Basketball": null,
        "Purdue Boilermakers Mens Basketball": null,
        "Rutgers Scarlet Knights Mens Basketball": null,
        "Syracuse Orange Mens Basketball": null,
        "Texas Longhorns Mens Basketball": null,
        "UConn Huskies Mens Basketball": null,
        "Wisconsin Badgers Mens Basketball": null,
        //WNBA
        "Atlanta Dream": null,
        "Chicago Sky": null,
        "Connecticut Sun": null,
        "Dallas Wings": null,
        "Indiana Fever": null,
        "Las Vegas Aces": null,
        "Los Angeles Sparks": null,
        "Minnesota Lynx": null,
        "New York Liberty": null,
        "Phoenix Mercury": null,
        "Seattle Storm": null,
        "Washington Mystics": null,
        //NCAA Football
        "Alabama Crimson Tide Football": null,
        "Auburn Tigers Football": null,
        "East-West Shrine Bowl": null,
        "Florida Gators Football": null,
        "Georgia Bulldogs Football": null,
        "LSU Tigers Football": null,
        "Michigan Wolverines Football": null,
        "Missouri Tigers Football": null,
        "Montana Grizzlies Football": null,
        "Notre Dame Fighting Irish Football": null,
        "Ohio State Buckeyes Football": null,
        "Oklahoma Sooners Football": null,
        "South Carolina Gamecocks Football": null,
        "South Dakota State Jackrabbits Football": null,
        "Tennessee Volunteers Football": null,
        "Texas Longhorns Football": null,
        "USC Trojans Football": null,
        "Washington Huskies Football": null,
        "Wisconsin Badgers Football": null,
        "Iowa Hawkeyes Football": null,
        "Penn State Nittany Lions Football": null,
        "Michigan State Spartans Football": null,
        "Nebraska Cornhuskers Football": null,
        "Purdue Boilermakers Football": null,
        "Indiana Hoosiers Football": null,
        "Minnesota Golden Gophers Football": null,
        "Oklahoma State Cowboys Football": null,
        "TCU Horned Frogs Football": null,

      },

      limit : 5,
      onAutocomplete: function(){
        console.log("worked");
        handleSearch();
      }

    });
});



