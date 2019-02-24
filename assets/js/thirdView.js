$("#rdyGF").click(() => {
    document.getElementById("grandFinale").currentTime = 42;
    document.getElementById("grandFinale").play();
});

$("#ldview3").click(() => {
    //get data
    var request = new XMLHttpRequest();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://wine-weather.herokuapp.com/api/SugarTemperatureAlcoholEachCountry"; // site that doesn’t send Access-Control-*
    request.open('GET', proxyurl + url, true);
    request.send();
    request.onload = function () {

        //parse data
        var data = JSON.parse(this.response);
        var obj = {};
        var countries = Datamap.prototype.worldTopo.objects.world.geometries;               // to get all country codes
        var ctr = "";
        data.forEach((country) => {
            var fillKey = "";

            // Float convertion
            var temperature = parseFloat(country.temperature);
            
            if (temperature >= 30)
                fillKey = 'HOT';
            else if (temperature < 30 && temperature >= 25)
                fillKey = 'WARM';
            else if (temperature < 25 && temperature >= 18)
                fillKey = 'NICE';
            else if (temperature < 18 && temperature >= 12)
                fillKey = 'CHILLI';
            else if (temperature < 12 && temperature > 4)
                fillKey = 'COLD';
            else
                fillKey = 'FREEZING';

            for (var i = 0, j = countries.length; i < j; i++) {
                if (country._id == countries[i].properties.name)
                    ctr = countries[i].properties.iso;
            }
            a = Object.assign({ drinks: country.drinks }, { temperature: country.temperature.toFixed(3) }, { maxSugar: country.maxSugar }, { minSugar: country.minSugar }, { maxAlcohol: country.maxAlcohol }, { minAlcohol: country.minAlcohol }, { fillKey: fillKey });
            obj[`${ctr}`] = a;
        })

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
                defaultFill: '#898484' // Any hex, color name or rgb/rgba value
            },
            data: obj,
            geographyConfig: {
                highlightFillColor: 'white',
                highlightBorderColor: '#7d7d7d',
                highlightBorderWidth: 2,
                popupTemplate: function(geo, data) {
                    return ['<div class="hoverinfo">' +
                            '<b>' + geo.properties.name + '</b>' +
                            '<br><u>Number Of Bottels:</u> ' + data.drinks +
                            '<br><u>Temperature:</u> ' + data.temperature +
                            '<br><u>Max. Sugar Level:</u> ' + data.maxSugar + 
                            '<br><u>Min. Sugar Level:</u> ' + data.minSugar + 
                            '<br><u>Max. Alcohol Level:</u> ' + data.maxAlcohol +
                            '<br><u>Min. Sugar Level:</u> ' + data.minAlcohol +  
                            '</div>'].join('');
                }
            } 
        });
        
        console.log('view 3 loaded');
    }
});