$("#ldview2").click(() => {
    //get data
    var dps = new Array();
    var request = new XMLHttpRequest();
    request.open('GET', 'https://wineandweather.herokuapp.com/api/AlcoholVolsEachCountry', true);
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            for (var k in data){
                var maxPrice = 0.0, maxAlcohol = 0.0, minPrice = 0.0, minAlcohol = 0.0;
                for(var i = 0; i < data[k].length; ++i){
                    //console.log(data[k][i].Alcohol)
                    if (data[k][i].Price != 'Price pending'){       //to solve issues
                        if(maxPrice < data[k][i].Price) maxPrice = data[k][i].Price;
                    }
                    if(maxAlcohol < data[k][i].Alcohol) maxAlcohol = data[k][i].Alcohol;
                }
                minPrice = data[k].map(function(el){return el.Price}).reduce(function(el){return Math.min(el)});     //get min price
                minAlcohol = data[k].map(function(el){return el.Alcohol}).reduce(function(el){return Math.min(el)});     //get min alcohol
                dps.push({y: [minAlcohol, parseFloat(maxAlcohol)], label: k, price: [minPrice, parseFloat(maxPrice)]});
            }      
            console.log(dps.length);   
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                axisY: {
                    includeZero: false,
                    title: "Alcohol/Lit",
                    crosshair: {
                        enabled: true
                    },
                    gridColor: "white"
                },
                data: [{
                    fillOpacity: .7,
                    type: "rangeBar",
                    zzzzindexLabel: "{y[#index]}%",
                    toolTipContent: "<b>Country</b>: {label} <br> <b>Alcohol Precent</b>: {y[0]}% - {y[1]}%<br> <b>Price Range</b>: {price[0]}$ - {price[1]}$",
                    dataPoints: dps
                }]
            });
            chart.render();
                            
        } else {
            console.log(`Gah, it's not working!`);
        }
    }
    request.send()
});