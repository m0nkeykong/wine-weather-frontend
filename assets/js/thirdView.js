$("#rdyGF").click(() => {
    document.getElementById("grandFinale").currentTime = 42;
    document.getElementById("grandFinale").play();
});

$("#ldview3").click(() => {
    //get data
    // var request = new XMLHttpRequest();
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // const url = "https://wine-weather.herokuapp.com/api/SugarTemperatureAlcoholEachCountry"; // site that doesn’t send Access-Control-*
    // request.open('GET', proxyurl + url, true);
    // request.send();
    // request.onload = function () {

        //parse data    

        if (x >= 30)
            fillKey = 'HOT'
        else if (x < 30 && x >= 25)
            fillKey = 'WARM'
        else if (x < 25 && x >= 18)
            fillKey = 'NICE'
        else if (x < 18 && x >= 12)
            fillKey = 'CHILLI'
        else if (x < 12 && x > 4)
            fillKey = 'COLD'
        else
            fillKey = 'FREEZING'
        
        //create worldmap element
        new Datamap({ 
            element: document.getElementById('worldMap'),
            fills: {
                HOT: '#c12817',           // >= 30
                WARM: '#d0695d',          // 25 =< && > 30
                NICE: '#eadcdb',          // 18 =< && > 25
                CHILLI: '#9bc5ff',        // 12 =< && > 18
                COLD: '#79acf2',          // 4 < && > 12
                FREEZING: '#3c86ec',      // =< 4
                defaultFill: 'light gray' // Any hex, color name or rgb/rgba value
            },
            data: {
                IRL: {
                    fillKey: 'HIGH',
                    drinks: 1,
                    temperature: -1.9222222222222227,
                    maxSugar: 7,
                    minSugar: 7,
                    maxAlcohol: 11.5,
                    minAlcohol: 11.5
                },
                USA: {
                    fillKey: 'LOW',
                    drinks: 1,
                    temperature: -1.9222222222222227,
                    maxSugar: 7,
                    minSugar: 7,
                    maxAlcohol: 11.5,
                    minAlcohol: 11.5
                }
            },
            geographyConfig: {
                popupTemplate: function(geo, data) {
                    return ['<div class="hoverinfo">' +
                            geo.properties.name +
                            '<br>Number Of Bottels: ' + data.drinks +
                            '<br>Temperature: ' + data.temperature +
                            '<br>Max. Sugar Level: ' + data.maxSugar + 
                            '<br>Min. Sugar Level: ' + data.minSugar + 
                            '<br>Max. Alcohol Level: ' + data.maxAlcohol +
                            '<br>Min. Sugar Level: ' + data.minAlcohol +  
                            '</div>'].join('');
                }
            } 
        });

    //     console.log('view 3 loaded');
    // }
});